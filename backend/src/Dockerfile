FROM mcr.microsoft.com/dotnet/sdk:8.0
WORKDIR /app

# 1. Instala a ferramenta EF globalmente
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# 2. Copia tudo do context (backend/) para /app
COPY . .

# 3. Ajuste do caminho: O chmod aponta para a pasta src
RUN chmod +x ./src/entrypoint.sh

# 4. Entra na pasta do projeto para restaurar
WORKDIR /app/src/Gastos.Api
RUN dotnet restore

# 5. Define o Entrypoint apontando para o local correto dentro de src
ENTRYPOINT ["/bin/sh", "/app/src/entrypoint.sh"]