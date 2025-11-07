from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import models, schemas
from src.core.database import SessionLocal
from fastapi.security import OAuth2PasswordRequestForm
from src.auth.security import get_password_hash, verify_password, create_access_token
from src.usuarios import schemas
from src.auth.dependencies import get_current_user

# Criamos um roteador em vez de uma nova App FastAPI
router = APIRouter()

# Função de dependência para obter a sessão do banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Usamos @router em vez de @app para decorar as rotas
@router.post("/", response_model=schemas.Usuario, status_code=201)
def criar_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = db.query(models.Usuario).filter(models.Usuario.email == usuario.email).first()
    if db_usuario:
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    
    hashed_password = get_password_hash(usuario.senha)
    
    novo_usuario = models.Usuario(
        nome=usuario.nome, 
        email=usuario.email, 
        senha=hashed_password # <-- Salvar a senha hasheada
    )

    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    return novo_usuario

@router.get("/", response_model=list[schemas.Usuario])
def listar_usuarios(
    db: Session = Depends(get_db),
    # 2. Adicione a dependência à assinatura da função
    current_user: models.Usuario = Depends(get_current_user) 
):
    """
    Lista todos os usuários. APENAS usuários autenticados podem acessar.
    'current_user' conterá o objeto do usuário logado.
    """
    # 3. A lógica da rota só executa se get_current_user for bem-sucedido
    return db.query(models.Usuario).all()

@router.get("/{usuario_id}", response_model=schemas.Usuario)
def obter_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return usuario

@router.put("/{usuario_id}", response_model=schemas.Usuario)
def atualizar_usuario(usuario_id: int, dados: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    usuario.nome = dados.nome
    usuario.email = dados.email
    usuario.senha = dados.senha # Novamente, lembre-se de hashear a senha em produção
    db.commit()
    db.refresh(usuario)
    return usuario

@router.delete("/{usuario_id}")
def deletar_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    db.delete(usuario)
    db.commit()
    return {"mensagem": "Usuário removido com sucesso"}

@router.post("/login", response_model=schemas.Token)
def login_for_access_token(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    usuario = db.query(models.Usuario).filter(
        models.Usuario.email == form_data.username
    ).first()

    if not usuario or not verify_password(form_data.password, usuario.senha):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": usuario.email})

    return {"access_token": access_token, "token_type": "bearer"}
