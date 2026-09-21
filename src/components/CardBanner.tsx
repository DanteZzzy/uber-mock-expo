import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme/cores';

type CardBannerProps = {
  titulo: string;
  textoBotao: string;
  onPress?: () => void;
};

export default function CardBanner({ titulo, textoBotao, onPress }: CardBannerProps) {
  return (
    <View style={styles.card}>
      <View style={styles.textos}>
        <Text style={styles.titulo}>{titulo}</Text>
        <TouchableOpacity style={styles.botao} onPress={onPress} activeOpacity={0.7}>
          <Text style={styles.botaoTexto}>{textoBotao}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconeWrapper}>
        <Ionicons name="card-outline" size={40} color={cores.textoPrincipal} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: cores.superficie,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 18,
    marginTop: 20,
  },
  textos: {
    flex: 1,
    marginRight: 12,
  },
  titulo: {
    color: cores.textoPrincipal,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 14,
  },
  botao: {
    alignSelf: 'flex-start',
    backgroundColor: cores.superficieClara,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  botaoTexto: {
    color: cores.textoPrincipal,
    fontSize: 13,
    fontWeight: '700',
  },
  iconeWrapper: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: cores.superficieClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
