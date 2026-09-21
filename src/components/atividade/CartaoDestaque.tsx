import { StyleSheet, Text, View } from "react-native";

import type { AtividadeDestaque } from "../../data/atividades";
import { cores } from "../../theme/cores";
import { BotaoPilula } from "../BotaoPilula";

type Props = {
  atividade: AtividadeDestaque;
  onReagendar?: () => void;
  grande?: boolean;
};

export function CartaoDestaque({
  atividade,
  onReagendar,
  grande = false,
}: Props) {
  const { destino, data, valor, detalhe, referencia } = atividade;

  return (
    <View style={[styles.cartao, grande && styles.cartaoGrande]}>
      <View style={[styles.mapa, grande && styles.mapaGrande]}>
        <View style={styles.ruaVertical} />
        <View style={styles.ruaDiagonal} />

        <View style={[styles.pino, grande && styles.pinoGrande]}>
          <View style={[styles.pinoInterno, grande && styles.pinoInternoGrande]} />
        </View>
        <Text style={[styles.referencia, grande && styles.referenciaGrande]}>
          {referencia}
        </Text>
      </View>

      <Text style={[styles.destino, grande && styles.destinoGrande]}>
        {destino}
      </Text>
      <Text style={[styles.detalhe, grande && styles.detalheGrande]}>
        {data}
      </Text>
      <Text style={[styles.detalhe, grande && styles.detalheGrande]}>
        {valor}
        {detalhe ? ` • ${detalhe}` : ""}
      </Text>

      <BotaoPilula
        titulo="Reagendar"
        icone="refresh"
        onPress={onReagendar}
        style={[styles.botao, grande && styles.botaoGrande]}
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
  cartaoGrande: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
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
  mapaGrande: {
    height: 260,
    borderRadius: 16,
    marginBottom: 20,
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
    height: 400,
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
  pinoGrande: {
    width: 28,
    height: 28,
    borderRadius: 5,
  },
  pinoInterno: {
    width: 6,
    height: 6,
    backgroundColor: "#000",
  },
  pinoInternoGrande: {
    width: 8,
    height: 8,
  },
  referencia: {
    color: cores.textoSecundario,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  referenciaGrande: {
    fontSize: 15,
  },
  destino: {
    color: cores.textoPrincipal,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },
  destinoGrande: {
    fontSize: 26,
    marginBottom: 8,
  },
  detalhe: {
    color: cores.textoSecundario,
    fontSize: 16,
    marginBottom: 2,
  },
  detalheGrande: {
    fontSize: 18,
  },
  botao: {
    alignSelf: "flex-start",
    marginTop: 16,
  },
  botaoGrande: {
    marginTop: 20,
  },
});