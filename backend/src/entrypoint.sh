#!/bin/sh
set -e

echo "--- INICIANDO ENTRYPOINT ---"

# Garante que as ferramentas globais do dotnet estejam no PATH
export PATH="$PATH:/root/.dotnet/tools"

echo "Aguardando 15 segundos para o SQL Server estabilizar..."
sleep 15

# Caminho ajustado para encontrar o projeto dentro da pasta src
APP_PATH="/app/src/Gastos.Api"
cd "$APP_PATH"

# Verifica se precisa de build
if [ ! -d "bin/Debug/net8.0" ]; then
    echo "Executando dotnet build..."
    dotnet build
fi

echo "Executando Migrations (dotnet ef database update)..."
dotnet ef database update

echo "Subindo a aplicação na porta 8080..."

echo "--------------------------------------------------------"
echo "API ONLINE!"
echo "Acesse o Swagger em: http://localhost:5000/swagger"
echo "Acesse os endpoints em: http://localhost:5000/api"
echo "--------------------------------------------------------"

dotnet run --urls http://0.0.0.0:8080 --no-build