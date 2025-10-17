from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas
from src.core.database import get_db
from src.auth.security import get_password_hash
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from src.auth.security import verify_password, create_access_token
from src.core.config import settings
from src.auth.dependencies import get_current_user

# Criamos um roteador em vez de uma nova App FastAPI
router = APIRouter(tags=["Usuários"])

# Usamos @router em vez de @app para decorar as rotas
@router.post("/", response_model=schemas.Usuario, status_code=201)
def criar_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = db.query(models.Usuario).filter(models.Usuario.email == usuario.email).first()
    if db_usuario:
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    
    # Hashear a senha antes de salvar
    hashed_password = get_password_hash(usuario.senha)
    
    novo_usuario = models.Usuario(
        nome=usuario.nome, 
        email=usuario.email, 
        senha=hashed_password # Salvar a senha hasheada
    )
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    return novo_usuario

@router.post("/login", response_model=schemas.Token)
def login_for_access_token(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    # O email do usuário virá no campo 'username' do formulário
    usuario = db.query(models.Usuario).filter(models.Usuario.email == form_data.username).first()
    
    # Verifica se o usuário existe e se a senha está correta
    if not usuario or not verify_password(form_data.password, usuario.senha):
        raise HTTPException(
            status_code=401,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Define o tempo de expiração do token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # Cria o token de acesso
    access_token = create_access_token(
        data={"sub": usuario.email}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/", response_model=list[schemas.Usuario])
def listar_usuarios(
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(get_current_user) # <-- PROTEGER A ROTA
):
    """
    Lista todos os usuários. Requer autenticação.
    """
    # Opcional: você poderia usar o 'current_user' para lógicas de permissão.
    # Ex: if not current_user.is_admin: ...
    return db.query(models.Usuario).all()

@router.get("/{usuario_id}", response_model=schemas.Usuario)
def obter_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return usuario

@router.put("/{usuario_id}", response_model=schemas.Usuario)
def atualizar_usuario(
    usuario_id: int, 
    dados: schemas.UsuarioCreate, 
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(get_current_user)
    ):
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
def deletar_usuario(
    usuario_id: int, 
    db: Session = Depends(get_db),
    current_user: models.Usuario = Depends(get_current_user)):
    usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    db.delete(usuario)
    db.commit()
    return {"mensagem": "Usuário removido com sucesso"}