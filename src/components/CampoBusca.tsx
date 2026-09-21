import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme/cores';

type CampoBuscaProps = {
  placeholder: string;
};

export default function CampoBusca({ placeholder }: CampoBuscaProps) {
  return (
    <View style={styles.busca}>
      <Ionicons name="search" size={18} color={cores.textoSecundario} />
      <Text style={styles.placeholder}>{placeholder}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  busca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: cores.superficieClara,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    marginTop: 16,
  },
  placeholder: {
    color: cores.textoSecundario,
    fontSize: 15,
    fontWeight: '600',
  },
});
