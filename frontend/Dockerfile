FROM node:20-alpine

WORKDIR /app

# Copiamos os arquivos de pacotes primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instala as dependências dentro da imagem
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta que o Vite vai usar
EXPOSE 3000

# O comando 'dev' com --host 0.0.0.0 é vital para que o Docker consiga rotear o tráfego de fora para dentro do container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]