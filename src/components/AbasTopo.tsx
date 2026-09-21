import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme/cores';

export type AbaId = 'uber' | 'envios' | 'ifood';

type Aba = {
  id: AbaId;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const ABAS: Aba[] = [
  { id: 'uber', label: 'Uber', icon: 'car-outline' },
  { id: 'envios', label: 'Envios', icon: 'cube-outline' },
  { id: 'ifood', label: 'iFood', icon: 'fast-food-outline' },
];

type AbasTopoProps = {
  abaSelecionada: AbaId;
  onSelecionar: (id: AbaId) => void;
};

export default function AbasTopo({ abaSelecionada, onSelecionar }: AbasTopoProps) {
  return (
    <View style={styles.row}>
      {ABAS.map((aba) => {
        const ativa = aba.id === abaSelecionada;
        return (
          <TouchableOpacity
            key={aba.id}
            style={styles.abaWrapper}
            onPress={() => onSelecionar(aba.id)}
            activeOpacity={0.7}
          >
            <View style={styles.aba}>
              <Ionicons
                name={aba.icon}
                size={18}
                color={ativa ? cores.textoPrincipal : cores.textoSecundario}
              />
              <Text style={[styles.label, ativa && styles.labelAtiva]}>{aba.label}</Text>
            </View>
            {ativa && <View style={styles.indicador} />}
          </TouchableOpacity>
        );
      })}
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
