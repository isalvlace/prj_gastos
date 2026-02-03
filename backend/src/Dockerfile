FROM mcr.microsoft.com/dotnet/sdk:8.0
WORKDIR /app
COPY . .

# Instala a ferramenta EF globalmente
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

WORKDIR /app/Gastos.Api
RUN dotnet restore

RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]