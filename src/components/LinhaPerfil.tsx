import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type LinhaPerfilProps = {
  label: string;
  onPress?: () => void;
};

export default function LinhaPerfil({ label, onPress }: LinhaPerfilProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name="person-outline" size={18} color="#000" style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
      <Ionicons name="chevron-down" size={18} color="#000" style={styles.chevron} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  chevron: {
    marginLeft: 8,
  },
});
