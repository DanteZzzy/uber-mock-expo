import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTema } from '../theme/TemaContext';
import type { Cores } from '../theme/temas';

type CardPromocionalProps = {
  titulo: string;
  descricao: string;
  rightSlot?: React.ReactNode;
};

export default function CardPromocional({ titulo, descricao, rightSlot }: CardPromocionalProps) {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <View style={styles.card}>
      <View style={styles.textBlock}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.descricao}>{descricao}</Text>
      </View>
      {rightSlot}
    </View>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: cores.superficie,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: cores.borda,
      padding: 18,
      marginTop: 14,
    },
    textBlock: {
      flex: 1,
      marginRight: 12,
    },
    titulo: {
      fontSize: 17,
      fontWeight: '700',
      marginBottom: 4,
      color: cores.textoPrincipal,
    },
    descricao: {
      fontSize: 14,
      color: cores.textoSecundario,
      lineHeight: 19,
    },
  });
