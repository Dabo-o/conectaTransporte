import { ActivityIndicator, View } from 'react-native';

// Este componente é o ponto de entrada principal da aplicação.
// A lógica em `app/_layout.tsx` e `contexts/AuthContext.tsx`
// irá redirecionar o utilizador para a tela correta (login ou home)
// quase que instantaneamente.
//
// Nós renderizamos um indicador de carregamento ou nada para evitar
// um flash de conteúdo antes do redirecionamento.

export default function StartPage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

