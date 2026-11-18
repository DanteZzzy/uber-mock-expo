import { useMemo } from "react";
import { StyleSheet, Text, TextInputProps, View } from "react-native";

import { useTema } from "../theme/TemaContext";
import type { Cores } from "../theme/temas";
import { CampoTexto } from "./CampoTexto";

type Props = TextInputProps & {
  rotulo: string;
};

export function CampoRotulado({ rotulo, style, ...resto }: Props) {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <View style={styles.bloco}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <CampoTexto
        placeholderTextColor={cores.textoSecundario}
        accessibilityLabel={rotulo}
        {...resto}
        style={[styles.campo, style]}
      />
    </View>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    bloco: {
      gap: 6,
    },
    rotulo: {
      color: cores.textoSecundario,
      fontSize: 12,
      fontWeight: "700",
      textTransform: "uppercase",
    },
    campo: {
      backgroundColor: cores.superficie,
      color: cores.textoPrincipal,
      borderColor: cores.borda,
      borderWidth: 1,
    },
  });
