import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:12345@localhost:5432/yummygo")
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
ACCESS_TOKEN_EXPIRE_MINUTES = 30
