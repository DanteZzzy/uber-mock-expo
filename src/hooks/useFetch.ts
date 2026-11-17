import { useCallback, useEffect, useRef, useState } from "react";

export type ResultadoFetch<T> = {
  dados: T | null;
  loading: boolean;
  erro: string | null;
  // "Tentar de novo": volta para o estado de carregando
  recarregar: () => Promise<void>;
  // pull-to-refresh: mantém a lista na tela e só troca os dados quando a resposta chega
  // (se ainda não há dados, mostra o carregando para não piscar o estado "vazio")
  atualizar: () => Promise<void>;
};

// Atenção: `buscar` precisa ter referência estável (função do módulo ou useCallback),
// senão a busca roda de novo a cada renderização.
export function useFetch<T>(buscar: () => Promise<T>): ResultadoFetch<T> {
  const [dados, setDados] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // só a última chamada pode mexer no estado (evita resposta velha sobrescrever a nova)
  const ultimaChamada = useRef(0);

  const executar = useCallback(
    async (comLoading: boolean) => {
      const chamada = ++ultimaChamada.current;
      if (comLoading) setLoading(true);
      setErro(null);

      try {
        const resultado = await buscar();
        if (chamada === ultimaChamada.current) setDados(resultado);
      } catch (e) {
        if (chamada === ultimaChamada.current) setErro((e as Error).message);
      } finally {
        if (chamada === ultimaChamada.current) setLoading(false);
      }
    },
    [buscar],
  );

  useEffect(() => {
    executar(true);
    return () => {
      ultimaChamada.current += 1; // ao desmontar, ignora respostas que ainda estão a caminho
    };
  }, [executar]);

  return {
    dados,
    loading,
    erro,
    recarregar: () => executar(true),
    atualizar: () => executar(dados === null),
  };
}