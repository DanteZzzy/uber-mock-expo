import { createContext, ReactNode, useContext, useMemo } from "react";

import { useArmazenamento } from "../hooks/useArmazenamento";
import type { UsuarioSessao } from "../types";

type AuthContextoTipo = {
  usuario: UsuarioSessao | null;
  carregado: boolean;
  entrar: (usuarioOuNome: UsuarioSessao | string) => Promise<void>;
  sair: () => Promise<void>;
  atualizarUsuario: (dados: Partial<UsuarioSessao>) => Promise<void>;
};

const CHAVE_SESSAO = "@uber_sessao_usuario";

const AuthContext = createContext<AuthContextoTipo | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario, carregado, removerUsuario] =
    useArmazenamento<UsuarioSessao | null>(CHAVE_SESSAO, null);

  const entrar = async (usuarioOuNome: UsuarioSessao | string) => {
    if (typeof usuarioOuNome === "string") {
      const texto = usuarioOuNome.trim();
      const ehEmail = texto.includes("@");
      const nomePadrao = ehEmail ? texto.split("@")[0] : texto;

      const novoUsuario: UsuarioSessao = {
        nome: nomePadrao.charAt(0).toUpperCase() + nomePadrao.slice(1),
        email: ehEmail
          ? texto
          : `${texto.toLowerCase().replace(/\s+/g, "")}@exemplo.com`,
      };
      await setUsuario(novoUsuario);
    } else {
      await setUsuario(usuarioOuNome);
    }
  };

  const sair = async () => {
    await removerUsuario();
  };

  const atualizarUsuario = async (dados: Partial<UsuarioSessao>) => {
    await setUsuario((antigo) => (antigo ? { ...antigo, ...dados } : null));
  };

  const valorContexto = useMemo(
    () => ({
      usuario,
      carregado,
      entrar,
      sair,
      atualizarUsuario,
    }),
    [usuario, carregado],
  );

  return (
    <AuthContext.Provider value={valorContexto}>
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
