import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cores } from '../../theme/cores';
import AtalhoCircular from '../AtalhoCircular';
import BannerPromo from '../BannerPromo';
import CampoBusca from '../CampoBusca';
import CardQuadradoPromo from '../CardQuadradoPromo';
import CardRestaurante from '../CardRestaurante';

const CATEGORIAS = [
  { label: 'Restaurantes', icon: 'restaurant-outline' },
  { label: 'Mercados', icon: 'basket-outline' },
  { label: 'Farmácias', icon: 'medkit-outline' },
  { label: 'Bebida gelada', icon: 'wine-outline', badge: 'Novo' },
  { label: 'Pet Shops', icon: 'paw-outline' },
  { label: 'Promoções', icon: 'pricetag-outline', badge: 'Novo' },
  { label: 'Shopping', icon: 'bag-outline' },
  { label: 'Gourmet', icon: 'restaurant' },
  { label: 'Só no iFood', icon: 'ribbon-outline', badge: 'Novo' },
  { label: 'Ver mais', icon: 'grid-outline' },
] as const;

const BANNERS = [
  { titulo: 'Pratos a partir de R$10, tá barato demais', corFundo: '#FF6B00' },
  { titulo: 'Mês do cliente: frete grátis', corFundo: cores.destaque },
];

const CARDS_QUADRADOS = [
  { titulo: 'entrega grátis aqui', corFundo: cores.destaque },
  { titulo: 'vem que aqui tem promoções', corFundo: '#B3141F' },
  { titulo: 'famosos com descontão', corFundo: '#7A0C13' },
];

const RESTAURANTES_CUPOM = [
  { nome: 'Burger House', nota: 4.9 },
  { nome: 'Cheddar Point', nota: 4.6 },
  { nome: 'Frango & Cia', nota: 4.2 },
];

export default function ConteudoIfood() {
  return (
    <>
      <View style={styles.localizacao}>
        <View style={styles.localizacaoTexto}>
          <Ionicons name="location" size={16} color={cores.textoPrincipal} />
          <Text style={styles.localizacaoLabel}>R. Hum Rg, 296</Text>
          <Ionicons name="chevron-down" size={14} color={cores.textoSecundario} />
        </View>
        <TouchableOpacity style={styles.menuBotao} activeOpacity={0.7}>
          <Ionicons name="menu" size={20} color={cores.textoPrincipal} />
        </TouchableOpacity>
      </View>

      <CampoBusca placeholder="Buscar lojas ou itens" />

      <View style={styles.grid}>
        {CATEGORIAS.map((categoria) => (
          <AtalhoCircular
            key={categoria.label}
            label={categoria.label}
            icon={categoria.icon}
            badge={categoria.badge}
          />
        ))}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bannersScroll}
      >
        {BANNERS.map((banner) => (
          <BannerPromo key={banner.titulo} titulo={banner.titulo} corFundo={banner.corFundo} />
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsQuadradosScroll}
      >
        {CARDS_QUADRADOS.map((card) => (
          <CardQuadradoPromo key={card.titulo} titulo={card.titulo} corFundo={card.corFundo} />
        ))}
      </ScrollView>

      <View style={styles.secaoHeader}>
        <View>
          <Text style={styles.secaoTitulo}>Restaurantes com Cupom</Text>
          <Text style={styles.secaoAd}>Ad</Text>
        </View>
        <Text style={styles.verMais}>Ver mais</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.restaurantesScroll}
      >
        {RESTAURANTES_CUPOM.map((restaurante) => (
          <CardRestaurante key={restaurante.nome} nome={restaurante.nome} nota={restaurante.nota} />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  localizacao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  localizacaoTexto: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  localizacaoLabel: {
    color: cores.textoPrincipal,
    fontSize: 16,
    fontWeight: '700',
  },
  menuBotao: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: cores.superficieClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 20,
    columnGap: 12,
    marginTop: 20,
  },
  bannersScroll: {
    gap: 12,
    marginTop: 20,
    paddingRight: 8,
  },
  cardsQuadradosScroll: {
    gap: 10,
    marginTop: 14,
    paddingRight: 8,
  },
  secaoHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 12,
  },
  secaoTitulo: {
    color: cores.textoPrincipal,
    fontSize: 18,
    fontWeight: '800',
  },
  secaoAd: {
    color: cores.textoSecundario,
    fontSize: 12,
    marginTop: 2,
  },
  verMais: {
    color: cores.destaque,
    fontSize: 13,
    fontWeight: '700',
  },
  restaurantesScroll: {
    gap: 14,
    paddingRight: 8,
  },
});