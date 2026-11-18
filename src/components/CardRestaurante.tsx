import { View, Text, StyleSheet, ImageBackground, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


interface Props {
  id: string;
  nome: string;
  nota: number;
  imagem: ImageSourcePropType;
  onPress: (id: string) => void;
}

export default function CardRestaurante({ id, nome, nota, imagem, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => onPress(id)}
      accessibilityRole="button"
      accessibilityLabel={`Abrir ${nome}`}
    >
      <ImageBackground 
        source={imagem} 
        style={styles.imagemFundo}
        imageStyle={styles.imagemArredondada}
      >
        <View style={styles.notaContainer}>
          <Ionicons name="star" size={12} color="#E8A317" />
          <Text style={styles.notaTexto}>{nota.toFixed(1)}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 130, // Largura baseada na imagem de referência
    height: 110,
    borderRadius: 12,
  },
  imagemFundo: {
    width: '100%',
    height: '100%',
    padding: 8, // Espaçamento para a tag de nota não grudar nas bordas
  },
  imagemArredondada: {
    borderRadius: 12, // Arredonda a imagem de fundo
  },
  notaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333', // Cor escura como na referência
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start', // Faz o container da nota ocupar apenas o espaço necessário
    gap: 4,
  },
  notaTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  }
});