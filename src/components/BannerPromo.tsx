import { TouchableOpacity, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface Props {
  imagem: ImageSourcePropType;
}

export default function CardQuadradoPromo({ imagem }: Props) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Image 
        source={imagem} 
        style={styles.imagem} 
        resizeMode="cover" // Faz a imagem preencher todo o card
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,  // Ajuste a largura conforme necessário
    height: 230, // Ajuste a altura conforme necessário
    borderRadius: 12,
    overflow: 'hidden', // Arredonda as pontas da imagem também
  },
  imagem: {
    width: '100%',
    height: '100%',
  }
});