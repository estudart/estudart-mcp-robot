FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copia os arquivos de pacotes e instala as dependências
COPY package*.json ./
RUN npm install

# Copia todo o código do projeto
COPY . .

# Compila o TypeScript para JavaScript
RUN npm run build

# Expõe a porta do seu aplicativo
EXPOSE 3000

# Executa o código compilado diretamente
CMD ["node", "dist/main.js"]
