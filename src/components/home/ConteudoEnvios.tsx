import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { cores } from '../../theme/cores';
import CampoBusca from '../CampoBusca';
import LinhaAcaoQuadrada from '../LinhaAcaoQuadrada';
import PillBotao from '../PillBotao';

const TAREFAS_RAPIDAS = [
  { icon: 'document-text-outline', label: 'Enviar documentos' },
  { icon: 'help-circle-outline', label: 'Esqueceu um item?' },
  { icon: 'storefront-outline', label: 'Equipamentos para retirada de pedidos' },
  { icon: 'cube-outline', label: 'Receber suprimentos' },
  { icon: 'gift-outline', label: 'Envie um presente' },
] as const;

export default function ConteudoEnvios() {
  return (
    <>
      <CampoBusca placeholder="Entregar neste endereço?" />

      <View style={styles.secaoSobDemanda}>
        <View style={styles.textoSobDemanda}>
          <Text style={styles.tituloSobDemanda}>Entrega sob demanda</Text>
          <Text style={styles.subtituloSobDemanda}>
            Entregadores parceiros rápidos e acessíveis
          </Text>
        </View>
        <View style={styles.iconeSobDemanda}>
          <Ionicons name="bicycle" size={28} color={cores.textoPrincipal} />
        </View>
      </View>

      <View style={styles.card}>
        <LinhaAcaoQuadrada icon="arrow-redo-outline" titulo="Enviar" />
        <View style={styles.divisor} />
        <LinhaAcaoQuadrada icon="arrow-undo-outline" titulo="Receber" />
      </View>

      <Text style={styles.secaoTitulo}>Economize uma viagem</Text>
      <View style={styles.card}>
        <LinhaAcaoQuadrada icon="storefront-outline" titulo="Retiradas na loja" />
      </View>

      <Text style={styles.secaoTitulo}>Suas tarefas são concluídas rapidamente</Text>
      <View style={styles.pillsWrap}>
        {TAREFAS_RAPIDAS.map((tarefa) => (
          <PillBotao key={tarefa.label} icon={tarefa.icon} label={tarefa.label} />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  secaoSobDemanda: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  textoSobDemanda: {
    flex: 1,
    marginRight: 12,
  },
  tituloSobDemanda: {
    color: cores.textoPrincipal,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtituloSobDemanda: {
    color: cores.textoSecundario,
    fontSize: 14,
  },
  iconeSobDemanda: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: cores.superficieClara,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
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
  secaoTitulo: {
    color: cores.textoPrincipal,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 24,
    marginBottom: 12,
  },
  pillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});