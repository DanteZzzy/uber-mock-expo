export type Opcao = {
  id: string;
  titulo: string;
  emoji: string;
  selo?: string;
};

export const opcoesPrincipais: Opcao[] = [
  { id: "viagem", titulo: "Viagem", emoji: "🚗", selo: "15%" },
  { id: "reserve", titulo: "Reserve", emoji: "📅", selo: "Promo" },
  { id: "moto", titulo: "Moto", emoji: "🏍️" },
];

export const opcoesSecundarias: Opcao[] = [
  { id: "comida", titulo: "Comida", emoji: "🍔", selo: "Novo" },
  { id: "teens", titulo: "Teens", emoji: "🧒" },
  { id: "enviar", titulo: "Enviar itens", emoji: "📦", selo: "15%" },
  { id: "seniors", titulo: "Seniors", emoji: "🧓" },
];