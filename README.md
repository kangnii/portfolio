# portfolio
# Portfolio full‑stack (Flask + React)

Un portfolio moderne et dynamique :
- **Backend** : Flask (API JSON + endpoint contact)
- **Frontend** : React (Vite) + Framer Motion + Canvas background
- **Effets** : reveal au scroll, glow curseur, progressbar de scroll, thème clair/sombre
- **Données** : chargées depuis l’API (pas de JSON en dur côté front)

## Lancer en local (recommandé)

### 1) Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
cp .env.example .env
python run.py
```

### 2) Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

➡️ Ouvre `http://localhost:5173`

## Lancer via Docker Compose
```bash
docker compose up --build
```

- Front : `http://localhost:5173`
- API : `http://localhost:5000/api/health`

## Contact
Le formulaire envoie sur `POST /api/contact`, et le backend stocke dans `backend/data/messages.jsonl`.

