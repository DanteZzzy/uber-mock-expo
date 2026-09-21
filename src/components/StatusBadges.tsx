import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { cores } from '../theme/cores';

type StatusBadgesProps = {
  avaliacao: number;
  verificado: boolean;
};

export default function StatusBadges({ avaliacao, verificado }: StatusBadgesProps) {
  return (
    <View style={styles.row}>
      <View style={styles.badge}>
        <Ionicons name="star" size={14} color={cores.textoPrincipal} />
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
    backgroundColor: cores.superficieClara,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: cores.textoPrincipal,
  },
});
