# 🌡️ API de Mapas de Calor e Gerenciamento de Usuários (SpaceFarm)

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
