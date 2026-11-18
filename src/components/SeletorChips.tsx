import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTema } from "../theme/TemaContext";
import type { Cores } from "../theme/temas";

type Opcao<T extends string> = {
  id: T;
  rotulo: string;
};

type Props<T extends string> = {
  opcoes: readonly Opcao<T>[];
  selecionado: T;
  onSelecionar: (id: T) => void;
  desabilitado?: boolean;
};

export function SeletorChips<T extends string>({
  opcoes,
  selecionado,
  onSelecionar,
  desabilitado = false,
}: Props<T>) {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <View style={styles.linha}>
      {opcoes.map((opcao) => {
        const ativo = opcao.id === selecionado;

        return (
          <Pressable
            key={opcao.id}
            style={[styles.chip, ativo && styles.chipAtivo]}
            disabled={desabilitado}
            onPress={() => onSelecionar(opcao.id)}
            accessibilityRole="button"
            accessibilityState={{ selected: ativo }}
          >
            <Text style={[styles.texto, ativo && styles.textoAtivo]}>
              {opcao.rotulo}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    linha: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    chip: {
      backgroundColor: cores.superficieClara,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: cores.borda,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    chipAtivo: {
      backgroundColor: cores.textoPrincipal,
      borderColor: cores.textoPrincipal,
    },
    texto: {
      color: cores.textoPrincipal,
      fontSize: 13,
      fontWeight: "600",
    },
    textoAtivo: {
      color: cores.fundo,
    },
  });
