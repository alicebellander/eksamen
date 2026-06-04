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
    if (!confirm("Slett denne oppskriften?")) return;
    await slettOppskrift(Number(id));
    router.push("/");
  }

  if (feil) return <p className="p-10 text-red-600">{feil}</p>;
  if (!oppskrift) return <p className="p-10 text-gray-400">Laster...</p>;

  const ingrediensLinjer = oppskrift.ingredienser.split("\n").filter(Boolean);
  const stegLinjer = oppskrift.fremgangsmaate.split("\n").filter(Boolean);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link href="/" className="text-sm text-blue-600 hover:underline mb-6 block">
        ← Tilbake
      </Link>

      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{oppskrift.tittel}</h1>
        <div className="flex gap-2">
          <Link
            href={`/oppskrifter/${id}/rediger`}
            className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium"
          >
            Rediger
          </Link>
          <button
            onClick={handleSlett}
            className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium"
          >
            Slett
          </button>
        </div>
      </div>

      {oppskrift.beskrivelse && (
        <p className="text-gray-500 mb-4">{oppskrift.beskrivelse}</p>
      )}

      <div className="flex gap-4 text-sm text-gray-400 mb-8">
        <span>🍽 {oppskrift.porsjoner} porsjoner</span>
        <span>⏱ {oppskrift.tilberedningstidMinutter} min</span>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Ingredienser</h2>
        <ul className="space-y-1">
          {ingrediensLinjer.map((linje, i) => (
            <li key={i} className="flex gap-2 text-gray-700 text-sm">
              <span className="text-blue-400">•</span> {linje}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Fremgangsmåte</h2>
        <ol className="space-y-3">
          {stegLinjer.map((steg, i) => (
            <li key={i} className="flex gap-3 text-gray-700 text-sm">
              <span className="text-blue-600 font-semibold min-w-[1.5rem]">{i + 1}.</span>
              <span>{steg}</span>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
