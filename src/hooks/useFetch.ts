import { useEffect, useState } from "react";

export function useFetch<T>(buscar: () => Promise<T>) {
  const [dados, setDados] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    buscar()
      .then(setDados)
      .catch((e) => setErro((e as Error).message))
      .finally(() => setLoading(false));
  }, [buscar]);

  return { dados, loading, erro };
}