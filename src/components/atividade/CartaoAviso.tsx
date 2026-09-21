import { Pressable, StyleSheet, Text, View } from "react-native";

import { cores } from "../../theme/cores";

type Props = {
  titulo: string;
  acao: string;
  emoji: string;
  onPress?: () => void;
  grande?: boolean;
};

export function CartaoAviso({
  titulo,
  acao,
  emoji,
  onPress,
  grande = false,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.cartao,
        grande && styles.cartaoGrande,
        pressed && styles.pressionado,
      ]}
    >
      <View style={styles.textos}>
        <Text
          style={[styles.titulo, grande && styles.tituloGrande]}
          numberOfLines={3}
        >
          {titulo}
        </Text>
        <Text style={[styles.acao, grande && styles.acaoGrande]}>
          {acao} →
        </Text>
      </View>
      <Text style={[styles.emoji, grande && styles.emojiGrande]}>{emoji}</Text>
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
  cartaoGrande: {
    gap: 16,
    borderRadius: 20,
    padding: 28,
    marginBottom: 28,
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
  tituloGrande: {
    fontSize: 24,
  },
  acao: {
    color: cores.textoSecundario,
    fontSize: 15,
  },
  acaoGrande: {
    fontSize: 17,
  },
  emoji: {
    fontSize: 56,
  },
  emojiGrande: {
    fontSize: 72,
  },
});