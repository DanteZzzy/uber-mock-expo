import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme/cores';

type CardRestauranteProps = {
  nome: string;
  nota: number;
};

export default function CardRestaurante({ nome, nota }: CardRestauranteProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imagem}>
        <View style={styles.notaBadge}>
          <Ionicons name="star" size={11} color="#000" />
          <Text style={styles.notaTexto}>{nota.toFixed(1)}</Text>
        </View>
      </View>
      <Text style={styles.nome} numberOfLines={1}>
        {nome}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 130,
  },
  imagem: {
    width: 130,
    height: 90,
    borderRadius: 12,
    backgroundColor: cores.superficieClara,
    justifyContent: 'flex-start',
    padding: 8,
  },
  notaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  notaTexto: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000',
  },
  nome: {
    color: cores.textoPrincipal,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 6,
  },
});
