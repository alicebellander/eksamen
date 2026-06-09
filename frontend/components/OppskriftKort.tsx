"use client";

import Link from "next/link";
import { Recipe, deleteRecipe } from "@/lib/api";

interface Props {
  recipe: Recipe;
  onSlettet: (id: number) => void;
}

export default function OppskriftKort({ recipe, onSlettet }: Props) {
  async function handleSlett() {
    if (!confirm(`Er du sikker på at du vil slette «${recipe.title}»?`)) return;
    await deleteRecipe(recipe.id);
    onSlettet(recipe.id);
  }

  return (
    <article className="card h-full" aria-label={recipe.title}>

      <h2 className="text-xl" style={{ color: "var(--text)" }}>
        {recipe.title}
      </h2>

      {recipe.description && (
        <p className="text-sm line-clamp-2" style={{ color: "var(--text-secondary)" }}>
          {recipe.description}
        </p>
      )}

      {/* aria-hidden på emojier — teksten er den bærende informasjonen (WCAG 1.1.1) */}
      <div className="flex flex-wrap gap-2 mt-1">
        <span className="meta-pill">
          <span aria-hidden="true">🍽</span>
          <span>{recipe.portions}&nbsp;porsjoner</span>
        </span>
        <span className="meta-pill">
          <span aria-hidden="true">⏱</span>
          <span>{recipe.cookingTimeMinutes}&nbsp;min</span>
        </span>
      </div>

      {/* Handlingsknapper — mt-auto skyver dem til bunnen av kortet */}
      <div className="flex gap-2 mt-auto pt-3">
        <Link
          href={`/oppskrifter/${recipe.id}`}
          className="btn btn-ghost-blue flex-1"
        >
          Se oppskrift
        </Link>
        <Link
          href={`/oppskrifter/${recipe.id}/rediger`}
          className="btn btn-secondary flex-1"
        >
          Rediger
        </Link>
        {/* aria-label gir full kontekst til skjermlesere (WCAG 2.4.6) */}
        <button
          onClick={handleSlett}
          className="btn btn-danger"
          aria-label={`Slett ${recipe.title}`}
        >
          Slett
        </button>
      </div>
    </article>
  );
}
