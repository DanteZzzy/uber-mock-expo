import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTema } from "../../theme/TemaContext";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type ItemFaq = {
  id: string;
  pergunta: string;
  resposta: string;
};

const FAQS: ItemFaq[] = [
  {
    id: "1",
    pergunta: "Como faço para pedir uma viagem?",
    resposta:
      "Na tela inicial, toque em \"Pedir viagem\". Informe o endereço de destino no campo de busca, confirme o ponto de partida, escolha o tipo de serviço e toque em \"Confirmar\". Um motorista próximo será localizado automaticamente.",
  },
  {
    id: "2",
    pergunta: "Como posso cancelar minha viagem?",
    resposta:
      "Durante o aguardo ou o trajeto, acesse a tela de acompanhamento e toque em \"Cancelar viagem\". Atenção: cancelamentos após a chegada do motorista podem gerar uma pequena taxa de cancelamento.",
  },
  {
    id: "3",
    pergunta: "Meu pagamento foi cobrado em duplicidade, o que faço?",
    resposta:
      "Entre em contato com o suporte pelo menu \"Ajuda\" → \"Problemas com pagamento\". Informe o número da viagem e o comprovante do débito duplicado. Nossa equipe analisa e estorna o valor em até 5 dias úteis.",
  },
  {
    id: "4",
    pergunta: "Como avaliar um motorista?",
    resposta:
      "Ao término da viagem, uma tela de avaliação é exibida automaticamente. Atribua de 1 a 5 estrelas e, se desejar, deixe um comentário. Você também pode acessar suas viagens recentes no histórico e avaliar a partir daí.",
  },
  {
    id: "5",
    pergunta: "O motorista não chegou, o que fazer?",
    resposta:
      "Verifique na tela de acompanhamento se o motorista ainda está a caminho. Se o tempo de espera for excessivo, tente entrar em contato pelo chat integrado. Caso o motorista não apareça, cancele sem custo e refaça o pedido.",
  },
  {
    id: "6",
    pergunta: "Como adicionar um cartão de pagamento?",
    resposta:
      "Acesse a aba \"Conta\" e toque em \"Carteira\". Na tela Carteira, toque em \"Adicionar cartão\", preencha os dados do cartão e confirme. O cartão ficará disponível para pagamento nas próximas viagens.",
  },
  {
    id: "7",
    pergunta: "Como alterar meus dados de perfil?",
    resposta:
      "Acesse a aba \"Conta\" e toque em \"Perfil Pessoal\". Na tela Perfil, edite seu nome, e-mail, telefone ou foto de perfil e toque em \"Salvar alterações\".",
  },
  {
    id: "8",
    pergunta: "O app não conecta, o que fazer?",
    resposta:
      "Verifique se o modo avião está desativado e se você está conectado ao Wi-Fi ou aos dados móveis. Feche o aplicativo completamente e abra-o novamente. Se o problema persistir, reinicie o aparelho ou reinstale o app.",
  },
];

type PropsItemAcordeon = {
  item: ItemFaq;
  aberto: boolean;
  aoTocar: () => void;
};

function ItemAcordeon({ item, aberto, aoTocar }: PropsItemAcordeon) {
  const { cores } = useTema();
  const rotacao = useRef(new Animated.Value(aberto ? 1 : 0)).current;

  function alternarRotacao(novoEstado: boolean) {
    Animated.timing(rotacao, {
      toValue: novoEstado ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  function handlePress() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    alternarRotacao(!aberto);
    aoTocar();
  }

  const rotacaoInterpolada = rotacao.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={[estilos.itemContainer, { borderBottomColor: cores.borda }]}>
      <TouchableOpacity
        style={estilos.cabecalho}
        onPress={handlePress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityState={{ expanded: aberto }}
      >
        <Text
          style={[estilos.pergunta, { color: cores.textoPrincipal }]}
          numberOfLines={aberto ? undefined : 2}
        >
          {item.pergunta}
        </Text>
        <Animated.View style={{ transform: [{ rotate: rotacaoInterpolada }] }}>
          <Ionicons
            name="chevron-down"
            size={20}
            color={cores.textoSecundario}
          />
        </Animated.View>
      </TouchableOpacity>

      {aberto && (
        <Text style={[estilos.resposta, { color: cores.textoSecundario }]}>
          {item.resposta}
        </Text>
      )}
    </View>
  );
}

export default function TelaAjuda() {
  const { cores } = useTema();
  const insets = useSafeAreaInsets();
  const [abertos, setAbertos] = useState<Record<string, boolean>>({});

  function alternarItem(id: string) {
    setAbertos((anterior) => ({ ...anterior, [id]: !anterior[id] }));
  }

  return (
    <ScrollView
      style={[estilos.scroll, { backgroundColor: cores.fundo }]}
      contentContainerStyle={[
        estilos.conteudo,
        { paddingBottom: insets.bottom + 24 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={estilos.centralizador}>
        <Text style={[estilos.titulo, { color: cores.textoPrincipal }]}>
          Perguntas frequentes
        </Text>

        <View
          style={[
            estilos.card,
            { backgroundColor: cores.superficie, borderColor: cores.borda },
          ]}
        >
          {FAQS.map((item) => (
            <ItemAcordeon
              key={item.id}
              item={item}
              aberto={!!abertos[item.id]}
              aoTocar={() => alternarItem(item.id)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  conteudo: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  centralizador: {
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  itemContainer: {
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  pergunta: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
  },
  resposta: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
  },
});
