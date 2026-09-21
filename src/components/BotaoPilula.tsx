import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

import { cores } from "../theme/cores";

type Props = {
  titulo: string;
  icone?: ComponentProps<typeof Ionicons>["name"];
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function BotaoPilula({ titulo, icone, onPress, style }: Props) {
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

const styles = StyleSheet.create({
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