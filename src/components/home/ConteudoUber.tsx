import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores } from '../../theme/cores';
import AtalhoCircular from '../AtalhoCircular';
import BarraBusca from '../BarraBusca';
import CardBanner from '../CardBanner';
import EnderecoSalvo from '../EnderecoSalvo';

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

export default function ConteudoUber() {
  return (
    <>
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

      <View style={styles.carrossel}>
        {ATALHOS.map((atalho) => (
          <AtalhoCircular
            key={atalho.label}
            label={atalho.label}
            icon={atalho.icon}
            iconLib={atalho.iconLib}
            badge={atalho.badge}
          />
        ))}
      </View>

      <CardBanner
        titulo="Ganhe 10% off em 10 viagens, até R$ 15 por viagem!"
        textoBotao="Ver mais informações"
      />
    </>
  );
}

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    gap: 16,
    paddingTop: 16,
  },
});