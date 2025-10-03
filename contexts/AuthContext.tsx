import { User as FirebaseUser, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";

// A sua definição de UserProfile já está correta, incluindo o 'uid'.
export type UserProfile = {
  uid: string;
  nome: string;
  tipo: "student" | "driver";
  cpf?: string;
  telefone?: string;
  faculdade?: string; // Trocado 'faculdade' para ser consistente com o código do Profile
  periodo?: string;
  turno?: string;
  diasSemana?: string;
  cnh?: string;
  statusTag?: "Em aula" | "Aguardando" | "No ônibus"; // Corrigido para os nomes exatos
  email?: string;
  onibusAtual?: string;
};

type AuthContextType = {
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        const docRef = doc(db, "usuarios", fbUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // --- AQUI ESTÁ A ÚNICA MUDANÇA ---
          // Em vez de apenas pegar os dados de DENTRO do documento...
          // setUser(docSnap.data() as UserProfile);

          // ...nós criamos um novo objeto que combina o ID DO DOCUMENTO (`docSnap.id`, que é o UID)
          // com os dados de dentro dele (`docSnap.data()`).
          setUser({ uid: docSnap.id, ...docSnap.data() } as UserProfile);

        } else {
          console.error("Usuário sem perfil no Firestore. UID:", fbUser.uid);
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

