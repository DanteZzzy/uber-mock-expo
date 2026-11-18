import React, { useMemo } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTema } from '../theme/TemaContext';
import type { Cores } from '../theme/temas';

type IconLib = 'ionicons' | 'material-community';

type AtalhoCircularProps = {
  label: string;
  icon: string;
  iconLib?: IconLib;
  badge?: string;
  ativo?: boolean;
  onPress?: () => void;
};

export default function AtalhoCircular({
  label,
  icon,
  iconLib = 'ionicons',
  badge,
  ativo = false,
  onPress,
}: AtalhoCircularProps) {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.circulo, ativo && styles.circuloAtivo]}>
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

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
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
    circuloAtivo: {
      borderWidth: 2,
      borderColor: cores.textoPrincipal,
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
