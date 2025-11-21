# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

📱 Documentação Técnica - Front-end Mobile
Este documento descreve a estrutura, tecnologias e ferramentas utilizadas no desenvolvimento da interface móvel do projeto. O aplicativo foi construído focado em dispositivos móveis (Android/iOS), utilizando React Native com o framework Expo.

🛠️ Stack Tecnológico Principal
Framework: React Native (v0.76+)

Plataforma de Desenvolvimento: Expo (SDK 52)

Linguagem: TypeScript (TSX)

Gerenciador de Pacotes: NPM

📦 Bibliotecas e Ferramentas Instaladas
Abaixo estão as ferramentas adicionais que foram instaladas via terminal para funcionalidades específicas do aplicativo:

1. Comunicação com API (Back-end)
Biblioteca: axios

Comando de Instalação: npm install axios

Função: Responsável por fazer as requisições HTTP (GET, POST) para o servidor Python. É utilizado para enviar os dados de cadastro (/usuarios/) e receber respostas do servidor.

2. Armazenamento Local
Biblioteca: @react-native-async-storage/async-storage

Comando de Instalação: npx expo install @react-native-async-storage/async-storage

Função: Permite salvar dados no dispositivo do usuário de forma persistente. Utilizado para armazenar o Token de Acesso após o cadastro/login, mantendo o usuário logado mesmo se fechar o app.

3. Gráficos e Visualização de Dados
Bibliotecas: react-native-chart-kit e react-native-svg

Comando de Instalação: npm install react-native-chart-kit react-native-svg

Função:

react-native-svg: Permite renderizar vetores e formas geométricas (base para os gráficos).

react-native-chart-kit: Cria os gráficos de linha interativos utilizados no Dashboard para exibir dados de Produtividade e Umidade.

4. Navegação
Biblioteca: expo-router

Função: Gerencia a troca de telas do aplicativo baseada em arquivos. Permite o fluxo de navegação: Tela de Cadastro -> Tela de Dashboard.

5. Ícones
Biblioteca: @expo/vector-icons

Função: Fornece o pacote de ícones Feather utilizados nos botões e cards do Dashboard.

⚙️ Configurações Específicas
Detecção de Plataforma (Platform)
O código utiliza o módulo Platform do React Native para adaptar o comportamento do aplicativo:

No Celular: O aplicativo roda em tela cheia (comportamento nativo).

No Web/Notebook: O aplicativo renderiza uma "moldura" centralizada com dimensões fixas e barra de rolagem, simulando a experiência mobile para fins de apresentação.

Configuração de Rede (api.ts)
O arquivo de serviço da API foi configurado para operar em ambiente de desenvolvimento híbrido:

Detecta automaticamente se está rodando na Web (localhost) ou no Celular (IP da Rede Local 192.168.x.x).

▶️ Como Executar o Projeto
Instalar Dependências: Na pasta do front-end, execute para baixar todas as bibliotecas listadas acima:

Bash

npm install
Iniciar o Projeto:

Bash

npx expo start
Rodar no Celular:

Baixe o app Expo Go (na Play Store ou App Store).

Escaneie o QR Code que aparecerá no terminal.

Rodar no Notebook (Modo Apresentação):

Com o comando acima rodando, pressione a tecla w no terminal.

O navegador abrirá com a interface simulada de celular.