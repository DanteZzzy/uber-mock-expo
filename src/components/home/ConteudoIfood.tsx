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
  { id: 'banner1', imagem: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSreiJ_Tk3dNmCw8eT3O94KqcNL3UExWx4kO_SKXf08-g&s=10' } },
  { id: 'banner2', imagem: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaWbyIQabZwMBwD_wkdfONdgXIc6ccVku63F6SCzMiIQ&s=10' } },
];

const CARDS_QUADRADOS = [
  { id: 'card1', imagem: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWPU2drw0KGvNkHf5GCWJ-05gdedcWCa6jjm-rtBPGzA&s' } },
  { id: 'card2', imagem: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA_c6q_hjf_vC_BH_VLNbWjFkFEYMh_k3p0nRTYSvSmQ&s=10' } },
  { id: 'card3', imagem: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU90lim6Ab0fkWbkjtWuXXQuVXqg_VH91-D6FETiOxXw&s=10' } },
];

// Adicionada a propriedade imagem para os restaurantes
const RESTAURANTES_CUPOM = [
  { nome: 'Burger House', nota: 4.9, imagem: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKyuc7y5-W5VqqMFqmhX6OGV_IhO42ChS5pgLfHdKocg&s=10' } },
  { nome: 'Cheddar Point', nota: 4.6, imagem: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8X-YthSZLUnyri0VToBl-OmCQVAwyUGiI0LMfHYF0Pw&s=10' } }, // Use links reais ou require()
  { nome: 'Bacon Stack', nota: 4.2, imagem: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMsf75uwt_YWOEkvmBeQI-dWu9GsrXEgeHhe94zx5EXg&s=10' } },
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
          <BannerPromo key={banner.id} imagem={banner.imagem} />
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsQuadradosScroll}
      >
        {CARDS_QUADRADOS.map((card) => (
          <CardQuadradoPromo key={card.id} imagem={card.imagem} />
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
          <CardRestaurante 
            key={restaurante.nome} 
            nome={restaurante.nome} 
            nota={restaurante.nota} 
            imagem={restaurante.imagem} // Passando a imagem para o componente
          />
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