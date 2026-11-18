import type { EnderecoUsuario } from "../types";

export const CHAVE_ENDERECOS = "@uber_enderecos";

export const ENDERECOS_PADRAO: EnderecoUsuario[] = [
  {
    id: "end_1",
    rotulo: "Casa",
    rua: "Rua Augusto Calheiros",
    numero: "305",
    complemento: "Apto 101",
    bairro: "Raul Veiga",
    cidade: "São Gonçalo",
    uf: "RJ",
    cep: "24730-030",
  },
  {
    id: "end_2",
    rotulo: "Trabalho",
    rua: "Av. Presidente Kennedy",
    numero: "795",
    complemento: "Salto Agulha",
    bairro: "Centro",
    cidade: "Niterói",
    uf: "RJ",
    cep: "24030-090",
  },
];

export function formatarEnderecoCompleto(endereco: EnderecoUsuario): string {
  const bairro = endereco.bairro ? ` - ${endereco.bairro}` : "";
  return `${endereco.rua}, ${endereco.numero}${bairro}, ${endereco.cidade} - ${endereco.uf}`;
}