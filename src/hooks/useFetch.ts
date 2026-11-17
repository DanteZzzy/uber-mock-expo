import { useCallback, useEffect, useRef, useState } from "react";

export function useFetch<T>(buscar: () => Promise<T>) {
  const [dados, setDados] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

    // só a última chamada pode mexer no estado (evita resposta velha sobrescrever a nova)
  const ultimaChamada = useRef(0);

  const carregar = useCallback(async () => {
    const chamada = ++ultimaChamada.current;
    setLoading(true);
    setErro(null);

    try {
      const resultado = await buscar();
      if (chamada === ultimaChamada.current) setDados(resultado);
    } catch (e) {
      if (chamada === ultimaChamada.current) setErro((e as Error).message);
    } finally {
      if (chamada === ultimaChamada.current) setLoading(false);
    }
  }, [buscar]);

    useEffect(() => {
    carregar();
    return () => {
      ultimaChamada.current += 1; // ao desmontar, ignora respostas que ainda estão a caminho
    };
  }, [carregar]);

  return { dados, loading, erro, recarregar: carregar };
}