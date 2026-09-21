import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
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
  },
  descricao: {
    fontSize: 14,
    color: '#4A4A4A',
    lineHeight: 19,
  },
});
