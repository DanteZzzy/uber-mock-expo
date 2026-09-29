# Uber Mock — Expo

Aplicativo mockado do Uber, desenvolvido em React Native com Expo, como trabalho da disciplina **Laboratório de Desenvolvimento de App Híbrido**.

O objetivo do projeto não é reproduzir o backend ou a lógica real do app, e sim reconstruir a interface e a navegação entre as telas, com dados fictícios.

## 📱 Sobre o projeto

- **Framework:** React Native + Expo (Expo Router)
- **Linguagem:** TypeScript
- **Navegação:** Stack (Login) + Tabs (Página inicial, Opções, Atividade, Conta)
- **Dados:** mockados localmente, sem backend ou API externa

## 🖼️ Telas

### Login

![Tela de Login](./assets/screenshots/login.png)

### Página inicial (Home)

![Página Inicial](./assets/screenshots/home.png)

### Opções

![Opções](./assets/screenshots/opcoes.png)

### Atividade

![Atividade](./assets/screenshots/atividade.png)

### Conta

![Conta](./assets/screenshots/perfil.png)

## 🚀 Como rodar o projeto

Pré-requisitos: [Node.js](https://nodejs.org/) instalado e o app **Expo Go** no celular (opcional, para testar em um dispositivo físico).

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

- **Celular:** escaneie o QR code com o app Expo Go
- **Android:** pressione `a` no terminal (requer emulador configurado)
- **Web:** pressione `w` no terminal

## 📂 Estrutura do projeto

```
src/
  app/
    _layout.tsx        # Stack raiz
    index.tsx           # Tela de Login
    (tabs)/
      _layout.tsx       # Barra de abas inferior
      home.tsx
      opcoes.tsx
      atividade.tsx
      conta.tsx
  components/            # Componentes reutilizáveis
  data/                  # Dados mockados
  theme/                 # Paleta de cores
```

## 👥 Autores

- Gabriel Teixeira de Faria
- Igor de Oliveira Barata

## 📚 Disciplina

Laboratório de Desenvolvimento de App Híbrido — Universidade de Vassouras