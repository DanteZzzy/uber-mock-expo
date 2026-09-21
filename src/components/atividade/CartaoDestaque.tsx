import { StyleSheet, Text, View } from "react-native";

import type { AtividadeDestaque } from "../../data/atividades";
import { cores } from "../../theme/cores";
import { BotaoPilula } from "../BotaoPilula";

type Props = {
  atividade: AtividadeDestaque;
  onReagendar?: () => void;
};

export function CartaoDestaque({ atividade, onReagendar }: Props) {
  const { destino, data, valor, detalhe, referencia } = atividade;

  return (
    <View style={styles.cartao}>
      <View style={styles.mapa}>
        <View style={styles.ruaVertical} />
        <View style={styles.ruaDiagonal} />

        <View style={styles.pino}>
          <View style={styles.pinoInterno} />
        </View>
        <Text style={styles.referencia}>{referencia}</Text>
      </View>

      <Text style={styles.destino}>{destino}</Text>
      <Text style={styles.detalhe}>{data}</Text>
      <Text style={styles.detalhe}>
        {valor}
        {detalhe ? ` • ${detalhe}` : ""}
      </Text>

      <BotaoPilula
        titulo="Reagendar"
        icone="refresh"
        onPress={onReagendar}
        style={styles.botao}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  mapa: {
    height: 170,
    borderRadius: 12,
    backgroundColor: cores.superficieClara,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  ruaVertical: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "42%",
    width: 22,
    backgroundColor: "#3a3a3a",
  },
  ruaDiagonal: {
    position: "absolute",
    top: -40,
    left: "12%",
    width: 16,
    height: 300,
    backgroundColor: "#3a3a3a",
    transform: [{ rotate: "55deg" }],
  },
  pino: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  pinoInterno: {
    width: 6,
    height: 6,
    backgroundColor: "#000",
  },
  referencia: {
    color: cores.textoSecundario,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  destino: {
    color: cores.textoPrincipal,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },
  detalhe: {
    color: cores.textoSecundario,
    fontSize: 16,
    marginBottom: 2,
  },
  botao: {
    alignSelf: "flex-start",
    marginTop: 16,
  },
});