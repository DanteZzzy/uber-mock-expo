import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useAuth } from "../../context/AuthContext";
import {
  CHAVE_ENDERECOS,
  ENDERECOS_PADRAO,
  formatarEnderecoCompleto,
} from "../../data/enderecos";
import { useArmazenamento } from "../../hooks/useArmazenamento";
import type { ResultadoFetch } from "../../hooks/useFetch";
import { useTema } from "../../theme/TemaContext";
import type { Cores } from "../../theme/temas";
import type { EnderecoUsuario, Usuario } from "../../types";
import AtalhoCircular from "../AtalhoCircular";
import BarraBusca from "../BarraBusca";
import CardBanner from "../CardBanner";
import EnderecoSalvo from "../EnderecoSalvo";
import SecaoMotoristas from "../SecaoMotoristas";

type Props = {
  motoristas: ResultadoFetch<Usuario[]>;
  onMudarAba?: (aba: "uber" | "envios" | "ifood") => void;
};

const ATALHOS = [
  { id: "viagem", label: "Viagem", icon: "car-sport-outline", badge: "15%" },
  { id: "reserve", label: "Reserve", icon: "calendar-outline", badge: "Promo" },
  { id: "moto", label: "Moto", icon: "moped", iconLib: "material-community" as const },
  { id: "ifood", label: "iFood", icon: "fast-food-outline", badge: "Novo" },
];

const LIMITE_ENDERECOS_NA_HOME = 3;

function montarSubtitulo(endereco: EnderecoUsuario): string {
  const local = endereco.bairro
    ? `${endereco.bairro}, ${endereco.cidade}`
    : endereco.cidade;
  return `${endereco.rotulo} • ${local} - ${endereco.uf}`;
}

export default function ConteudoUber({ motoristas, onMudarAba }: Props) {
  const router = useRouter();
  const { cores } = useTema();
  const { usuario } = useAuth();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const [enderecos, , carregado, , recarregarEnderecos] = useArmazenamento<
    EnderecoUsuario[]
  >(CHAVE_ENDERECOS, ENDERECOS_PADRAO);

  // A Home continua montada ao abrir "enderecos": relê o disco ao voltar o foco
  useFocusEffect(
    useCallback(() => {
      recarregarEnderecos();
    }, [recarregarEnderecos]),
  );

  const enderecosVisiveis = carregado
    ? enderecos.slice(0, LIMITE_ENDERECOS_NA_HOME)
    : [];

  function aoTocarAtalho(id: string) {
    if (id === "viagem") {
      router.push({
        pathname: "/pedir-viagem",
        params: { categoria: "uber" },
      });
    } else if (id === "moto") {
      router.push({
        pathname: "/pedir-viagem",
        params: { categoria: "moto" },
      });
    } else if (id === "reserve") {
      router.push({
        pathname: "/pedir-viagem",
        params: { categoria: "comfort" },
      });
    } else if (id === "ifood") {
      if (onMudarAba) {
        onMudarAba("ifood");
      }
    }
  }

  function aoTocarEndereco(endereco: EnderecoUsuario) {
    router.push({
      pathname: "/pedir-viagem",
      params: { destino: formatarEnderecoCompleto(endereco) },
    });
  }

  return (
    <>
      <BarraBusca
        nomeUsuario={usuario?.nome ?? "Usuário"}
        onPress={() => router.push("/pedir-viagem")}
        onPressAgendar={() =>
          router.push({
            pathname: "/pedir-viagem",
            params: { categoria: "comfort" },
          })
        }
      />

      <View style={styles.cardEnderecos}>
        {enderecosVisiveis.map((endereco) => (
          <React.Fragment key={endereco.id}>
            <EnderecoSalvo
              titulo={`${endereco.rua}, ${endereco.numero}`}
              subtitulo={montarSubtitulo(endereco)}
              onPress={() => aoTocarEndereco(endereco)}
            />
            <View style={styles.divisor} />
          </React.Fragment>
        ))}

        <TouchableOpacity
          style={styles.linhaGerenciar}
          activeOpacity={0.7}
          onPress={() => router.push("/enderecos")}
        >
          <Ionicons
            name="location-outline"
            size={18}
            color={cores.textoPrincipal}
          />
          <Text style={styles.textoGerenciar}>
            {carregado && enderecos.length === 0
              ? "Adicionar um endereço"
              : "Gerenciar endereços"}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={cores.textoSecundario}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.secaoHeader}>
        <Text style={styles.secaoTitulo}>Para você</Text>
        <TouchableOpacity
          style={styles.setaCircular}
          activeOpacity={0.7}
          onPress={() => router.push("/opcoes")}
        >
          <Ionicons
            name="arrow-forward"
            size={16}
            color={cores.textoPrincipal}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.carrossel}>
        {ATALHOS.map((atalho) => (
          <AtalhoCircular
            key={atalho.id}
            label={atalho.label}
            icon={atalho.icon}
            iconLib={atalho.iconLib}
            badge={atalho.badge}
            onPress={() => aoTocarAtalho(atalho.id)}
          />
        ))}
      </View>

      <SecaoMotoristas motoristas={motoristas} />

      <CardBanner
        titulo="Ganhe 10% off em 10 viagens, até R$ 15 por viagem!"
        textoBotao="Ver mais informações"
        onPress={() =>
          Alert.alert(
            "Promoção Ativa!",
            "Desconto de 10% aplicado automaticamente nas suas próximas viagens.",
            [
              {
                text: "Pedir viagem agora",
                onPress: () => router.push("/pedir-viagem"),
              },
              { text: "OK" },
            ],
          )
        }
      />
    </>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
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
    linhaGerenciar: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      gap: 12,
    },
    textoGerenciar: {
      flex: 1,
      color: cores.textoPrincipal,
      fontSize: 15,
      fontWeight: "700",
    },
    secaoHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 24,
    },
    secaoTitulo: {
      color: cores.textoPrincipal,
      fontSize: 20,
      fontWeight: "800",
    },
    setaCircular: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: cores.superficieClara,
      alignItems: "center",
      justifyContent: "center",
    },
    carrossel: {
      flexDirection: "row",
      gap: 16,
      paddingTop: 16,
    },
  });