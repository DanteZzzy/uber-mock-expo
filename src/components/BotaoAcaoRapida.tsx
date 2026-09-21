import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { cores } from '../theme/cores';

type BotaoAcaoRapidaProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
};

export default function BotaoAcaoRapida({ icon, label, onPress }: BotaoAcaoRapidaProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name={icon} size={20} color={cores.textoPrincipal} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.superficieClara,
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 14,
    width: '48%',
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: cores.textoPrincipal,
  },
});