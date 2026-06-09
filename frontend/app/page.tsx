"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllRecipes, Recipe } from "@/lib/api";
import OppskriftKort from "@/components/OppskriftKort";

export default function Hjem() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [laster, setLaster] = useState(true);
  const [feil, setFeil] = useState<string | null>(null);

  useEffect(() => {
    getAllRecipes()
      .then(setRecipes)
      .catch(() => setFeil("Kunne ikke koble til API. Er C#-backenden oppe?"))
      .finally(() => setLaster(false));
  }, []);

  function handleSlettet(id: number) {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* Sidetopp med tittel og handling */}
      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl" style={{ color: "var(--text)" }}>
            Mine oppskrifter
          </h1>
          <p className="mt-1 text-base" style={{ color: "var(--text-muted)" }}>
            Dine lagrede oppskrifter
          </p>
        </div>
        <Link href="/oppskrifter/ny" className="btn btn-primary shrink-0">
          + Ny oppskrift
        </Link>
      </div>

      {/* aria-live annonserer statusendringer til skjermlesere (WCAG 4.1.3) */}
      <div aria-live="polite" aria-atomic="true">
        {laster && (
          <p style={{ color: "var(--text-muted)" }}>Laster oppskrifter…</p>
        )}
        {feil && (
          <div className="alert-warning" role="alert">
            <p className="font-bold">Backend ikke tilgjengelig</p>
            <p className="mt-1 text-sm">{feil}</p>
          </div>
        )}
        {!laster && !feil && recipes.length === 0 && (
          <div
            className="text-center py-16 rounded-2xl"
            style={{ background: "var(--surface)", border: "2px dashed var(--blue-light)" }}
          >
            <p className="text-lg font-bold mb-2" style={{ color: "var(--text)" }}>
              Ingen oppskrifter ennå
            </p>
            <p className="mb-5" style={{ color: "var(--text-muted)" }}>
              Kom i gang ved å legge til din første oppskrift.
            </p>
            <Link href="/oppskrifter/ny" className="btn btn-primary">
              + Legg til oppskrift
            </Link>
          </div>
        )}
      </div>

      {/* Oppskrift-grid — semantisk liste (WCAG 1.3.1) */}
      {recipes.length > 0 && (
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2"
          aria-label={`${recipes.length} oppskrift${recipes.length !== 1 ? "er" : ""}`}
        >
          {recipes.map((r) => (
            <li key={r.id}>
              <OppskriftKort recipe={r} onSlettet={handleSlettet} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
