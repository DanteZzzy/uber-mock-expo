# Uber Mock — Expo

Aplicativo mockado do Uber, desenvolvido em React Native com Expo, como trabalho da disciplina **Laboratório de Desenvolvimento de App Híbrido**.

O objetivo do projeto não é reproduzir o backend ou a lógica real do app, e sim reconstruir a interface e a navegação entre as telas, com dados fictícios.

## 📱 Sobre o projeto

- **Framework:** React Native + Expo (Expo Router)
- **Linguagem:** TypeScript
- **Navegação:** Stack raiz + grupos `(auth)` e `(app)` + Tabs (Página inicial, Opções, Atividade, Conta)
- **Autenticação simulada:** `AuthContext` com rotas protegidas via `Redirect`
- **Tema:** claro e escuro, com a escolha salva no aparelho (AsyncStorage)
- **Dados:** mockados localmente, sem backend ou API externa

## ✨ Funcionalidades

- **Login protegido:** sem entrar, nenhuma tela do app abre (quem tenta acessar `/home` é redirecionado ao login)
- **Entrar e sair:** o login leva à Home sem permitir voltar a ele (`router.replace`), e o botão **Sair**, na tela Conta, encerra a sessão
- **Detalhe da viagem:** rota dinâmica `viagem/[id]`, aberta ao tocar em uma viagem da tela Atividade
- **Tema claro/escuro:** alternado por um botão na tela Conta, com a escolha mantida ao reabrir o app
- **Layout responsivo:** versão de celular em telas estreitas e versão com colunas em telas largas (web)

## 🖼️ Telas

### Login

![Tela de Login](./assets/screenshots/login.png)

### Página inicial (Home)

A Home tem três abas no topo: **Uber**, **Envios** e **iFood**.

![Página Inicial](./assets/screenshots/home.png)

### Opções

![Opções](./assets/screenshots/opcoes.png)

### Atividade

![Atividade](./assets/screenshots/atividade.png)

### Conta

![Conta](./assets/screenshots/perfil.png)


## 🧭 Fluxo de navegação

```
/                      → Redirect: com sessão vai para /home, sem sessão vai para /login
(auth)/login           → ao entrar: router.replace('/home')
(app)/_layout          → guarda: sem sessão, Redirect para /login
(app)/(tabs)           → home, opcoes, atividade, conta
(app)/viagem/[id]      → detalhe da viagem (abre por cima das abas)
```

> A sessão é mantida apenas em memória. Ao fechar o app ou recarregar a página no navegador, é preciso entrar novamente.

## 🚀 Como rodar o projeto

Pré-requisito: [Node.js](https://nodejs.org/) instalado.

```bash
# Clone o repositório
git clone https://github.com/DanteZzzy/uber-mock-expo.git

# Entre na pasta do projeto
cd uber-mock-expo

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npx expo start
```

Depois de rodar o `npx expo start`, escolha uma das opções:

- **Web:** pressione `w` no terminal
- **Android:** pressione `a` no terminal (requer emulador configurado) ou use o app **Expo Go** no celular
- **Celular (Expo Go):** escaneie o QR code com o app Expo Go, usando uma versão do Expo Go compatível com o SDK do projeto

### ⚠️ Rodando no celular (Expo Go) e a versão do SDK

Este projeto usa o **Expo SDK 57**. Cada versão do Expo Go suporta apenas um SDK, e a versão disponível nas lojas pode não ser compatível com ele. No **iPhone**, o Expo Go da App Store pode não abrir o projeto, e o app acusa que o projeto é incompatível e precisa ser atualizado.

Alternativa para testar no celular, sem o Expo Go:

1. Com o `npx expo start` rodando no computador, descubra o endereço IPv4 da máquina (no Windows, `ipconfig`).
2. No navegador do celular, **conectado à mesma rede Wi-Fi**, abra `http://SEU-IP:8081`.
3. Se não abrir, libere o Node.js no firewall do Windows para redes privadas.

## 📂 Estrutura do projeto

```
src/
  context/
    AuthContext.tsx        # Sessão do usuário (entrar / sair)
  app/
    _layout.tsx            # Stack raiz (TemaProvider + AuthProvider)
    index.tsx              # Decide: Home (com sessão) ou Login (sem sessão)
    (auth)/
      _layout.tsx
      login.tsx            # Tela de Login
    (app)/
      _layout.tsx          # Guarda: Redirect para o login + Stack
      (tabs)/
        _layout.tsx        # Barra de abas inferior
        home.tsx
        opcoes.tsx
        atividade.tsx
        conta.tsx
      viagem/
        [id].tsx           # Detalhe da viagem (rota dinâmica)
  components/              # Componentes reutilizáveis
  data/                    # Dados mockados
  theme/
    cores.ts               # Paleta do tema escuro
    temas.ts               # Paletas clara e escura
    TemaContext.tsx        # Tema ativo, alternância e persistência
```

## 👥 Autores

- Gabriel Teixeira de Faria
- Igor de Oliveira Barata

## 📚 Disciplina

Laboratório de Desenvolvimento de App Híbrido — Universidade de Vassouras