import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cores } from '../../theme/cores';
import AbasTopo, { AbaId } from '../../components/AbasTopo';
import ConteudoUber from '../../components/home/ConteudoUber';
import ConteudoEnvios from '../../components/home/ConteudoEnvios';
import ConteudoIfood from '../../components/home/ConteudoIfood';

export default function Home() {
  const [abaSelecionada, setAbaSelecionada] = useState<AbaId>('uber');
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={[styles.conteudo, { paddingTop: insets.top + 12 }]}
    >
      <AbasTopo abaSelecionada={abaSelecionada} onSelecionar={setAbaSelecionada} />

      {abaSelecionada === 'uber' && <ConteudoUber />}
      {abaSelecionada === 'envios' && <ConteudoEnvios />}
      {abaSelecionada === 'ifood' && <ConteudoIfood />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    paddingHorizontal: 16,
    paddingBottom: 100, // espaço pra não colidir com a navbar flutuante
  },
});
