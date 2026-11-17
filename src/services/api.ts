import type { Usuario } from "../types";

// Só variáveis EXPO_PUBLIC_ chegam ao app. Sem o .env, usamos a API pública de testes.
const BASE =
  process.env.EXPO_PUBLIC_API_URL ?? "https://jsonplaceholder.typicode.com";

async function req<T>(caminho: string): Promise<T> {
  const resposta = await fetch(BASE + caminho);

  // fetch só rejeita quando a rede falha: 404 e 500 chegam aqui e precisam ser checados
  if (!resposta.ok) throw new Error(`Falha ${resposta.status}`);

  return (await resposta.json()) as T;
}

export const api = {
  usuarios: () => req<Usuario[]>("/users"),
  usuario: (id: number) => req<Usuario>(`/users/${id}`),
};