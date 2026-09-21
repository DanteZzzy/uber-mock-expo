export type Atividade = {
  id: string;
  destino: string;
  data: string;
  valor: string;
  detalhe?: string;
};

export type AtividadeDestaque = Atividade & {
  referencia: string;
};

export const avisoAtividade = {
  titulo: "Você deixou de ganhar R$ 3,80 em créditos na sua última viagem",
  acao: "Assine grátis o Clube Plus",
  emoji: "🪙",
};

export const atividadeDestaque: AtividadeDestaque = {
  id: "destaque",
  destino: "Mercado Estrela do Sul",
  data: "31 de ago. • 12:33",
  valor: "R$ 0,00",
  detalhe: "Cancelada",
  referencia: "Padaria Central",
};

export const atividadesAnteriores: Atividade[] = [
  {
    id: "a1",
    destino: "Shopping Vila Nova",
    data: "12 de jul. • 21:20",
    valor: "R$ 44,21",
    detalhe: "Parada: 1",
  },
  {
    id: "a2",
    destino: "Aeroporto Regional",
    data: "25 de jun. • 16:45",
    valor: "R$ 0,00",
    detalhe: "Cancelada",
  },
  {
    id: "a3",
    destino: "Rua das Palmeiras, 240",
    data: "18 de jun. • 08:10",
    valor: "R$ 18,90",
  },
  {
    id: "a4",
    destino: "Parque Municipal",
    data: "02 de jun. • 19:05",
    valor: "R$ 27,35",
    detalhe: "Parada: 2",
  },
  {
    id: "a5",
    destino: "Terminal Rodoviário",
    data: "20 de mai. • 07:30",
    valor: "R$ 31,60",
  },
];