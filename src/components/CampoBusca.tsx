import React, { useMemo } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../theme/TemaContext';
import type { Cores } from '../theme/temas';

type CampoBuscaProps = {
  placeholder: string;
  valor?: string;
  onChangeText?: (texto: string) => void;
};

export default function CampoBusca({ placeholder, valor = '', onChangeText }: CampoBuscaProps) {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <View style={styles.busca}>
      <Ionicons name="search" size={18} color={cores.textoSecundario} />
      {onChangeText ? (
        <>
          <TextInput
            style={styles.entrada}
            value={valor}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={cores.textoSecundario}
            returnKeyType="search"
            autoCorrect={false}
          />
          {valor !== '' && (
            <Pressable
              onPress={() => onChangeText('')}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Limpar busca"
            >
              <Ionicons name="close-circle" size={18} color={cores.textoSecundario} />
            </Pressable>
          )}
        </>
      ) : (
        <Text style={styles.placeholder}>{placeholder}</Text>
      )}
    </View>
  );
}

const criarEstilos = (cores: Cores) =>
  StyleSheet.create({
    busca: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      backgroundColor: cores.superficieClara,
      borderRadius: 24,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderWidth: 1,
      borderColor: cores.borda,
      marginTop: 16,
    },
    placeholder: {
      color: cores.textoSecundario,
      fontSize: 15,
      fontWeight: '600',
    },
    entrada: {
      flex: 1,
      color: cores.textoPrincipal,
      fontSize: 15,
      fontWeight: '600',
      padding: 0,
    },
  });
