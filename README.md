# TruthWeave — AI-Powered Misinformation & Information Verification Platform

TruthWeave is a real-time multimodal verification platform designed to ingest and verify claims, documents, images, video forensic files, and live web URLs using deep relational intelligence and consensus analysis.

---

## 🛠️ Architecture

- **Frontend**: React 19 + Vite + TypeScript + Tailwind CSS + Lucide Icons + Recharts + Sonner Toasts
- **Backend**: FastAPI + SQLAlchemy ORM + Pydantic v2 + PostgreSQL + Alembic + JWT (HS256) + Passlib/Bcrypt
- **Database**: PostgreSQL 18+

---

## 🚀 Getting Started

### 1. Database Setup

Ensure PostgreSQL is running locally on port `5432` with a database named `truthweave`.

```bash
# PostgreSQL default connection string in backend/.env:
DATABASE_URL="postgresql://admin:strong-password@127.0.0.1:5432/truthweave"
```

### 2. Backend Setup

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start FastAPI development server
python -m uvicorn app.main:app --reload
```

- **Backend API**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Interactive Swagger Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Health Check**: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

### 3. Frontend Setup

```powershell
cd frontend
npm install
npm run dev
```

- **Frontend Application**: [http://localhost:5173](http://localhost:5173)

---

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` — Register new account (first user registered bootstraps as `ADMIN`, subsequent users as `USER`).
- `POST /api/v1/auth/login` — OAuth2 Form Login returning JWT access token.
- `GET /api/v1/auth/me` — Retrieve active authenticated user profile & metrics.

### Verifications
- `GET /api/v1/verifications` — List verifications (user history or admin global stream).
- `GET /api/v1/verifications/{id}` — Retrieve detailed verification report with evidence & timeline.
- `POST /api/v1/verifications/claim` — Ingest and queue a factual statement / claim.
- `POST /api/v1/verifications/url` — Ingest and queue webpage URL for scraping and corroboration.
- `POST /api/v1/verifications/file` — Ingest evidentiary documents, images, or media files.
- `DELETE /api/v1/verifications/{id}` — Remove verification record.

### Documents
- `GET /api/v1/documents` — List user's uploaded evidentiary files and media.
- `POST /api/v1/documents/upload` — Ingest and store new files.
- `DELETE /api/v1/documents/{id}` — Remove uploaded document.

### Administration (`ADMIN` role required)
- `GET /api/v1/admin/stats` — Real-time telemetry on users, verifications, and system events.
- `GET /api/v1/admin/users` — User directory with verification counts & activity timestamps.
- `PATCH /api/v1/admin/users/{id}/role` — Reassign permissions (`USER` vs `ADMIN`).
- `PATCH /api/v1/admin/users/{id}/status` — Suspend / reactivate account access.
- `GET /api/v1/admin/audit-logs` — Cryptographically ordered security and compliance audit logs.
- `GET /api/v1/admin/system-health` — Live database connectivity and microservices diagnostics (`SELECT 1`).
