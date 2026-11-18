import type { NovoPost, Post, RespostaViaCep, Usuario } from "../types";

// Só variáveis EXPO_PUBLIC_ chegam ao app. Sem o .env, usamos a API pública de testes.
const BASE_API =
  process.env.EXPO_PUBLIC_API_URL ?? "https://jsonplaceholder.typicode.com";

const BASE_VIACEP =
  process.env.EXPO_PUBLIC_VIACEP_URL ?? "https://viacep.com.br/ws";

const TEMPO_LIMITE_MS = 10000;

async function req<T>(
  caminho: string,
  opcoes?: RequestInit,
  urlBase: string = BASE_API,
): Promise<T> {
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TEMPO_LIMITE_MS);

  try {
    const urlCompleta = caminho.startsWith("http")
      ? caminho
      : `${urlBase}${caminho}`;

    const resposta = await fetch(urlCompleta, {
      ...opcoes,
      signal: controlador.signal,
    });

    // fetch só rejeita quando a rede falha: 404 e 500 chegam aqui e precisam ser checados
    if (resposta.status === 404) throw new Error("Não encontrado");
    if (!resposta.ok) throw new Error(`Falha ${resposta.status}`);

    return (await resposta.json()) as T;
  } catch (erro) {
    if (erro instanceof Error && erro.name === "AbortError") {
      throw new Error("A conexão demorou demais. Tente de novo.");
    }
    // sem internet o fetch lança TypeError
    if (erro instanceof TypeError) {
      throw new Error("Sem conexão com o servidor.");
    }
    throw erro;
  } finally {
    clearTimeout(temporizador);
  }
}

export const api = {
  usuarios: () => req<Usuario[]>("/users"),
  usuario: (id: number) => req<Usuario>(`/users/${id}`),
  postsPorUsuario: (id: number) => req<Post[]>(`/users/${id}/posts`),
  criarPost: (dados: NovoPost) =>
    req<Post>("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(dados),
    }),
  viaCep: async (cep: string): Promise<RespostaViaCep> => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      throw new Error("CEP inválido. O CEP deve conter exatamente 8 dígitos.");
    }

    const resultado = await req<RespostaViaCep>(
      `/${cepLimpo}/json/`,
      undefined,
      BASE_VIACEP,
    );

    // O ViaCEP retorna { erro: true } ou { erro: "true" } quando o CEP não existe
    if (resultado.erro === true || resultado.erro === "true") {
      throw new Error("CEP não encontrado na base do ViaCEP.");
    }

    return resultado;
  },
};
