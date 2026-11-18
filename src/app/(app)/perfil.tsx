import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { useTema } from "../../theme/TemaContext";
import type { Cores } from "../../theme/temas";

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AVATAR_FALLBACK = "https://i.pravatar.cc/300?img=33";

export default function Perfil() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { cores } = useTema();
  const { usuario, atualizarUsuario } = useAuth();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  const [nome, setNome] = useState(usuario?.nome ?? "");
  const [email, setEmail] = useState(usuario?.email ?? "");
  const [telefone, setTelefone] = useState(usuario?.telefone ?? "");
  const [avatarUrl, setAvatarUrl] = useState(usuario?.avatarUrl ?? "");
  const [erroFoto, setErroFoto] = useState(false);

  const fotoExibida = !erroFoto && avatarUrl.trim().length > 0
    ? avatarUrl.trim()
    : AVATAR_FALLBACK;

  function handleSalvar() {
    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim().toLowerCase();

    if (!nomeLimpo) {
      Alert.alert("Campo obrigatório", "O nome não pode estar vazio.");
      return;
    }

    if (!emailLimpo) {
      Alert.alert("Campo obrigatório", "O e-mail não pode estar vazio.");
      return;
    }

    if (!REGEX_EMAIL.test(emailLimpo)) {
      Alert.alert("E-mail inválido", "Informe um e-mail válido.");
      return;
    }

    atualizarUsuario({
      nome: nomeLimpo,
      email: emailLimpo,
      telefone: telefone.trim() || undefined,
      avatarUrl: avatarUrl.trim() || undefined,
    }).then(() => {
      router.back();
    });
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 32 },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.centrado}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: fotoExibida }}
            style={styles.avatar}
            onError={() => setErroFoto(true)}
            onLoad={() => setErroFoto(false)}
          />
        </View>

        <View style={styles.formulario}>
          <Text style={styles.rotulo}>Nome</Text>
          <TextInput
            style={styles.campo}
            value={nome}
            onChangeText={setNome}
            placeholder="Seu nome"
            placeholderTextColor={cores.textoSecundario}
            returnKeyType="next"
            autoCapitalize="words"
          />

          <Text style={styles.rotulo}>E-mail</Text>
          <TextInput
            style={styles.campo}
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            placeholderTextColor={cores.textoSecundario}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />

          <Text style={styles.rotulo}>Telefone</Text>
          <TextInput
            style={styles.campo}
            value={telefone}
            onChangeText={setTelefone}
            placeholder="(00) 00000-0000"
            placeholderTextColor={cores.textoSecundario}
            keyboardType="phone-pad"
            returnKeyType="next"
          />

          <Text style={styles.rotulo}>URL da foto</Text>
          <TextInput
            style={styles.campo}
            value={avatarUrl}
            onChangeText={(v) => {
              setAvatarUrl(v);
              setErroFoto(false);
            }}
            placeholder="https://..."
            placeholderTextColor={cores.textoSecundario}
            keyboardType="url"
            autoCapitalize="none"
            returnKeyType="done"
          />

          <TouchableOpacity style={styles.botao} onPress={handleSalvar} activeOpacity={0.8}>
            <Text style={styles.botaoTexto}>Salvar alterações</Text>
          </TouchableOpacity>
        </View>
      </View>
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
      alignItems: "center",
    },
    centrado: {
      width: "100%",
      maxWidth: 480,
      alignSelf: "center",
    },
    avatarWrapper: {
      alignSelf: "center",
      marginBottom: 24,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: cores.superficieClara,
    },
    formulario: {
      width: "100%",
    },
    rotulo: {
      fontSize: 13,
      fontWeight: "600",
      color: cores.textoSecundario,
      marginBottom: 6,
      marginTop: 16,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    campo: {
      backgroundColor: cores.superficieClara,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 16,
      color: cores.textoPrincipal,
      borderWidth: 1,
      borderColor: cores.borda,
    },
    botao: {
      marginTop: 32,
      backgroundColor: cores.destaque,
      borderRadius: 12,
      paddingVertical: 15,
      alignItems: "center",
    },
    botaoTexto: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "700",
    },
  });
