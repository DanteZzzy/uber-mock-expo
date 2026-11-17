import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useTema } from "../theme/TemaContext";
import type { Cores } from "../theme/temas";
import { BotaoPilula } from "./BotaoPilula";

type Props = {
  mensagem: string;
  onTentarDeNovo: () => void;
};

export default function EstadoErro({ mensagem, onTentarDeNovo }: Props) {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <View style={styles.caixa}>
      <Ionicons
        name="cloud-offline-outline"
        size={40}
        color={cores.textoSecundario}
      />
      <Text style={styles.titulo}>Ops, algo deu errado</Text>
      <Text style={styles.mensagem}>{mensagem}</Text>
      <BotaoPilula
        titulo="Tentar de novo"
        icone="refresh"
        onPress={onTentarDeNovo}
      />
    </View>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    caixa: {
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      paddingVertical: 32,
      paddingHorizontal: 16,
    },
    titulo: {
      color: cores.textoPrincipal,
      fontSize: 16,
      fontWeight: "700",
    },
    mensagem: {
      color: cores.textoSecundario,
      fontSize: 14,
      textAlign: "center",
      marginBottom: 6,
    },
  });