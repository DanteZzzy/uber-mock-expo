import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";

import { buscarRestaurante, CHAVE_CARRINHO } from "../data/restaurantes";
import { useArmazenamento } from "../hooks/useArmazenamento";
import type { Carrinho, ItemCardapio, Restaurante } from "../types";

type CarrinhoContextoTipo = {
  carregado: boolean;
  restaurante: Restaurante | undefined;
  itens: Carrinho["itens"];
  totalItens: number;
  subtotal: number;
  taxaEntrega: number;
  total: number;
  quantidadeDoItem: (itemId: string) => number;
  adicionar: (restauranteId: string, item: ItemCardapio) => Promise<void>;
  alterarQuantidade: (itemId: string, variacao: number) => Promise<void>;
  remover: (itemId: string) => Promise<void>;
  limpar: () => Promise<void>;
};

const CARRINHO_VAZIO: Carrinho = { restauranteId: null, itens: [] };

const CarrinhoContext = createContext<CarrinhoContextoTipo | null>(null);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho, carregado] = useArmazenamento<Carrinho>(
    CHAVE_CARRINHO,
    CARRINHO_VAZIO,
  );

  const adicionar = useCallback(
    async (restauranteId: string, item: ItemCardapio) => {
      await setCarrinho((anterior) => {
        // O carrinho só aceita itens de uma loja por vez
        const base =
          anterior.restauranteId === restauranteId
            ? anterior.itens
            : [];
        const existente = base.find((i) => i.itemId === item.id);

        const itens = existente
          ? base.map((i) =>
              i.itemId === item.id ? { ...i, quantidade: i.quantidade + 1 } : i,
            )
          : [
              ...base,
              {
                itemId: item.id,
                nome: item.nome,
                preco: item.preco,
                quantidade: 1,
              },
            ];

        return { restauranteId, itens };
      });
    },
    [setCarrinho],
  );

  const alterarQuantidade = useCallback(
    async (itemId: string, variacao: number) => {
      await setCarrinho((anterior) => {
        const itens = anterior.itens
          .map((i) =>
            i.itemId === itemId
              ? { ...i, quantidade: i.quantidade + variacao }
              : i,
          )
          .filter((i) => i.quantidade > 0);

        return itens.length === 0
          ? CARRINHO_VAZIO
          : { ...anterior, itens };
      });
    },
    [setCarrinho],
  );

  const remover = useCallback(
    async (itemId: string) => {
      await setCarrinho((anterior) => {
        const itens = anterior.itens.filter((i) => i.itemId !== itemId);
        return itens.length === 0 ? CARRINHO_VAZIO : { ...anterior, itens };
      });
    },
    [setCarrinho],
  );

  const limpar = useCallback(async () => {
    await setCarrinho(CARRINHO_VAZIO);
  }, [setCarrinho]);

  const valor = useMemo<CarrinhoContextoTipo>(() => {
    const restaurante = carrinho.restauranteId
      ? buscarRestaurante(carrinho.restauranteId)
      : undefined;
    const subtotal = carrinho.itens.reduce(
      (soma, i) => soma + i.preco * i.quantidade,
      0,
    );
    const taxaEntrega = carrinho.itens.length > 0 ? (restaurante?.taxaEntrega ?? 0) : 0;

    return {
      carregado,
      restaurante,
      itens: carrinho.itens,
      totalItens: carrinho.itens.reduce((soma, i) => soma + i.quantidade, 0),
      subtotal,
      taxaEntrega,
      total: subtotal + taxaEntrega,
      quantidadeDoItem: (itemId) =>
        carrinho.itens.find((i) => i.itemId === itemId)?.quantidade ?? 0,
      adicionar,
      alterarQuantidade,
      remover,
      limpar,
    };
  }, [carrinho, carregado, adicionar, alterarQuantidade, remover, limpar]);

  return (
    <CarrinhoContext.Provider value={valor}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const contexto = useContext(CarrinhoContext);
  if (!contexto) {
    throw new Error("useCarrinho precisa ser usado dentro do CarrinhoProvider");
  }
  return contexto;
}
