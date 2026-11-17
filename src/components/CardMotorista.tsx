import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useTema } from "../theme/TemaContext";
import type { Cores } from "../theme/temas";
import type { Usuario } from "../types";
import { iniciais } from "../utils/iniciais";

type Props = {
  usuario: Usuario;
};

export default function CardMotorista({ usuario }: Props) {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.iniciais}>{iniciais(usuario.name)}</Text>
      </View>
      <Text style={styles.nome} numberOfLines={1}>
        {usuario.name}
      </Text>
            <View style={styles.linhaCidade}>
        <Ionicons
          name="location-outline"
          size={13}
          color={cores.textoSecundario}
        />
        <Text style={styles.cidade} numberOfLines={1}>
          {usuario.address.city}
        </Text>
      </View>
    </View>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    card: {
      width: 150,
      alignItems: "center",
      backgroundColor: cores.superficie,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: cores.borda,
      paddingVertical: 16,
      paddingHorizontal: 12,
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: cores.superficieClara,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },
    iniciais: {
      color: cores.textoPrincipal,
      fontSize: 18,
      fontWeight: "800",
    },
    nome: {
      color: cores.textoPrincipal,
      fontSize: 14,
      fontWeight: "700",
      textAlign: "center",
    },
  });