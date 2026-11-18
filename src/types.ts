export type Endereco = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
};

export type Empresa = {
  name: string;
  catchPhrase: string;
};

export type Usuario = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Endereco;
  company: Empresa;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type NovoPost = {
  title: string;
  body: string;
  userId: number;
};

export type UsuarioSessao = {
  id?: string;
  nome: string;
  email: string;
  telefone?: string;
  avatarUrl?: string;
};

export type UsuarioCadastrado = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  avatarUrl?: string;
};

export type CategoriaOpcaoViagem = {
  id: "uber" | "moto" | "comfort";
  nome: string;
  descricao: string;
  tempoMin: number;
  fatorPreco: number;
  emoji: string;
};

export type MotoristaViagem = {
  id: number;
  nome: string;
  telefone?: string;
  veiculo: string;
  placa: string;
  avaliacao: number;
};

export type ViagemSalva = {
  id: string;
  origem: string;
  destino: string;
  categoria: string;
  valor: string;
  data: string;
  detalhe?: string;
  status: "concluida" | "cancelada" | "em_andamento";
  motorista?: MotoristaViagem;
  postId?: number;
};

export type RespostaViaCep = {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean | string;
};

export type EnderecoUsuario = {
  id: string;
  rotulo: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
};
