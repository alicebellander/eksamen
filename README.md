# Oppskrifter

En fullstack webapplikasjon for å opprette, lagre og administrere oppskrifter. Bygget med Next.js, ASP.NET Core og PostgreSQL.

## Teknologier

| Del | Teknologi |
|-----|-----------|
| Frontend | Next.js 15 (App Router), Tailwind CSS |
| Backend | ASP.NET Core (.NET 10), C# |
| Database | PostgreSQL (Neon) via Entity Framework Core |
| Autentisering | NextAuth.js v5 med Google OAuth |

## Funksjonalitet

- Vis, opprett, rediger og slett oppskrifter
- Innlogging med Google-konto
- Brukere lagres automatisk i databasen ved første innlogging
- Tilgjengelighetstiltak (WCAG): skip-link, språkattributt, semantisk HTML

## Kom i gang

### Krav

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- PostgreSQL-database (f.eks. [Neon](https://neon.tech))
- Google OAuth-klient ([Google Cloud Console](https://console.cloud.google.com))

### Backend

```bash
dotnet restore
dotnet run
# API tilgjengelig på http://localhost:5000
# Swagger-dokumentasjon på http://localhost:5000/swagger
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Åpne http://localhost:3000
```

### Miljøvariabler

Opprett `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
AUTH_GOOGLE_ID=din_google_client_id
AUTH_GOOGLE_SECRET=din_google_client_secret
BETTER_AUTH_SECRET=en_tilfeldig_hemmelig_streng
```

Opprett `appsettings.json` i rotmappen (eller bruk eksisterende):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "din_postgresql_tilkoblingsstreng"
  }
}
```

## API-endepunkter

### Oppskrifter

| Metode | URL | Beskrivelse |
|--------|-----|-------------|
| GET | `/api/oppskrifter` | Hent alle oppskrifter |
| GET | `/api/oppskrifter/{id}` | Hent én oppskrift |
| POST | `/api/oppskrifter` | Opprett ny oppskrift |
| PUT | `/api/oppskrifter/{id}` | Oppdater oppskrift |
| DELETE | `/api/oppskrifter/{id}` | Slett oppskrift |

### Brukere

| Metode | URL | Beskrivelse |
|--------|-----|-------------|
| POST | `/api/brukere` | Opprett/hent bruker (upsert via Google ID) |
| GET | `/api/brukere/{id}` | Hent bruker på ID |

## Prosjektstruktur

```
eksamen-prosjekt/
├── Controllers/        # HTTP-kontrollere
├── Services/           # Forretningslogikk
├── Models/             # Databasemodeller
├── DTO/                # Data Transfer Objects
├── Data/               # EF Core DbContext
├── frontend/           # Next.js-applikasjon
│   ├── app/            # App Router-sider
│   ├── components/     # Gjenbrukbare komponenter
│   └── lib/            # API-klient
└── Program.cs          # Applikasjonskonfigurasjon
```
