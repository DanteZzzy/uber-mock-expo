import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useTema } from "../theme/TemaContext";
import type { Cores } from "../theme/temas";

type BarraBuscaProps = {
  nomeUsuario?: string;
  onPress?: () => void;
  onPressAgendar?: () => void;
};

export default function BarraBusca({
  nomeUsuario = "Usuário",
  onPress,
  onPressAgendar,
}: BarraBuscaProps) {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.busca}
        activeOpacity={onPress ? 0.7 : 1}
        onPress={onPress}
      >
        <Ionicons name="search" size={18} color={cores.textoSecundario} />
        <Text style={styles.placeholder}>
          Olá, {nomeUsuario.toUpperCase()}.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botaoAgendar}
        activeOpacity={0.7}
        onPress={onPressAgendar}
      >
        <Ionicons
          name="calendar-outline"
          size={16}
          color={cores.textoPrincipal}
        />
        <Text style={styles.textoAgendar}>Mais tarde</Text>
      </TouchableOpacity>
    </View>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginTop: 18,
    },
    busca: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: cores.superficieClara,
      borderRadius: 24,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderWidth: 1,
      borderColor: cores.borda,
    },
    placeholder: {
      color: cores.textoSecundario,
      fontSize: 15,
      fontWeight: "600",
    },
    botaoAgendar: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: cores.superficieClara,
      borderRadius: 24,
      paddingHorizontal: 14,
      paddingVertical: 14,
      borderWidth: 1,
      borderColor: cores.borda,
    },
    textoAgendar: {
      color: cores.textoPrincipal,
      fontSize: 14,
      fontWeight: "700",
    },
  });
