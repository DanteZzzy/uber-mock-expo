import { Ionicons } from "@expo/vector-icons";
import { ComponentProps, useMemo } from "react";
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

import { useTema } from "../theme/TemaContext";
import type { Cores } from "../theme/temas";

type Props = {
  titulo: string;
  icone?: ComponentProps<typeof Ionicons>["name"];
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function BotaoPilula({ titulo, icone, onPress, style }: Props) {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.botao,
        pressed && styles.pressionado,
        style,
      ]}
    >
      {icone && (
        <Ionicons name={icone} size={18} color={cores.textoPrincipal} />
      )}
      <Text style={styles.texto}>{titulo}</Text>
    </Pressable>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    botao: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: cores.superficieClara,
      borderRadius: 999,
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    pressionado: {
      opacity: 0.8,
    },
    texto: {
      color: cores.textoPrincipal,
      fontSize: 16,
      fontWeight: "500",
    },
  });
