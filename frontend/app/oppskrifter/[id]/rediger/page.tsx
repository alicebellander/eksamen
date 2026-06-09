"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getRecipe, updateRecipe, Recipe, RecipeInput } from "@/lib/api";
import OppskriftSkjema from "@/components/OppskriftSkjema";

export default function RedigerOppskrift() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    getRecipe(Number(id)).then(setRecipe);
  }, [id]);

  async function handleSubmit(data: RecipeInput) {
    await updateRecipe(Number(id), data);
    router.push(`/oppskrifter/${id}`);
  }

  if (!recipe) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10" aria-live="polite">
        <p style={{ color: "var(--text-muted)" }}>Laster oppskrift…</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link href={`/oppskrifter/${id}`} className="back-link mb-6 block">
        ← Tilbake til oppskrift
      </Link>
      <h1 className="text-2xl mb-8" style={{ color: "var(--text)" }}>
        Rediger: {recipe.title}
      </h1>
      <OppskriftSkjema
        initialVerdier={recipe}
        onSubmit={handleSubmit}
        submitTekst="Lagre endringer"
      />
    </div>
  );
}
