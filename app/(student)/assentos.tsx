import { BusPlan } from '@/components/BusPlan';
import { Menu } from "@/components/Menu";
import { router } from 'expo-router';
import React from 'react';
// 1. Importamos o SafeAreaView, a ferramenta correta para este problema.
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SeatTestScreen() {
  return (  
    // 2. Usamos SafeAreaView como o container principal. Ele vai automaticamente
    // evitar a barra de status no topo.
    <SafeAreaView style={styles.container}>

      {/* 3. Criamos uma View para o topo que contém apenas o botão. */}
      <View style={styles.topContainer}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/scan")}
            activeOpacity={0.7}
        >
            <Text style={styles.text}>
                Consultar informações
            </Text>
        </TouchableOpacity>
      </View>
      
      {/* 4. A View de conteúdo principal agora só precisa de se preocupar
             em centralizar o autocarro. */}
      <View style={styles.content}>
        <BusPlan />
      </View> 
      
      {/* 5. O Menu fica por último, como um elemento separado. */}
      <Menu />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between' já não é necessário aqui,
    // pois a estrutura de Views já faz a separação.
    backgroundColor: '#fff',
  },
  topContainer: {
    // Este container serve para posicionar o botão no topo.
    alignItems: 'center',
    paddingVertical: 25, // Um pequeno espaçamento
  },
  content: {
    flex: 1, // Ocupa todo o espaço do meio
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: "center",
    backgroundColor: '#34C759',
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: '#fff',
  },
});

