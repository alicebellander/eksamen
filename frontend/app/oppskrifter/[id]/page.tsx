"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { hentOppskrift, slettOppskrift, Oppskrift } from "@/lib/api";

export default function OppskriftDetalj() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [oppskrift, setOppskrift] = useState<Oppskrift | null>(null);
  const [feil, setFeil] = useState<string | null>(null);

  useEffect(() => {
    hentOppskrift(Number(id))
      .then(setOppskrift)
      .catch(() => setFeil("Oppskriften ble ikke funnet."));
  }, [id]);

  async function handleSlett() {
    if (!confirm("Er du sikker på at du vil slette denne oppskriften?")) return;
    await slettOppskrift(Number(id));
    router.push("/");
  }

  if (feil) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="alert-error" role="alert">{feil}</div>
      </div>
    );
  }

  if (!oppskrift) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10" aria-live="polite">
        <p style={{ color: "var(--text-muted)" }}>Laster oppskrift…</p>
      </div>
    );
  }

  const ingrediensLinjer = oppskrift.ingredienser.split("\n").filter(Boolean);
  const stegLinjer = oppskrift.fremgangsmaate.split("\n").filter(Boolean);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">

      <Link href="/" className="back-link mb-6 block">
        ← Tilbake til alle oppskrifter
      </Link>

      <article aria-labelledby="oppskrift-tittel">

        {/* Tittel og handlingsknapper */}
        <div className="flex items-start justify-between mb-3 gap-4">
          <h1
            id="oppskrift-tittel"
            className="text-3xl"
            style={{ color: "var(--text)" }}
          >
            {oppskrift.tittel}
          </h1>
          <div className="flex gap-2 shrink-0">
            <Link href={`/oppskrifter/${id}/rediger`} className="btn btn-secondary">
              Rediger
            </Link>
            <button
              onClick={handleSlett}
              className="btn btn-danger"
              aria-label="Slett denne oppskriften"
            >
              Slett
            </button>
          </div>
        </div>

        {oppskrift.beskrivelse && (
          <p className="text-base mb-4" style={{ color: "var(--text-secondary)" }}>
            {oppskrift.beskrivelse}
          </p>
        )}

        {/* Metainformasjon — aria-label gir kontekst til skjermlesere */}
        <div className="flex flex-wrap gap-2 mb-8" aria-label="Oppsummering">
          <span className="meta-pill">
            <span aria-hidden="true">🍽</span>
            <span>{oppskrift.porsjoner}&nbsp;porsjoner</span>
          </span>
          <span className="meta-pill">
            <span aria-hidden="true">⏱</span>
            <span>{oppskrift.tilberedningstidMinutter}&nbsp;min</span>
          </span>
        </div>

        <hr className="section-divider" aria-hidden="true" />

        {/* Ingredienser */}
        <section aria-labelledby="ingredienser-tittel" className="mb-8">
          <h2
            id="ingredienser-tittel"
            className="text-xl mb-4"
            style={{ color: "var(--text)" }}
          >
            Ingredienser
          </h2>
          <ul className="space-y-2">
            {ingrediensLinjer.map((linje, i) => (
              <li
                key={i}
                className="flex items-baseline gap-3 text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 rounded-full"
                  style={{
                    width: "8px",
                    height: "8px",
                    minWidth: "8px",
                    background: "var(--blue)",
                    marginTop: "0.45rem",
                  }}
                />
                {linje}
              </li>
            ))}
          </ul>
        </section>

        <hr className="section-divider" aria-hidden="true" />

        {/* Fremgangsmåte */}
        <section aria-labelledby="fremgangsmaate-tittel">
          <h2
            id="fremgangsmaate-tittel"
            className="text-xl mb-4"
            style={{ color: "var(--text)" }}
          >
            Fremgangsmåte
          </h2>
          <ol className="space-y-4">
            {stegLinjer.map((steg, i) => (
              <li
                key={i}
                className="flex gap-3 text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  className="shrink-0 font-bold"
                  style={{ color: "var(--blue)", minWidth: "1.5rem" }}
                  aria-hidden="true"
                >
                  {i + 1}.
                </span>
                <span>{steg}</span>
              </li>
            ))}
          </ol>
        </section>

      </article>
    </div>
  );
}
