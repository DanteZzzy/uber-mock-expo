import type { Usuario } from "../types";

// Só variáveis EXPO_PUBLIC_ chegam ao app. Sem o .env, usamos a API pública de testes.
const BASE =
  process.env.EXPO_PUBLIC_API_URL ?? "https://jsonplaceholder.typicode.com";

const TEMPO_LIMITE_MS = 10000;

async function req<T>(caminho: string): Promise<T> {
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TEMPO_LIMITE_MS);

  try {
    const resposta = await fetch(BASE + caminho, { signal: controlador.signal });

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
};