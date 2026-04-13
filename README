### 1. Start Postgres database

```bash
docker build -t postgres-nology-image .

docker run -d \
  -p 5432:5432 \
  --env-file .env \
  --name db-nology \
  -v pgdata:/var/lib/postgresql/data \
  postgres-nology-image
```

### 2. Start Backend

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
fastapi run ./src/main.py
```

### 3. Start Frontend
Certifique-se de ter executado o `npm install` previamente para instalar os pacotes necessários.

```bash
npm install
npm run build
npm start
```
