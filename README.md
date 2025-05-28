# 📦 Entregou

**Um sistema de gerenciamento e entrega de cargas com logística distribuída**

---

## 📝 Descrição

O **Entregou** é uma aplicação completa para **monitoramento de entregas**, **gestão de rotas**, **gerenciamento de frotas** e **logística de armazéns distribuída**.  
O projeto visa oferecer soluções acessíveis para quem enfrenta dificuldades em conseguir oportunidades de fretes, promovendo uma rede descentralizada de transporte e armazenagem.

---

## 🎯 Propósito e Objetivo

- Facilitar o **encontro entre quem precisa transportar mercadorias** e motoristas autônomos disponíveis.
- Otimizar a **gestão de rotas** e a **logística de armazéns** através de uma rede distribuída, utilizando **pessoas físicas** como motoristas e pontos de estoque.
- Automatizar e centralizar o **monitoramento de entregas** com painéis administrativos e notificações.

---

## 🛠️ Tecnologias Utilizadas

### Frontend:
- Angular 19
- TypeScript
- SCSS
- Angular Material UI

### Backend:
- Java 23 (Spring Boot)
- JPA (Hibernate)

### Banco de Dados:
- PostgreSQL

### Outros:
- Algoritmo para cálculo de rotas otimizadas e distribuicao de coleta de produtos
- Docker e Docker Compose para execução da aplicação completa

---

## Estrutura de pastas do projeto
```bash
/entregou
  ├── backend/         # API Java Spring Boot
  ├── frontend/        # Aplicação Angular
  ├── specs/           # Artefatos de criacao do projeto(Diagramas, Wireframes, DVP etc...)
  ├── docker-compose.yml
  ├── .env             # Configurações de ambiente (em breve)
```

## 🚀 Como executar o projeto

O projeto será disponibilizado com:

- Arquivos **Dockerfile** para frontend e backend
- Arquivo **docker-compose.yml** para orquestração do ambiente:
  - Aplicação Web
  - Backend (API REST)
  - Banco de dados relacional (PostgreSQL ou MySQL)

### ✅ Setup:
1. Clone o repositório
2. Ajuste as variáveis de ambiente no arquivo `.env` (em breve)
3. Execute:

   ```bash
   docker-compose up --build
   ```
   

## Licenca
A definir

## Contato
A definir
