import { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  titulo: string;
  onPress?: () => void;
  variante?: "primario" | "social";
  icone?: ReactNode;
};

export function Botao({ titulo, onPress, variante = "primario", icone }: Props) {
  const primario = variante === "primario";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        primario ? styles.primario : styles.social,
        pressed && styles.pressionado,
      ]}
    >
      {icone}
      <Text style={[styles.texto, primario && styles.textoPrimario]}>
        {titulo}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 8,
    paddingVertical: 14,
  },
  primario: {
    backgroundColor: "#111",
  },
  social: {
    backgroundColor: "#eee",
  },
  pressionado: {
    opacity: 0.8,
  },
  texto: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  textoPrimario: {
    color: "#fff",
  },
});