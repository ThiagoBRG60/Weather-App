<h1 align="center">
   Weather App
</h1>

<p align="center">
   <img alt="Top language" src="https://img.shields.io/github/languages/top/ThiagoBRG60/Weather-App?style=flat-square&color=8ED2DF"/>
   <img alt="Language Count" src="https://img.shields.io/github/languages/count/ThiagoBRG60/Weather-App?style=flat-square&color=8ED2DF"/>
   <img alt="Repository Size" src="https://img.shields.io/github/repo-size/ThiagoBRG60/Weather-App?style=flat-square&color=8ED2DF"/>
   <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/ThiagoBRG60/Weather-App?style=flat-square&color=8ED2DF"/>
   <img alt="GitHub forks" src="https://img.shields.io/github/forks/ThiagoBRG60/Weather-App?style=flat-square&color=8ED2DF"/>
   <a href="https://github.com/ThiagoBRG60/Weather-App/tree/main/LICENSE">
      <img alt="License" src="https://img.shields.io/github/license/ThiagoBRG60/Weather-App?style=flat-square&color=8ED2DF"/>
   </a>
</p>

<div align="center">
   <img src="https://github.com/user-attachments/assets/730998bb-e20c-40c1-81dd-65f5d7c41bc3" alt="project-example-gif"/>
</div>

## 📝 Descrição

Uma aplicação web que fornece informações de clima em tempo real para qualquer local pesquisado. A interface é moderna e responsiva, com dois cards principais: um exibe informações básicas do clima junto com uma foto do local pesquisado, e o outro apresenta detalhes meteorológicos mais específicos como umidade, precipitação e velocidade do vento.

A aplicação detecta automaticamente a localização do usuário através do IP para exibir as informações meteorológicas iniciais. Possui também tradução automática integrada para melhor experiência do usuário, convertendo as pesquisas de português para inglês antes de buscar os dados e imagens do local. Além disso, implementa um sistema de cache de imagens, garantindo carregamentos mais rápidos e evitando requisições desnecessárias.

## 🚀 Funcionalidades

- Detecção automática da localização do usuário por IP.
- Pesquisa de condições do clima por localidade.
- Tradução automática de português para inglês.
- Exibição de imagens dinâmicas do local pesquisado.
- Sistema de cache de imagens para carregamento otimizado.
- Sistema de notificações toast com fila de execução.
- Interface totalmente responsiva.

## 💻 Tecnologias

**Frontend:**
- HTML
- CSS
- JavaScript

**Backend:**
- Node.js

## 📚 Bibliotecas e APIs Utilizadas

- **Weather API**: Para dados meteorológicos.
- **Google Translate API**: Para tradução de textos.
- **DuckDuckGo Images API**: Para imagens dos locais.
- **IP Geolocation API**: Para detecção da localização inicial do usuário.

## ⚙️ Pré-requisitos

Antes de executar o projeto, certifique-se de que você tenha instalado:

- **Node.js** (versão 18.x ou superior)
- **npm** (gerenciador de pacotes do Node.js) ou **yarn**

Para verificar se você tem o Node.js e o npm instalados, execute:

```bash
node -v
npm -v
```

Se você não tiver o Node.js instalado, você pode baixá-lo aqui: https://nodejs.org.

Se preferir usar o yarn, você pode instalá-lo globalmente com:

```bash
npm install -g yarn
```

## 🔑 Configurações do Projeto

1. Acesse [Weather API](https://www.weatherapi.com/) e crie uma conta.
   
2. Obtenha sua chave de API.
   
3. Crie um arquivo `.env` baseado no `.env.example` incluído no projeto.
   
4. Adicione sua chave de API no formato: `WEATHER_API_KEY="sua_chave_aqui"`

## 🛠️ Como Executar o Projeto

1. Clone o repositório:
```bash
git clone https://github.com/ThiagoBRG60/Weather-App.git
```

2. Navegue até a pasta do projeto e instale as dependências:
```bash
npm install
```

3. Configure o arquivo .env conforme instruções acima.

4. Inicie o servidor (isso irá limpar/criar a pasta dist e minificar os arquivos estáticos):
```bash
npm start
```

5. Abra o navegador e acesse a aplicação: [http://localhost:3000](http://localhost:3000).

## 📁 Estrutura do Projeto

```
├── dist/
│   ├── temp/
│   ├── index.html
│   ├── index.min.js
│   └── style.min.css
├── public/
│   ├── css/
│   ├── js/
│   │   ├── components/
│   │   ├── utils/
│   │   └── index.js/
│   └── index.html
├── src/
│   ├── data/
│   │   ├── apiRoutes.js
│   │   └── mimeTypes.json
│   ├── middleware/
│   │   └── returnResponse.js
│   ├── routes/
│   │   ├── fetchWeather/
│   │   ├── imageSearch/
│   │   └── translate/
│   ├── scripts/
│   │   └── handleDist.js
│   └── server.js
├── .env
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
└── README.md (arquivo atual)
```

## 🌍 Rotas Disponíveis

**GET**:
- `/imageSearch`
   - **Descrição**: Busca imagens do local desejado.
   - **Parâmetros obrigatórios**: q (query com o nome do local).
   - **Exemplo**:
   ```bash
   curl "http://localhost:3000/imageSearch?q=bahia"
   ```
- `/fetchWeather`
   - **Descrição**: Busca informações meteorológicas do local desejado.
   - **Parâmetros obrigatórios**: q (query com o nome do local).
   - **Exemplo**:
   ```bash
   curl "http://localhost:3000/fetchWeather?q=bahia"
   ```
**POST**:
- `/translate`
   - **Descrição**: Traduz um texto do português para o inglês (padrão) ou para qualquer outro idioma (informado no config).
   - **Body (JSON)**: Texto para ser traduzido e configuração de tradução (opcional).
   - **Exemplo**:
   ```bash
   curl -X POST "http://localhost:3000/translate" -H "Content-Type: application/json" -d "{\"text\": \"Testing the translation\", \"config\": {\"from\": \"en\", \"to\": \"pt-BR\"}}"
   ```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir com o projeto, siga esses passos:

1. Faça um fork do repositório.
   
2. Crie uma branch para a sua feature ou alteração: `git checkout -b nome-da-sua-branch`.
   
3. Faça suas alterações, adicione e dê commit: `git add .` e `git commit -m 'mensagem de commit'`.
   
4. Envie suas alterações para o repositório forkado: `git push origin nome-da-sua-branch`.
   
5. Crie um pull request no GitHub para o repositório principal.

## 📬 Contato

Caso tenha alguma dúvida, entre em contato comigo pelo meu email:

<a href="mailto:thiagocorreadev@gmail.com" title="Gmail">
   <img src="https://img.shields.io/badge/-Gmail-FF0000?style=flat-square&labelColor=FF0000&logo=gmail&logoColor=white" alt="Gmail"/>
</a>

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [`LICENSE`](LICENSE) para mais detalhes.

<br>

⭐ Se este projeto te ajudou, considere deixar uma estrela no repositório!
