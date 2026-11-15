import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useTema } from '../theme/TemaContext';
import type { Cores } from '../theme/temas';
import { BotaoTema } from './BotaoTema';

type CabecalhoContaProps = {
  nome: string;
  avatarUrl: string;
};

export default function CabecalhoConta({ nome, avatarUrl }: CabecalhoContaProps) {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <View style={styles.row}>
      <Text style={styles.nome} numberOfLines={2}>
        {nome}
      </Text>
      <View style={styles.ladoDireito}>
        <BotaoTema />
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      </View>
    </View>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    nome: {
      flex: 1,
      fontSize: 30,
      fontWeight: '800',
      lineHeight: 33,
      marginRight: 12,
      letterSpacing: -0.5,
      color: cores.textoPrincipal,
    },
    ladoDireito: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: cores.superficieClara,
    },
  });
