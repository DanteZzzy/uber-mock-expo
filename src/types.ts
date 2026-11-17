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