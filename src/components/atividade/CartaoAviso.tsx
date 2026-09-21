import { Pressable, StyleSheet, Text, View } from "react-native";

import { cores } from "../../theme/cores";

type Props = {
  titulo: string;
  acao: string;
  emoji: string;
  onPress?: () => void;
};

export function CartaoAviso({ titulo, acao, emoji, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.cartao, pressed && styles.pressionado]}
    >
      <View style={styles.textos}>
        <Text style={styles.titulo} numberOfLines={3}>
          {titulo}
        </Text>
        <Text style={styles.acao}>{acao} →</Text>
      </View>
      <Text style={styles.emoji}>{emoji}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cartao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  pressionado: {
    opacity: 0.8,
  },
  textos: {
    flex: 1,
    gap: 8,
  },
  titulo: {
    color: cores.textoPrincipal,
    fontSize: 20,
    fontWeight: "700",
  },
  acao: {
    color: cores.textoSecundario,
    fontSize: 15,
  },
  emoji: {
    fontSize: 56,
  },
});