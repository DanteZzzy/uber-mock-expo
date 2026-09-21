import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AbasTopo from '../../components/AbasTopo';
import AtalhoCircular from '../../components/AtalhoCircular';
import BarraBusca from '../../components/BarraBusca';
import CardBanner from '../../components/CardBanner';
import EnderecoSalvo from '../../components/EnderecoSalvo';
import { cores } from '../../theme/cores';

const ATALHOS = [
  { label: 'Viagem', icon: 'car-sport-outline', badge: '15%' },
  { label: 'Reserve', icon: 'calendar-outline', badge: 'Promo' },
  { label: 'Moto', icon: 'moped', iconLib: 'material-community' as const },
  { label: 'iFood', icon: 'fast-food-outline', badge: 'Novo' },
];

const ENDERECOS_SALVOS = [
  {
    titulo: 'Rua Augusto Calheiros, 305 - Raul Veiga',
    subtitulo: 'São Gonçalo - RJ, 24730-030',
  },
  {
    titulo: 'Salto Agulha',
    subtitulo: 'Av. Presidente Kennedy, 795 - Centro',
  },
];

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={[styles.conteudo, { paddingTop: insets.top + 12 }]}
    >
      <AbasTopo />
      <BarraBusca nomeUsuario="Igor" />

      <View style={styles.cardEnderecos}>
        {ENDERECOS_SALVOS.map((endereco, index) => (
          <React.Fragment key={endereco.titulo}>
            <EnderecoSalvo titulo={endereco.titulo} subtitulo={endereco.subtitulo} />
            {index < ENDERECOS_SALVOS.length - 1 && <View style={styles.divisor} />}
          </React.Fragment>
        ))}
      </View>

      <View style={styles.secaoHeader}>
        <Text style={styles.secaoTitulo}>Para você</Text>
        <TouchableOpacity style={styles.setaCircular} activeOpacity={0.7}>
          <Ionicons name="arrow-forward" size={16} color={cores.textoPrincipal} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carrossel}
      >
        {ATALHOS.map((atalho) => (
          <AtalhoCircular
            key={atalho.label}
            label={atalho.label}
            icon={atalho.icon}
            iconLib={atalho.iconLib}
            badge={atalho.badge}
          />
        ))}
      </ScrollView>

      <CardBanner
        titulo="Ganhe 10% off em 10 viagens, até R$ 15 por viagem!"
        textoBotao="Ver mais informações"
      />
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
  cardEnderecos: {
    backgroundColor: cores.superficie,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingHorizontal: 14,
    marginTop: 16,
  },
  divisor: {
    height: 1,
    backgroundColor: cores.borda,
  },
  secaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  secaoTitulo: {
    color: cores.textoPrincipal,
    fontSize: 20,
    fontWeight: '800',
  },
  setaCircular: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: cores.superficieClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carrossel: {
    gap: 16,
    paddingTop: 16,
    paddingRight: 8,
  },
});