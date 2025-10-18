# 🌡️ API de Mapas de Calor e Gerenciamento de Usuários (SpaceFarm)

![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-Framework-brightgreen)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![License](https://img.shields.io/badge/License-MIT-lightgrey)
![Build](https://img.shields.io/badge/Build-Passing-success)

---

## 📚 Sumário

- [📜 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [🚀 Como Começar](#-como-começar)
  - [🔧 Pré-requisitos](#-pré-requisitos)
  - [🧩 Executando Localmente](#-1-executando-localmente)
  - [🐳 Executando com Docker](#-2-executando-com-docker)
- [✅ Executando os Testes](#-executando-os-testes)
- [📖 Documentação da API](#-documentação-da-api)
- [📚 Resumo dos Endpoints](#-resumo-dos-endpoints)
- [🧠 Exemplo de Requisição](#-exemplo-criando-um-usuário)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [💡 Autor](#-autor)

---

## 📜 Sobre o Projeto

Este projeto consiste em uma **API desenvolvida em Python** com o framework **FastAPI**.  
A API possui duas funcionalidades principais:

- 🗺️ **Geração de mapas de calor** a partir de dados geo-referenciados mockados
- 👤 **CRUD completo de usuários** com banco de dados SQLite

O projeto foi desenvolvido com foco em **boas práticas, modularidade e escalabilidade**, e está pronto para ser containerizado com **Docker**.

---

## ✨ Funcionalidades

- **API RESTful com FastAPI**, incluindo documentação interativa automática (**Swagger UI** e **ReDoc**).
- **Geração Dinâmica de Mapas de Calor**: endpoint que gera e retorna uma imagem de mapa de calor para diferentes métricas (_umidade, temperatura, NPK, PH_).
- **CRUD Completo para Usuários**: operações de **Criar**, **Ler**, **Atualizar** e **Deletar** usuários.
- **Banco de Dados**: utiliza **SQLAlchemy** com **SQLite**, facilitando futuras migrações para bancos como PostgreSQL.
- **Containerização com Docker**: ambiente isolado e consistente para execução.
- **Testes Unitários** com **pytest**, garantindo qualidade e estabilidade do código.

---

## 🛠️ Tecnologias Utilizadas

| Categoria                           | Tecnologias                        |
| ----------------------------------- | ---------------------------------- |
| **Backend**                         | Python 3.9+, FastAPI, Uvicorn      |
| **Banco de Dados**                  | SQLAlchemy, SQLite                 |
| **Manipulação de Dados e Gráficos** | Pandas, Matplotlib, Seaborn, SciPy |
| **Testes**                          | Pytest, HTTPX                      |
| **Containerização**                 | Docker                             |

---

## 🚀 Como Começar

Siga as instruções abaixo para configurar e executar o projeto localmente ou via Docker.

---

### 🔧 Pré-requisitos

- Python 3.9 ou superior
- `pip` e `venv`
- Git
- Docker _(opcional, para execução containerizada)_

---

### 🧩 1. Executando Localmente

#### a. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/spacefarm.git
cd backend
```

#### b. Crie e ative o ambiente virtual

Linux/macOS:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Windows:

```bash
python -m venv .venv
.\.venv\Scripts\activate
```

#### c. Instale as Dependências

```bash
pip install -r requirements.txt
```

#### d. Execute a Aplicação

```bash
uvicorn src.main:app --reload
```

---

### 🐳 2. Executando com Docker

#### a. Construa a Imagem Docker

```bash
docker build -t spacefarm-api .
```

#### b. Execute o Container

```bash
docker run -p 8000:8000 --name spacefarm-container spacefarm-api
```

A API estará disponível em http://127.0.0.1:8000

---

### ✅ Executando os Testes

Para verificar se tudo está funcionando corretamente, execute:

```bash
pytest
```

Certifique-se de que o ambiente virtual está ativado e as dependências instaladas.
