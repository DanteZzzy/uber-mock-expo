import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme/cores';

type Aba = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  ativa?: boolean;
};

const ABAS: Aba[] = [
  { label: 'Uber', icon: 'car-outline', ativa: true },
  { label: 'Envios', icon: 'cube-outline' },
  { label: 'iFood', icon: 'fast-food-outline' },
];

export default function AbasTopo() {
  return (
    <View style={styles.row}>
      {ABAS.map((aba) => (
        <View key={aba.label} style={styles.abaWrapper}>
          <View style={styles.aba}>
            <Ionicons
              name={aba.icon}
              size={18}
              color={aba.ativa ? cores.textoPrincipal : cores.textoSecundario}
            />
            <Text style={[styles.label, aba.ativa && styles.labelAtiva]}>{aba.label}</Text>
          </View>
          {aba.ativa && <View style={styles.indicador} />}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 24,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
    paddingBottom: 10,
  },
  abaWrapper: {
    alignItems: 'center',
  },
  aba: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 15,
    color: cores.textoSecundario,
    fontWeight: '600',
  },
  labelAtiva: {
    color: cores.textoPrincipal,
    fontWeight: '800',
  },
  indicador: {
    marginTop: 8,
    height: 2,
    width: '100%',
    backgroundColor: cores.textoPrincipal,
    borderRadius: 1,
  },
});
