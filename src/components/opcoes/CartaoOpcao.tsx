import { Pressable, StyleSheet, Text, View } from "react-native";

import type { Opcao } from "../../data/opcoes";
import { cores } from "../../theme/cores";

type Props = {
  opcao: Opcao;
  onPress?: () => void;
};

export function CartaoOpcao({ opcao, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.cartao, pressed && styles.pressionado]}
    >
      {opcao.selo && (
        <View style={styles.selo}>
          <Text style={styles.textoSelo}>{opcao.selo}</Text>
        </View>
      )}

      <Text style={styles.emoji}>{opcao.emoji}</Text>
      <Text style={styles.titulo}>{opcao.titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cartao: {
    flex: 1,
    height: 104,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: cores.superficie,
    borderRadius: 16,
  },
  pressionado: {
    opacity: 0.8,
  },
  selo: {
    position: "absolute",
    top: -12,
    alignSelf: "center",
    backgroundColor: cores.destaque,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  textoSelo: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  emoji: {
    fontSize: 36,
  },
  titulo: {
    color: cores.textoPrincipal,
    fontSize: 16,
    fontWeight: "500",
  },
});