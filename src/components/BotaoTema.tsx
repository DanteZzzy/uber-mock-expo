import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

import { useTema } from "../theme/TemaContext";

export function BotaoTema() {
  const { modo, cores, alternarTema } = useTema();

  return (
    <Pressable
      onPress={alternarTema}
      style={({ pressed }) => [
        styles.botao,
        { backgroundColor: cores.superficieClara },
        pressed && { opacity: 0.8 },
      ]}
    >
      <Ionicons
        name={modo === "escuro" ? "sunny-outline" : "moon-outline"}
        size={22}
        color={cores.textoPrincipal}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});