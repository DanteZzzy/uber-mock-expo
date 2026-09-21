import { StyleSheet, Text, View } from "react-native";

import type { Atividade } from "../../data/atividades";
import { cores } from "../../theme/cores";
import { BotaoPilula } from "../BotaoPilula";

type Props = {
  atividade: Atividade;
  onReagendar?: () => void;
  grande?: boolean;
};

export function ItemAtividade({
  atividade,
  onReagendar,
  grande = false,
}: Props) {
  const { destino, data, valor, detalhe } = atividade;

  return (
    <View style={[styles.item, grande && styles.itemGrande]}>
      <View style={[styles.miniatura, grande && styles.miniaturaGrande]}>
        <Text style={[styles.emoji, grande && styles.emojiGrande]}>🚗</Text>
      </View>

      <View style={styles.textos}>
        <Text
          style={[styles.destino, grande && styles.destinoGrande]}
          numberOfLines={1}
        >
          {destino}
        </Text>
        <Text style={[styles.detalhe, grande && styles.detalheGrande]}>
          {data}
        </Text>
        <Text style={[styles.detalhe, grande && styles.detalheGrande]}>
          {valor}
          {detalhe ? ` • ${detalhe}` : ""}
        </Text>
      </View>

      <BotaoPilula titulo="Reagendar" icone="refresh" onPress={onReagendar} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  itemGrande: {
    gap: 16,
    paddingVertical: 16,
  },
  miniatura: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: cores.superficie,
    alignItems: "center",
    justifyContent: "center",
  },
  miniaturaGrande: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  emoji: {
    fontSize: 28,
  },
  emojiGrande: {
    fontSize: 38,
  },
  textos: {
    flex: 1,
    gap: 2,
  },
  destino: {
    color: cores.textoPrincipal,
    fontSize: 18,
    fontWeight: "600",
  },
  destinoGrande: {
    fontSize: 21,
  },
  detalhe: {
    color: cores.textoSecundario,
    fontSize: 15,
  },
  detalheGrande: {
    fontSize: 17,
  },
});