import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme/cores';

type BarraBuscaProps = {
  nomeUsuario: string;
};

export default function BarraBusca({ nomeUsuario }: BarraBuscaProps) {
  return (
    <View style={styles.row}>
      <View style={styles.busca}>
        <Ionicons name="search" size={18} color={cores.textoSecundario} />
        <Text style={styles.placeholder}>Olá, {nomeUsuario.toUpperCase()}.</Text>
      </View>
      <TouchableOpacity style={styles.botaoAgendar} activeOpacity={0.7}>
        <Ionicons name="calendar-outline" size={16} color={cores.textoPrincipal} />
        <Text style={styles.textoAgendar}>Mais tarde</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 18,
  },
  busca: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: cores.superficieClara,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  placeholder: {
    color: cores.textoSecundario,
    fontSize: 15,
    fontWeight: '600',
  },
  botaoAgendar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: cores.superficieClara,
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  textoAgendar: {
    color: cores.textoPrincipal,
    fontSize: 14,
    fontWeight: '700',
  },
});
