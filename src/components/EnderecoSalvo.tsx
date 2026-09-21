import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme/cores';

type EnderecoSalvoProps = {
  titulo: string;
  subtitulo: string;
  onPress?: () => void;
};

export default function EnderecoSalvo({ titulo, subtitulo, onPress }: EnderecoSalvoProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconeWrapper}>
        <Ionicons name="time-outline" size={18} color={cores.textoPrincipal} />
      </View>
      <View style={styles.textos}>
        <Text style={styles.titulo} numberOfLines={2}>
          {titulo}
        </Text>
        <Text style={styles.subtitulo} numberOfLines={1}>
          {subtitulo}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={cores.textoSecundario} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  iconeWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: cores.superficieClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: {
    flex: 1,
  },
  titulo: {
    color: cores.textoPrincipal,
    fontSize: 15,
    fontWeight: '700',
  },
  subtitulo: {
    color: cores.textoSecundario,
    fontSize: 13,
    marginTop: 2,
  },
});
