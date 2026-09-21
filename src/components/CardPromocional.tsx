import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { cores } from '../theme/cores';

type CardPromocionalProps = {
  titulo: string;
  descricao: string;
  rightSlot?: React.ReactNode;
};

export default function CardPromocional({ titulo, descricao, rightSlot }: CardPromocionalProps) {
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

const styles = StyleSheet.create({
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