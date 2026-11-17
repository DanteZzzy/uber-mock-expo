import { useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { useTema } from "../theme/TemaContext";
import type { Cores } from "../theme/temas";

type Props = {
  mensagem?: string;
};

export default function EstadoCarregando({ mensagem = "Carregando..." }: Props) {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <View style={styles.caixa}>
      <ActivityIndicator size="large" color={cores.textoPrincipal} />
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    caixa: {
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      paddingVertical: 32,
    },
    mensagem: {
      color: cores.textoSecundario,
      fontSize: 14,
    },
  });