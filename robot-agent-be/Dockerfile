FROM node:20-slim

WORKDIR /app

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
