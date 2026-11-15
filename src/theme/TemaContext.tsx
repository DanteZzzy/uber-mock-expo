import { createContext, ReactNode, useContext, useState } from "react";
import { useColorScheme } from "react-native";

import { Cores, temaClaro, temaEscuro } from "./temas";

type Modo = "claro" | "escuro";

type TemaContextoTipo = {
  modo: Modo;
  cores: Cores;
  alternarTema: () => void;
};

const TemaContexto = createContext<TemaContextoTipo | null>(null);

export function TemaProvider({ children }: { children: ReactNode }) {
  const sistema = useColorScheme();
  const [modo, setModo] = useState<Modo>(sistema === "light" ? "claro" : "escuro");

  const cores = modo === "escuro" ? temaEscuro : temaClaro;

  function alternarTema() {
    setModo((atual) => (atual === "escuro" ? "claro" : "escuro"));
  }

  return (
    <TemaContexto.Provider value={{ modo, cores, alternarTema }}>
      {children}
    </TemaContexto.Provider>
  );
}

export function useTema() {
  const contexto = useContext(TemaContexto);
  if (!contexto) {
    throw new Error("useTema precisa ser usado dentro do TemaProvider");
  }
  return contexto;
}