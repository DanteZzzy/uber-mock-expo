import type {
  OpcaoTamanhoEnvio,
  OpcaoTipoEnvio,
  TamanhoEnvio,
  TipoEnvio,
} from "../types";

export const CHAVE_ENVIOS = "@envios_registros";

export const TIPOS_ENVIO: readonly OpcaoTipoEnvio[] = [
  { id: "encomenda", nome: "Enviar", taxaBase: 12.9, recebe: false },
  { id: "recebimento", nome: "Receber", taxaBase: 12.9, recebe: true },
  { id: "retirada", nome: "Retirada na loja", taxaBase: 9.9, recebe: true },
  { id: "documentos", nome: "Documentos", taxaBase: 8.9, recebe: false },
  { id: "esquecido", nome: "Item esquecido", taxaBase: 11.9, recebe: false },
  { id: "equipamentos", nome: "Equipamentos", taxaBase: 18.9, recebe: true },
  { id: "suprimentos", nome: "Suprimentos", taxaBase: 14.9, recebe: true },
  { id: "presente", nome: "Presente", taxaBase: 13.9, recebe: false },
];

export const TAMANHOS_ENVIO: readonly OpcaoTamanhoEnvio[] = [
  { id: "pequeno", nome: "Pequeno", descricao: "Cabe numa mochila", fator: 1 },
  { id: "medio", nome: "Médio", descricao: "Caixa de sapatos", fator: 1.4 },
  { id: "grande", nome: "Grande", descricao: "Precisa de porta-malas", fator: 1.9 },
];

const VALOR_POR_KM = 1.9;

export function buscarTipoEnvio(id: string | undefined): OpcaoTipoEnvio {
  return TIPOS_ENVIO.find((tipo) => tipo.id === id) ?? TIPOS_ENVIO[0];
}

export function nomeDoTipoEnvio(id: TipoEnvio): string {
  return buscarTipoEnvio(id).nome;
}

export function nomeDoTamanhoEnvio(id: TamanhoEnvio): string {
  return TAMANHOS_ENVIO.find((tamanho) => tamanho.id === id)?.nome ?? id;
}

// Distância simulada a partir do tamanho do endereço, no mesmo estilo da viagem
export function calcularValorEnvio(
  tipo: TipoEnvio,
  tamanho: TamanhoEnvio,
  enderecoEntrega: string,
): number {
  const km = Math.max(
    2,
    Math.min(25, (enderecoEntrega.trim().length || 8) * 0.5),
  );
  const fator = TAMANHOS_ENVIO.find((t) => t.id === tamanho)?.fator ?? 1;
  return (buscarTipoEnvio(tipo).taxaBase + km * VALOR_POR_KM) * fator;
}
