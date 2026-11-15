import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextoTipo = {
  usuario: string | null;
  entrar: (nome: string) => void;
  sair: () => void;
};

const AuthContext = createContext<AuthContextoTipo | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<string | null>(null);

  const entrar = (nome: string) => setUsuario(nome);
  const sair = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuth precisa ser usado dentro do AuthProvider");
  }
  return contexto;
}