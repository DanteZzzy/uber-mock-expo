import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import { Cores, temaClaro, temaEscuro } from "./temas";

type Modo = "claro" | "escuro";

type TemaContextoTipo = {
  modo: Modo;
  cores: Cores;
  alternarTema: () => void;
};

const CHAVE_ARMAZENAMENTO = "@uber_tema_modo";

const TemaContexto = createContext<TemaContextoTipo | null>(null);

export function TemaProvider({ children }: { children: ReactNode }) {
  const sistema = useColorScheme();
  const [modo, setModo] = useState<Modo>(sistema === "light" ? "claro" : "escuro");

  useEffect(() => {
    async function carregarTemaSalvo() {
      try {
        const salvo = await AsyncStorage.getItem(CHAVE_ARMAZENAMENTO);
        if (salvo === "claro" || salvo === "escuro") {
          setModo(salvo);
        }
      } catch (erro) {
        console.error("Erro ao carregar o tema salvo:", erro);
      }
    }

    carregarTemaSalvo();
  }, []);

  const cores = modo === "escuro" ? temaEscuro : temaClaro;

  async function alternarTema() {
    const novoModo: Modo = modo === "escuro" ? "claro" : "escuro";
    setModo(novoModo);
    try {
      await AsyncStorage.setItem(CHAVE_ARMAZENAMENTO, novoModo);
    } catch (erro) {
      console.error("Erro ao salvar o tema:", erro);
    }
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
