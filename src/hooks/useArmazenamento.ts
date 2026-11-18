import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hook genérico para persistência local baseada em AsyncStorage.
 * Expõe [valor, salvar, carregado, remover, recarregar].
 * Trata erros de leitura, escrita e valores corrompidos retornando o valor inicial.
 */
export function useArmazenamento<T>(chave: string, valorInicial: T) {
  const [valor, setValorEstado] = useState<T>(valorInicial);
  const [carregado, setCarregado] = useState(false);
  const montadoRef = useRef(true);
  const inicialRef = useRef(valorInicial);

  const recarregar = useCallback(async () => {
    let lido = inicialRef.current;

    try {
      const item = await AsyncStorage.getItem(chave);
      if (item !== null) {
        try {
          lido = JSON.parse(item) as T;
        } catch {
          // Valor corrompido: regrava o valor inicial para recuperar
          await AsyncStorage.setItem(chave, JSON.stringify(inicialRef.current));
        }
      }
    } catch {
      // Falha de leitura: mantém o valor inicial
    }

    if (montadoRef.current) {
      setValorEstado(lido);
      setCarregado(true);
    }
  }, [chave]);

  useEffect(() => {
    montadoRef.current = true;
    recarregar();

    return () => {
      montadoRef.current = false;
    };
  }, [recarregar]);

  const salvar = useCallback(
    async (novoValor: T | ((antigo: T) => T)) => {
      setValorEstado((antigo) => {
        const proximo =
          typeof novoValor === "function"
            ? (novoValor as (antigo: T) => T)(antigo)
            : novoValor;

        AsyncStorage.setItem(chave, JSON.stringify(proximo)).catch(() => {
          // Falha ao gravar em disco: o estado em memória segue válido
        });

        return proximo;
      });
    },
    [chave],
  );

  const remover = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(chave);
    } catch {
      // Falha ao remover: ainda assim volta ao valor inicial em memória
    }
    if (montadoRef.current) {
      setValorEstado(inicialRef.current);
    }
  }, [chave]);

  return [valor, salvar, carregado, remover, recarregar] as const;
}