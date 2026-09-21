import { StyleSheet, Text, View } from "react-native";

import type { Atividade } from "../../data/atividades";
import { cores } from "../../theme/cores";
import { BotaoPilula } from "../BotaoPilula";

type Props = {
  atividade: Atividade;
  onReagendar?: () => void;
};

export function ItemAtividade({ atividade, onReagendar }: Props) {
  const { destino, data, valor, detalhe } = atividade;

  return (
    <View style={styles.item}>
      <View style={styles.miniatura}>
        <Text style={styles.emoji}>🚗</Text>
      </View>

      <View style={styles.textos}>
        <Text style={styles.destino} numberOfLines={1}>
          {destino}
        </Text>
        <Text style={styles.detalhe}>{data}</Text>
        <Text style={styles.detalhe}>
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
  miniatura: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: cores.superficie,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 28,
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
  detalhe: {
    color: cores.textoSecundario,
    fontSize: 15,
  },
});