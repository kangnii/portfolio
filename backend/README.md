# Backend (Flask)

API JSON pour alimenter le portfolio (profil, compétences, projets) + endpoint de contact.

## Démarrage (dev)

```bash
cd backend
python -m venv .venv
# Linux/Mac
source .venv/bin/activate
# Windows (PowerShell)
# .venv\Scripts\Activate.ps1

pip install -r requirements.txt
cp .env.example .env
python run.py
```

L’API tourne par défaut sur `http://localhost:5000`.

## Endpoints

- `GET /api/health`
- `GET /api/profile`
- `GET /api/projects`
- `POST /api/contact` (stocke le message en local dans `data/messages.jsonl`)

> ⚠️ En prod, branchez un vrai service d’email (SMTP, SendGrid, etc.) et ajoutez du rate‑limit.
