import { Image, StyleSheet, Text, View } from 'react-native';
import { cores } from '../theme/cores';

type CabecalhoContaProps = {
  nome: string;
  avatarUrl: string;
};

export default function CabecalhoConta({ nome, avatarUrl }: CabecalhoContaProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.nome} numberOfLines={2}>
        {nome}
      </Text>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nome: {
    flex: 1,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 33,
    marginRight: 12,
    letterSpacing: -0.5,
    color: cores.textoPrincipal,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: cores.superficieClara,
  },
});