import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type BannerPromoProps = {
  titulo: string;
  legenda?: string;
  corFundo: string;
};

// Cores vivas específicas dos banners promocionais — não fazem parte da paleta base do app,
// são cores de marketing/campanha, por isso ficam soltas aqui em vez de em cores.ts
export default function BannerPromo({ titulo, legenda, corFundo }: BannerPromoProps) {
  return (
    <View style={[styles.banner, { backgroundColor: corFundo }]}>
      <Text style={styles.titulo}>{titulo}</Text>
      {legenda && <Text style={styles.legenda}>{legenda}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: 260,
    height: 130,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'flex-end',
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 22,
  },
  legenda: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    opacity: 0.9,
  },
});
