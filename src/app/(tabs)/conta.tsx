import React from 'react';
import { ScrollView, View, StyleSheet, StatusBar, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CabecalhoConta from '../../components/CabecalhoConta';
import StatusBadges from '../../components/StatusBadges';
import LinhaPerfil from '../../components/LinhaPerfil';
import BotaoAcaoRapida from '../../components/BotaoAcaoRapida';
import CardPromocional from '../../components/CardPromocional';

const USUARIO_MOCK = {
  nome: 'Marcos Andrade Ferreira',
  avatarUrl: 'https://i.pravatar.cc/300?img=33',
  avaliacao: 4.96,
  verificado: false,
};

const ACOES_RAPIDAS = [
  { icon: 'help-buoy-outline', label: 'Ajuda' },
  { icon: 'wallet-outline', label: 'Carteira' },
  { icon: 'shield-checkmark-outline', label: 'Segurança' },
  { icon: 'mail-outline', label: 'Mensagens' },
] as const;

export default function Conta() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <CabecalhoConta nome={USUARIO_MOCK.nome} avatarUrl={USUARIO_MOCK.avatarUrl} />
      <StatusBadges avaliacao={USUARIO_MOCK.avaliacao} verificado={USUARIO_MOCK.verificado} />
      <LinhaPerfil label="Perfil Pessoal" />

      <View style={styles.grid}>
        {ACOES_RAPIDAS.map((acao) => (
          <BotaoAcaoRapida key={acao.label} icon={acao.icon} label={acao.label} />
        ))}
      </View>

      <CardPromocional
        titulo="Travel Pass"
        descricao="Economia na partida no aeroporto e muito mais ao viajar"
        rightSlot={<Ionicons name="pricetag" size={28} color="#000" />}
      />
      <CardPromocional
        titulo="Pacote Moto Flex"
        descricao="Economize 20% nas viagens do Uber Moto"
        rightSlot={<MaterialCommunityIcons name="moped" size={28} color="#000" />}
      />
      <CardPromocional
        titulo="Economize nas suas viagens"
        descricao="Evite picos de preço. Experimente grátis o preço fixo."
        rightSlot={<Ionicons name="map" size={28} color="#000" />}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: (Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0) + 16,
    paddingBottom: 110, // espaço extra pra não colidir com a navbar flutuante
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginTop: 12,
  },
});
