<div align="center">
  <img src="./logo-lumi-white.svg" width="125px" alt="Lumi"/>
</div>

<h3 align="center">
  Teste para desenvolvedor full stack pleno
</h3>

<div align="center">
  <img alt="Made by Greyson Mascarenhas" src="https://img.shields.io/badge/made%20by-Greyson%20Mascarenhas-%23166534"/>
</div>

<div align="center">
    <a href="https://www.figma.com/file/jtiY6k9F4gCaGthWM8x0wb/Lumi?type=design&node-id=0%3A1&mode=design&t=SLpTDcOIa10eLT71-1">
    <img alt="Figma Badge" src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
    </a>
</div>

<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>
</p>

<div align="center">
  <img alt="Preview" src="./Cover.png"/>
</div>

## :rocket: Technologies

- **React Js** — A JavaScript library for building user interfaces.
- **NextJS** - A React framework that gives you building blocks to create web applications.
- **Axios** - Promise based HTTP client for the browser and node.js.
- **Phosphor Icons** - A flexible icon family for interfaces, diagrams, presentations — whatever, really.
- **Express** — Fast, unopinionated, minimalist web framework for Node.js.
- **Cors** - Node.js CORS middleware.
- **Eslint** - Pluggable JavaScript linter.
- **Prettier** - An opinionated code formatter.
- **VS Code** - Code Editing.
- **EditorConfig** - Helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v20.10.0][nodejs] or higher + [NPM v10.2.3][npm] or higher installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/greysonmrx/lumi.git

# Go into the repository
$ cd lumi

# Go into the backend folder
$ cd server

# Create .env file
$ cp .env.example .env

# Install dependencies
$ npm install

# Run database
$ docker-compose up -d

# Run migrations
$ npx prisma migrate dev

# Run the backend
$ npm run dev

# Go into the frontend folder
$ cd ..
$ cd client

# Install dependencies
$ npm install

# Create .env.local file
$ cp .env.example .env.local

# Run the frontend
$ npm run dev
```

Made with :hearts: by Greyson :wave: [See my linkedin](https://www.linkedin.com/in/greyson-mascarenhas-5a21ab1a2/)
