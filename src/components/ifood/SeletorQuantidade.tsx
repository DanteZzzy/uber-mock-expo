import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTema } from "../../theme/TemaContext";
import type { Cores } from "../../theme/temas";

type Props = {
  quantidade: number;
  onAumentar: () => void;
  onDiminuir: () => void;
};

export function SeletorQuantidade({ quantidade, onAumentar, onDiminuir }: Props) {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <View style={styles.caixa}>
      <Pressable
        onPress={onDiminuir}
        hitSlop={6}
        accessibilityRole="button"
        accessibilityLabel="Diminuir quantidade"
      >
        <Ionicons
          name={quantidade <= 1 ? "trash-outline" : "remove"}
          size={20}
          color={cores.textoPrincipal}
        />
      </Pressable>
      <Text style={styles.quantidade}>{quantidade}</Text>
      <Pressable
        onPress={onAumentar}
        hitSlop={6}
        accessibilityRole="button"
        accessibilityLabel="Aumentar quantidade"
      >
        <Ionicons name="add" size={20} color={cores.textoPrincipal} />
      </Pressable>
    </View>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    caixa: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: cores.superficieClara,
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    quantidade: {
      minWidth: 18,
      textAlign: "center",
      color: cores.textoPrincipal,
      fontSize: 16,
      fontWeight: "700",
    },
  });
