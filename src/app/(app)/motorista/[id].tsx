import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useTema } from "../../../theme/TemaContext";
import type { Cores } from "../../../theme/temas";

export default function DetalheMotorista() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <View style={styles.tela}>
      <Text style={styles.texto}>Motorista ID: {id}</Text>
    </View>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    tela: {
      flex: 1,
      backgroundColor: cores.fundo,
      padding: 16,
    },
    texto: {
      color: cores.textoPrincipal,
      fontSize: 16,
    },
  });
