import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type CardQuadradoPromoProps = {
  titulo: string;
  corFundo: string;
};

export default function CardQuadradoPromo({ titulo, corFundo }: CardQuadradoPromoProps) {
  return (
    <View style={[styles.card, { backgroundColor: corFundo }]}>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 110,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'flex-end',
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 18,
  },
});
