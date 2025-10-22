from src.auth.security import get_password_hash, verify_password, create_access_token
from src.core.config import settings
from jose import jwt

def test_get_password_hash():
    password = "minhasenha123"
    hashed_password = get_password_hash(password)

    assert hashed_password != password
    assert isinstance(hashed_password, str)

def test_verify_password_success():
    password = "minhasenha123"
    hashed_password = get_password_hash(password)

    assert verify_password(password, hashed_password) == True

def test_verify_password_failure():
    password = "minhasenha123"
    hashed_password = get_password_hash(password)

    assert verify_password("senhaerrada", hashed_password) == False

def test_create_access_token():
    data = {"sub": "teste@usuario.com"} # 'sub' é o 'subject' do token
    token = create_access_token(data)

    assert isinstance(token, str)

    # Verifica se o token pode ser decodificado e contém os dados corretos
    payload = jwt.decode(
        token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
    )
    assert payload.get("sub") == "teste@usuario.com"
    assert "exp" in payload # Verifica se tem um tempo de expiração