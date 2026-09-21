import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { cores } from '../theme/cores';

type LinhaPerfilProps = {
  label: string;
  onPress?: () => void;
};

export default function LinhaPerfil({ label, onPress }: LinhaPerfilProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name="person-outline" size={18} color={cores.textoPrincipal} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
      <Ionicons name="chevron-down" size={18} color={cores.textoPrincipal} style={styles.chevron} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.superficieClara,
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
    color: cores.textoPrincipal,
  },
  chevron: {
    marginLeft: 8,
  },
});