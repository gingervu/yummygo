from datetime import datetime, timedelta, timezone
import jwt
from config.settings import settings
SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm

def create_access_token(data: dict, expires_delta: timedelta = timedelta(days=3)):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

import jwt
from jwt.exceptions import ExpiredSignatureError, DecodeError
from typing import Dict

def decode_access_token(token: str) -> Dict:
    try:
        # Giải mã token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except ExpiredSignatureError:
        raise Exception("Token has expired.")
    except DecodeError:
        raise Exception("Error decoding the token.")
    except Exception as e:
        raise Exception(f"An error occurred: {str(e)}")
