import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTema } from '../../theme/TemaContext';
import type { Cores } from '../../theme/temas';
import AtalhoCircular from '../AtalhoCircular';
import BannerPromo from '../BannerPromo';
import CampoBusca from '../CampoBusca';
import CardQuadradoPromo from '../CardQuadradoPromo';
import CardRestaurante from '../CardRestaurante';
import EstadoVazio from '../EstadoVazio';
import {
  CATEGORIAS_IFOOD,
  filtrarRestaurantes,
  RESTAURANTES,
} from '../../data/restaurantes';
import type { CategoriaIfoodId } from '../../types';

const BANNERS = [
  { id: 'banner1', imagem: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSreiJ_Tk3dNmCw8eT3O94KqcNL3UExWx4kO_SKXf08-g&s=10' } },
  { id: 'banner2', imagem: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaWbyIQabZwMBwD_wkdfONdgXIc6ccVku63F6SCzMiIQ&s=10' } },
];

const CARDS_QUADRADOS = [
  { id: 'card1', imagem: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWPU2drw0KGvNkHf5GCWJ-05gdedcWCa6jjm-rtBPGzA&s' } },
  { id: 'card2', imagem: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA_c6q_hjf_vC_BH_VLNbWjFkFEYMh_k3p0nRTYSvSmQ&s=10' } },
  { id: 'card3', imagem: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU90lim6Ab0fkWbkjtWuXXQuVXqg_VH91-D6FETiOxXw&s=10' } },
];

export default function ConteudoIfood() {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);
  const router = useRouter();

  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaIfoodId | null>(null);

  const filtrando = categoriaAtiva !== null || busca.trim() !== '';

  const resultados = useMemo(
    () => filtrarRestaurantes(RESTAURANTES, categoriaAtiva, busca),
    [categoriaAtiva, busca],
  );
  const comCupom = useMemo(() => RESTAURANTES.filter((r) => r.cupom), []);

  const tituloResultados =
    CATEGORIAS_IFOOD.find((c) => c.id === categoriaAtiva)?.label ?? 'Resultados da busca';

  function aoSelecionarCategoria(id: CategoriaIfoodId) {
    setCategoriaAtiva((atual) => (atual === id ? null : id));
  }

  function abrirRestaurante(id: string) {
    router.push(`/restaurante/${id}`);
  }

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

      <CampoBusca placeholder="Buscar lojas ou itens" valor={busca} onChangeText={setBusca} />

      <View style={styles.grid}>
        {CATEGORIAS_IFOOD.map((categoria) => (
          <AtalhoCircular
            key={categoria.id}
            label={categoria.label}
            icon={categoria.icon}
            badge={categoria.badge}
            ativo={categoria.id === categoriaAtiva}
            onPress={() => aoSelecionarCategoria(categoria.id)}
          />
        ))}
      </View>

      {filtrando ? (
        <>
          <View style={styles.secaoHeader}>
            <Text style={styles.secaoTitulo}>{tituloResultados}</Text>
            <Text style={styles.verMais}>
              {resultados.length} {resultados.length === 1 ? 'loja' : 'lojas'}
            </Text>
          </View>

          {resultados.length === 0 ? (
            <EstadoVazio mensagem="Nenhuma loja encontrada para esse filtro." />
          ) : (
            <View style={styles.resultados}>
              {resultados.map((restaurante) => (
                <CardRestaurante
                  key={restaurante.id}
                  id={restaurante.id}
                  nome={restaurante.nome}
                  nota={restaurante.nota}
                  imagem={{ uri: restaurante.imagem }}
                  onPress={abrirRestaurante}
                />
              ))}
            </View>
          )}
        </>
      ) : (
        <>
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
            <Text style={styles.verMais} onPress={() => setCategoriaAtiva('promocoes')}>
              Ver mais
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.restaurantesScroll}
          >
            {comCupom.map((restaurante) => (
              <CardRestaurante
                key={restaurante.id}
                id={restaurante.id}
                nome={restaurante.nome}
                nota={restaurante.nota}
                imagem={{ uri: restaurante.imagem }}
                onPress={abrirRestaurante}
              />
            ))}
          </ScrollView>
        </>
      )}
    </>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
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
    resultados: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 14,
    },
    restaurantesScroll: {
      gap: 14,
      paddingRight: 8,
    },
  });
