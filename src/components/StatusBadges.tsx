import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type StatusBadgesProps = {
  avaliacao: number;
  verificado: boolean;
};

export default function StatusBadges({ avaliacao, verificado }: StatusBadgesProps) {
  return (
    <View style={styles.row}>
      <View style={styles.badge}>
        <Ionicons name="star" size={14} color="#000" />
        <Text style={styles.badgeText}>{avaliacao.toFixed(2)}</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {verificado ? 'Verificado' : 'Não verificado'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
