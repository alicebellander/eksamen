"use client";

import Link from "next/link";
import { Oppskrift, slettOppskrift } from "@/lib/api";

interface Props {
  oppskrift: Oppskrift;
  onSlettet: (id: number) => void;
}

export default function OppskriftKort({ oppskrift, onSlettet }: Props) {
  async function handleSlett() {
    if (!confirm(`Er du sikker på at du vil slette «${oppskrift.tittel}»?`)) return;
    await slettOppskrift(oppskrift.id);
    onSlettet(oppskrift.id);
  }

  return (
    <article className="card h-full" aria-label={oppskrift.tittel}>

      <h2 className="text-xl" style={{ color: "var(--text)" }}>
        {oppskrift.tittel}
      </h2>

      {oppskrift.beskrivelse && (
        <p className="text-sm line-clamp-2" style={{ color: "var(--text-secondary)" }}>
          {oppskrift.beskrivelse}
        </p>
      )}

      {/* aria-hidden på emojier — teksten er den bærende informasjonen (WCAG 1.1.1) */}
      <div className="flex flex-wrap gap-2 mt-1">
        <span className="meta-pill">
          <span aria-hidden="true">🍽</span>
          <span>{oppskrift.porsjoner}&nbsp;porsjoner</span>
        </span>
        <span className="meta-pill">
          <span aria-hidden="true">⏱</span>
          <span>{oppskrift.tilberedningstidMinutter}&nbsp;min</span>
        </span>
      </div>

      {/* Handlingsknapper — mt-auto skyver dem til bunnen av kortet */}
      <div className="flex gap-2 mt-auto pt-3">
        <Link
          href={`/oppskrifter/${oppskrift.id}`}
          className="btn btn-ghost-blue flex-1"
        >
          Se oppskrift
        </Link>
        <Link
          href={`/oppskrifter/${oppskrift.id}/rediger`}
          className="btn btn-secondary flex-1"
        >
          Rediger
        </Link>
        {/* aria-label gir full kontekst til skjermlesere (WCAG 2.4.6) */}
        <button
          onClick={handleSlett}
          className="btn btn-danger"
          aria-label={`Slett ${oppskrift.tittel}`}
        >
          Slett
        </button>
      </div>
    </article>
  );
}
