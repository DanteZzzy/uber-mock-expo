import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useCarrinho } from "../../context/CarrinhoContext";
import { useTema } from "../../theme/TemaContext";
import type { Cores } from "../../theme/temas";
import { formatarMoeda } from "../../utils/formatacao";
import { Botao } from "../Botao";

type Props = {
  onPress: () => void;
};

export function BarraCarrinho({ onPress }: Props) {
  const { totalItens, subtotal } = useCarrinho();
  const { cores } = useTema();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  if (totalItens === 0) return null;

  return (
    <View style={[styles.barra, { paddingBottom: insets.bottom + 12 }]}>
      <View style={styles.conteudo}>
        <Botao
          titulo={`Ver carrinho • ${totalItens} ${totalItens === 1 ? "item" : "itens"} • ${formatarMoeda(subtotal)}`}
          onPress={onPress}
        />
      </View>
    </View>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    barra: {
      backgroundColor: cores.fundo,
      borderTopWidth: 1,
      borderTopColor: cores.borda,
      paddingTop: 12,
      paddingHorizontal: 16,
    },
    conteudo: {
      width: "100%",
      maxWidth: 520,
      alignSelf: "center",
    },
  });
