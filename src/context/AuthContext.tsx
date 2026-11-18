import { createContext, ReactNode, useContext, useMemo } from "react";

import { useArmazenamento } from "../hooks/useArmazenamento";
import type { UsuarioCadastrado, UsuarioSessao } from "../types";

export type DadosCadastro = {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
};

type AuthContextoTipo = {
  usuario: UsuarioSessao | null;
  carregado: boolean;
  entrar: (usuarioOuNome: UsuarioSessao | string) => Promise<void>;
  cadastrar: (dados: DadosCadastro) => Promise<UsuarioSessao>;
  loginComCredenciais: (email: string, senha: string) => Promise<UsuarioSessao>;
  sair: () => Promise<void>;
  atualizarUsuario: (dados: Partial<UsuarioSessao>) => Promise<void>;
};

const CHAVE_SESSAO = "@uber_sessao_usuario";
const CHAVE_USUARIOS = "@uber_usuarios_cadastrados";

const AuthContext = createContext<AuthContextoTipo | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario, sessaoCarregada, removerSessao] =
    useArmazenamento<UsuarioSessao | null>(CHAVE_SESSAO, null);

  const [usuariosCadastrados, setUsuariosCadastrados, usuariosCarregados] =
    useArmazenamento<UsuarioCadastrado[]>(CHAVE_USUARIOS, []);

  const carregado = sessaoCarregada && usuariosCarregados;

  const cadastrar = async (dados: DadosCadastro): Promise<UsuarioSessao> => {
    const nomeLimpo = dados.nome.trim();
    const emailNormalizado = dados.email.trim().toLowerCase();
    const senha = dados.senha;

    if (!nomeLimpo || !emailNormalizado || !senha) {
      throw new Error("Preencha todos os campos obrigatórios.");
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(emailNormalizado)) {
      throw new Error("Informe um e-mail válido.");
    }

    if (senha.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres.");
    }

    const jaExiste = usuariosCadastrados.some(
      (u) => u.email.toLowerCase() === emailNormalizado,
    );
    if (jaExiste) {
      throw new Error("Este e-mail já está cadastrado.");
    }

    const novoId = `usr_${Date.now()}`;
    const novoUsuarioCompleto: UsuarioCadastrado = {
      id: novoId,
      nome: nomeLimpo,
      email: emailNormalizado,
      senha: senha,
      telefone: dados.telefone?.trim(),
      avatarUrl: "https://i.pravatar.cc/300?img=33",
    };

    // Salva na lista de cadastrados com a senha
    await setUsuariosCadastrados((anteriores) => [
      ...anteriores,
      novoUsuarioCompleto,
    ]);

    // Cria a sessão ativa NUNCA armazenando a senha
    const sessao: UsuarioSessao = {
      id: novoId,
      nome: nomeLimpo,
      email: emailNormalizado,
      telefone: dados.telefone?.trim(),
      avatarUrl: novoUsuarioCompleto.avatarUrl,
    };

    await setUsuario(sessao);
    return sessao;
  };

  const loginComCredenciais = async (
    email: string,
    senha: string,
  ): Promise<UsuarioSessao> => {
    const emailNormalizado = email.trim().toLowerCase();

    if (!emailNormalizado || !senha) {
      throw new Error("Preencha o e-mail e a senha.");
    }

    const usuarioEncontrado = usuariosCadastrados.find(
      (u) => u.email.toLowerCase() === emailNormalizado,
    );

    if (!usuarioEncontrado) {
      throw new Error("E-mail não cadastrado.");
    }

    if (usuarioEncontrado.senha !== senha) {
      throw new Error("Senha incorreta.");
    }

    // Sessão NUNCA guarda senha
    const sessao: UsuarioSessao = {
      id: usuarioEncontrado.id,
      nome: usuarioEncontrado.nome,
      email: usuarioEncontrado.email,
      telefone: usuarioEncontrado.telefone,
      avatarUrl: usuarioEncontrado.avatarUrl,
    };

    await setUsuario(sessao);
    return sessao;
  };

  const entrar = async (usuarioOuNome: UsuarioSessao | string) => {
    if (typeof usuarioOuNome === "string") {
      const texto = usuarioOuNome.trim();
      const ehEmail = texto.includes("@");
      const nomePadrao = ehEmail ? texto.split("@")[0] : texto;
      const emailNormalizado = ehEmail
        ? texto.toLowerCase()
        : `${texto.toLowerCase().replace(/\s+/g, "")}@exemplo.com`;

      const novoUsuario: UsuarioSessao = {
        nome: nomePadrao.charAt(0).toUpperCase() + nomePadrao.slice(1),
        email: emailNormalizado,
      };
      await setUsuario(novoUsuario);
    } else {
      await setUsuario(usuarioOuNome);
    }
  };

  const sair = async () => {
    await removerSessao();
  };

  const atualizarUsuario = async (dados: Partial<UsuarioSessao>) => {
    await setUsuario((antigo) => (antigo ? { ...antigo, ...dados } : null));
  };

  const valorContexto = useMemo(
    () => ({
      usuario,
      carregado,
      entrar,
      cadastrar,
      loginComCredenciais,
      sair,
      atualizarUsuario,
    }),
    [usuario, carregado, cadastrar, loginComCredenciais],
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
