import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme/cores';

type LinhaAcaoQuadradaProps = {
  icon: keyof typeof Ionicons.glyphMap;
  titulo: string;
  onPress?: () => void;
};

export default function LinhaAcaoQuadrada({ icon, titulo, onPress }: LinhaAcaoQuadradaProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconeWrapper}>
        <Ionicons name={icon} size={20} color={cores.textoPrincipal} />
      </View>
      <Text style={styles.titulo}>{titulo}</Text>
      <Ionicons name="chevron-forward" size={18} color={cores.textoSecundario} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
  },
  iconeWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: cores.superficieClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    flex: 1,
    color: cores.textoPrincipal,
    fontSize: 16,
    fontWeight: '700',
  },
});
