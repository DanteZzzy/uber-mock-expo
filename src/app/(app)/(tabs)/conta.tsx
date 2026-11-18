import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BotaoAcaoRapida from "../../../components/BotaoAcaoRapida";
import { BotaoSair } from '../../../components/BotaoSair';
import CabecalhoConta from "../../../components/CabecalhoConta";
import CardPromocional from "../../../components/CardPromocional";
import LinhaPerfil from "../../../components/LinhaPerfil";
import StatusBadges from "../../../components/StatusBadges";
import { useAuth } from "../../../context/AuthContext";
import { useTema } from "../../../theme/TemaContext";
import type { Cores } from "../../../theme/temas";

const AVALIACAO_PADRAO = 4.96;
const AVATAR_PADRAO = "https://i.pravatar.cc/300?img=33";

const ACOES_RAPIDAS = [
  { icon: "help-buoy-outline", label: "Ajuda" },
  { icon: "wallet-outline", label: "Carteira" },
  { icon: "shield-checkmark-outline", label: "Segurança" },
  { icon: "mail-outline", label: "Mensagens" },
] as const;

export default function Conta() {
  const insets = useSafeAreaInsets();
  const { cores } = useTema();
  const { usuario } = useAuth();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const nomeExibicao = usuario?.nome || "Usuário";
  const avatarUrlExibicao = usuario?.avatarUrl || AVATAR_PADRAO;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}
    >
      <CabecalhoConta
        nome={nomeExibicao}
        avatarUrl={avatarUrlExibicao}
      />
      <StatusBadges
        avaliacao={AVALIACAO_PADRAO}
        verificado={false}
      />
      <LinhaPerfil label="Perfil Pessoal" />

      <View style={styles.grid}>
        {ACOES_RAPIDAS.map((acao) => (
          <BotaoAcaoRapida
            key={acao.label}
            icon={acao.icon}
            label={acao.label}
          />
        ))}
      </View>

      <CardPromocional
        titulo="Travel Pass"
        descricao="Economia na partida no aeroporto e muito mais ao viajar"
        rightSlot={
          <Ionicons name="pricetag" size={28} color={cores.textoPrincipal} />
        }
      />
      <CardPromocional
        titulo="Pacote Moto Flex"
        descricao="Economize 20% nas viagens do Uber Moto"
        rightSlot={
          <MaterialCommunityIcons
            name="moped"
            size={28}
            color={cores.textoPrincipal}
          />
        }
      />
      <CardPromocional
        titulo="Economize nas suas viagens"
        descricao="Evite picos de preço. Experimente grátis o preço fixo."
        rightSlot={
          <Ionicons name="map" size={28} color={cores.textoPrincipal} />
        }
      />
      <BotaoSair />
    </ScrollView>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    content: {
      paddingHorizontal: 20,
      paddingBottom: 110, // espaço extra pra não colidir com a navbar flutuante
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: 12,
      marginTop: 12,
    },
  });
