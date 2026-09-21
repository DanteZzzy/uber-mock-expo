import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme/cores';

type PillBotaoProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
};

export default function PillBotao({ icon, label, onPress }: PillBotaoProps) {
  return (
    <TouchableOpacity style={styles.pill} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name={icon} size={16} color={cores.textoPrincipal} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: cores.superficieClara,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  label: {
    color: cores.textoPrincipal,
    fontSize: 13,
    fontWeight: '600',
  },
});
