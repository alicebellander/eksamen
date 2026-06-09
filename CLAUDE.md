# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Backend (.NET 10 / C#)

```bash
dotnet restore
dotnet build
dotnet run          # API on http://localhost:5000, Swagger at /swagger
dotnet watch run    # auto-restart on changes
```

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev    # http://localhost:3000
npm run build
npm run lint
```

## Architecture

Full-stack recipe management app (Norwegian: "oppskrifter" = recipes).

**Stack:** Next.js frontend → ASP.NET Core REST API → PostgreSQL (Neon, via EF Core / Npgsql)

**Frontend→Backend connection:** `NEXT_PUBLIC_API_URL` env var (default `http://localhost:5000/api`). API routes are `/api/oppskrifter`.

**Authentication:** NextAuth.js v5 with Google OAuth. Configured in `frontend/auth.ts`. Required env vars: `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `BETTER_AUTH_SECRET`. Login page at `/login`.

### Backend layers

- **`Controllers/Controllers.cs`** — `RecipesController` handles HTTP, delegates to service
- **`Services/`** — `IRecipeService` interface + `ProductService` implementation with all business logic
- **`Data/AppDbContext.cs`** — EF Core DbContext; `OnModelCreating()` sets `CreatedAt` DB default to `NOW()`
- **`DTO/DTO.cs`** — `CreateRecipeRequest`, `UpdateRecipeRequest`, `RecipeResponse`; database models are never returned directly (always mapped via `MapToResponse()`)
- **`Models/product.cs`** — `Recipe` entity; uses `[Column]` attributes where PostgreSQL column names differ

Services are registered as Scoped in `Program.cs`. CORS allows `localhost:3000` — update for production.

### Frontend structure

- **`frontend/lib/api.ts`** — all fetch calls (`getAllRecipes`, `getRecipe`, `createRecipe`, `updateRecipe`, `deleteRecipe`)
- **`frontend/components/OppskriftSkjema.tsx`** — shared form for both create and edit
- **`frontend/components/OppskriftKort.tsx`** — recipe card with view/edit/delete actions
- Pages: `/` list, `/oppskrifter/ny` create, `/oppskrifter/[id]` detail, `/oppskrifter/[id]/rediger` edit

Styling: Tailwind CSS + CSS custom properties (`--text`, `--surface`, `--border`, `--blue`, etc.) in `app/globals.css`.

### Key data patterns

- **Ingredients and Instructions** are stored as plain text with newline delimiters. Frontend splits on `\n` for display and joins for submission.
- **Timestamps:** `CreatedAt` is set by the DB default; `UpdatedAt` is set explicitly in C# to `DateTime.UtcNow` on update.

### Adding a new recipe field

1. Add property to `Recipe` model (with `[Column]` if DB name differs)
2. Add to all three DTOs in `DTO.cs` and update `MapToResponse()` in `ProductService.cs`
3. Alter the DB table (migrations were deleted — run raw SQL or recreate them)
4. Update the TypeScript `Recipe` interface in `frontend/lib/api.ts` and the form in `OppskriftSkjema.tsx`

## Environment variables

| File | Variable | Purpose |
|------|----------|---------|
| `appsettings.json` | `ConnectionStrings:DefaultConnection` | PostgreSQL connection string |
| `frontend/.env.local` | `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `frontend/.env.local` | `AUTH_GOOGLE_ID` | Google OAuth client ID |
| `frontend/.env.local` | `AUTH_GOOGLE_SECRET` | Google OAuth secret |
| `frontend/.env.local` | `BETTER_AUTH_SECRET` | NextAuth session secret |

> **Note:** Migrations were deleted from the repo. The DB schema must be managed manually or by recreating migrations with `dotnet ef migrations add`.
