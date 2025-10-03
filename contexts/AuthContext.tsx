import { User as FirebaseUser, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";

// Dentro de contexts/AuthContext.tsx

export type UserProfile = {
  nome: string;
  tipo: "student" | "driver";
  // Adicionamos os novos campos aqui como opcionais
  cpf?: string;
  telefone?: string;
  faculdade?: string;
  periodo?: string;
  turno?: string;
  diasSemana?: string;
  // Adicione aqui os campos do motorista também, se necessário
  cnh?: string;
  statusTag?: "Em Aula" | "Aguardando Ônibus" | "No Ônibus";
  email?: string;
  onibusAtual?: string;
};

// --- 1. ATUALIZAMOS O CONTRATO ---
// Adicionamos 'firebaseUser' de volta ao tipo. Ele pode ser 'null' se ninguém estiver logado.
type AuthContextType = {
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null; // <-- A ADIÇÃO ESTÁ AQUI
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // --- 2. ADICIONAMOS O ESTADO PARA O FIREBASEUSER ---
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser); // Atualizamos o estado do firebaseUser aqui
      if (fbUser) {
        const docRef = doc(db, "usuarios", fbUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data() as UserProfile);
        } else {
          console.error("Utilizador sem perfil no Firestore. UID:", fbUser.uid);
          await signOut(auth);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const logout = async () => {
    await signOut(auth);
  };

  // --- 3. FORNECEMOS O 'FIREBASEUSER' NO VALOR DO CONTEXTO ---
  return (
    <AuthContext.Provider value={{ user, firebaseUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

