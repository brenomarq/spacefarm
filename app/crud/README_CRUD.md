# 🧩 CRUD de Usuários – SpaceFarm

Este módulo implementa um CRUD (Create, Read, Update, Delete) de usuários utilizando o framework **FastAPI**, com banco de dados **SQLite** e **SQLAlchemy** como ORM.  
O código faz parte do projeto **SpaceFarm**, servindo como base para a gestão de usuários dentro da aplicação.

---

## 🚀 Funcionalidades

- **Criar usuário** → adiciona um novo registro com nome, e-mail e senha.  
- **Listar usuários** → retorna todos os usuários cadastrados.  
- **Consultar usuário** → busca um usuário específico por ID.  
- **Atualizar usuário** → edita os dados de um usuário existente.  
- **Excluir usuário** → remove um usuário do banco de dados.

---

## ⚙️ Estrutura do projeto

```
app/
└── crud/
    ├── database.py   → conexão com o banco de dados SQLite
    ├── models.py     → definição da tabela e modelo de usuário
    ├── schemas.py    → schemas Pydantic para validação de entrada e saída
    └── main.py       → rotas da API e lógica CRUD
```

---

## 💻 Tecnologias utilizadas

- **Python 3.9+**
- **FastAPI**
- **SQLAlchemy**
- **Pydantic**
- **Uvicorn (servidor ASGI)**

---

## ⚙️ Como executar o CRUD dentro do repositório SpaceFarm

### 1️⃣ Acesse o diretório raiz do projeto clonado:

```bash
cd spacefarm
```

### 2️⃣ Crie um ambiente virtual (opcional, mas recomendado):

```bash
python -m venv venv
```

Ative o ambiente:

**Windows**
```bash
venv\Scripts\activate
```

**Linux/Mac**
```bash
source venv/bin/activate
```

### 3️⃣ Instale as dependências:

```bash
pip install fastapi uvicorn sqlalchemy pydantic
```

### 4️⃣ Execute o servidor:

```bash
uvicorn app.crud.main:app --reload
```

### 5️⃣ Acesse no navegador:

- **Swagger UI:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)  
- **ReDoc:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

## 🔁 Endpoints disponíveis

| Método | Endpoint         | Descrição                    | Corpo da Requisição |
|--------|------------------|------------------------------|--------------------|
| **POST** | `/usuarios/`     | Cria um novo usuário          | `{ "nome": "Maria", "email": "maria@exemplo.com", "senha": "123" }` |
| **GET**  | `/usuarios/`     | Lista todos os usuários       | — |
| **GET**  | `/usuarios/{id}` | Retorna um usuário específico | — |
| **PUT**  | `/usuarios/{id}` | Atualiza um usuário existente | `{ "nome": "Novo Nome", "email": "novo@exemplo.com", "senha": "321" }` |
| **DELETE** | `/usuarios/{id}` | Remove um usuário do sistema  | — |

---

## 🧠 Observações

- O projeto utiliza **SQLite** para simplificar o ambiente de desenvolvimento.  
- Os **schemas Pydantic** asseguram que os dados enviados e recebidos estejam no formato correto.  
- Pode ser facilmente adaptado para usar **PostgreSQL** ou **MySQL**.  
- É compatível com futuras implementações de **login** e **autenticação de usuários**.

---

## ✨ Autoria

**Desenvolvido por:** Maria Eduarda Martins de Oliveira  
**Projeto acadêmico – Universidade Católica de Brasília**

---
