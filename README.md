# 💰 Sistema de Controle de Gastos Financeiros

Um sistema de gestão de finanças pessoais, permitindo o controle de transações vinculadas a pessoas e categorias, com relatório analítico.

---

## 🚀 Tecnologias e Arquitetura

- **Backend:** .NET 8 Web API, Entity Framework Core (SQL Server).
- **Frontend:** React 18, TypeScript, Vite e Axios.
- **UX/UI:** Toast Notifications personalizadas e relatório.
- **Infra:** Docker & Docker Compose.

---

## 🐳 Como Rodar o Projeto (Passo a Passo)

Este projeto está conteinerizado. Você não precisa instalar SDKs ou Bancos de Dados localmente, apenas o **Docker**.

### 1. Clonar o repositório 
```bash
git clone https://github.com/isalvlace/prj_gastos.git

cd prj_gastos

### . Subir os Containers
docker compose up --build

Após o build (que pode levar alguns minutos na primeira vez), acesse:

Web (Frontend): http://localhost:3000

API (Swagger): http://localhost:5000/swagger

Desenvolvido por Isaac - 2026
