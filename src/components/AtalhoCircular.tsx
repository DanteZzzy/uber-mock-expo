import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { cores } from '../theme/cores';

type IconLib = 'ionicons' | 'material-community';

type AtalhoCircularProps = {
  label: string;
  icon: string;
  iconLib?: IconLib;
  badge?: string;
  onPress?: () => void;
};

export default function AtalhoCircular({
  label,
  icon,
  iconLib = 'ionicons',
  badge,
  onPress,
}: AtalhoCircularProps) {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.circulo}>
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeTexto}>{badge}</Text>
          </View>
        )}
        {iconLib === 'ionicons' ? (
          <Ionicons name={icon as any} size={28} color={cores.textoPrincipal} />
        ) : (
          <MaterialCommunityIcons name={icon as any} size={28} color={cores.textoPrincipal} />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    width: 78,
  },
  circulo: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: cores.superficieClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    left: -4,
    backgroundColor: cores.destaque,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 1,
  },
  badgeTexto: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  label: {
    marginTop: 8,
    color: cores.textoPrincipal,
    fontSize: 13,
    fontWeight: '700',
  },
});
