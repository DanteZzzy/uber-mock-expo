import { cores as temaEscuro } from "./cores";

export type Cores = Record<keyof typeof temaEscuro, string>;

export const temaClaro: Cores = {
  fundo: "#ffffff",
  superficie: "#f3f3f3",
  superficieClara: "#e6e6e6",
  borda: "#dcdcdc",
  textoPrincipal: "#000000",
  textoSecundario: "#6b6b6b",
  destaque: "#e11900",
};

export { temaEscuro };