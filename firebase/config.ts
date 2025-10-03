// Importe as funções necessárias do SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
    
// A configuração do seu projeto Firebase que você pega no console do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBPhONDWQq5l3czmQ2aee7Ro5kPErdwfAw",
  authDomain: "conectatransporteteste-1ccf0.firebaseapp.com",
  projectId: "conectatransporteteste-1ccf0",
  storageBucket: "conectatransporteteste-1ccf0.firebasestorage.app",
  messagingSenderId: "781754347665",
  appId: "1:781754347665:web:25a8adcc2979fb19108f30"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Cria as instâncias dos serviços
const db = getFirestore(app);
const auth = getAuth(app);

// **A LINHA QUE FALTAVA**
// Exporta as instâncias para que outros arquivos possam usá-las
export { auth, db };

