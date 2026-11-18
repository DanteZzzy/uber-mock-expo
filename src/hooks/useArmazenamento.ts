import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hook genérico para persistência local baseada em AsyncStorage.
 * Expõe [valor, salvar, carregado, remover].
 * Trata erros de leitura, escrita e valores corrompidos retornando o fallback seguro.
 */
export function useArmazenamento<T>(chave: string, valorInicial: T) {
  const [valor, setValorEstado] = useState<T>(valorInicial);
  const [carregado, setCarregado] = useState(false);
  const montadoRef = useRef(true);

  useEffect(() => {
    montadoRef.current = true;

    async function carregar() {
      try {
        const item = await AsyncStorage.getItem(chave);
        if (item !== null) {
          try {
            const dadoParseado = JSON.parse(item) as T;
            if (montadoRef.current) {
              setValorEstado(dadoParseado);
            }
          } catch {
            // Valor corrompido no AsyncStorage: recupera com valor inicial
            if (montadoRef.current) {
              setValorEstado(valorInicial);
            }
            await AsyncStorage.setItem(chave, JSON.stringify(valorInicial));
          }
        } else {
          if (montadoRef.current) {
            setValorEstado(valorInicial);
          }
        }
      } catch {
        if (montadoRef.current) {
          setValorEstado(valorInicial);
        }
      } finally {
        if (montadoRef.current) {
          setCarregado(true);
        }
      }
    }

    carregar();

    return () => {
      montadoRef.current = false;
    };
  }, [chave]);

  const salvar = useCallback(
    async (novoValor: T | ((antigo: T) => T)) => {
      try {
        setValorEstado((antigo) => {
          const proximo =
            typeof novoValor === "function"
              ? (novoValor as (antigo: T) => T)(antigo)
              : novoValor;

          AsyncStorage.setItem(chave, JSON.stringify(proximo)).catch(() => {
            // Tratamento caso a escrita falhe em disco
          });

          return proximo;
        });
      } catch {
        // Falha ao processar valor
      }
    },
    [chave],
  );

  const remover = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(chave);
      if (montadoRef.current) {
        setValorEstado(valorInicial);
      }
    } catch {
      // Ignora falha na remoção
    }
  }, [chave, valorInicial]);

  return [valor, salvar, carregado, remover] as const;
}
