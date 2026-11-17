import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useTema } from "../theme/TemaContext";
import type { Cores } from "../theme/temas";

type Props = {
  mensagem: string;
};

export default function EstadoVazio({ mensagem }: Props) {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <View style={styles.caixa}>
      <Ionicons
        name="file-tray-outline"
        size={40}
        color={cores.textoSecundario}
      />
      <Text style={styles.mensagem}>{mensagem}</Text>
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
    mensagem: {
      color: cores.textoSecundario,
      fontSize: 14,
      textAlign: "center",
    },
  });