"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { hentAlleOppskrifter, Oppskrift } from "@/lib/api";
import OppskriftKort from "@/components/OppskriftKort";

export default function Hjem() {
  const [oppskrifter, setOppskrifter] = useState<Oppskrift[]>([]);
  const [laster, setLaster] = useState(true);
  const [feil, setFeil] = useState<string | null>(null);

  useEffect(() => {
    hentAlleOppskrifter()
      .then(setOppskrifter)
      .catch(() => setFeil("Kunne ikke koble til API. Er C#-backenden oppe?"))
      .finally(() => setLaster(false));
  }, []);

  function handleSlettet(id: number) {
    setOppskrifter((prev) => prev.filter((o) => o.id !== id));
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Oppskrifter</h1>
          <p className="text-gray-500 mt-1">Alle dine oppskrifter på ett sted</p>
        </div>
        <Link
          href="/oppskrifter/ny"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
        >
          + Ny oppskrift
        </Link>
      </div>

      {laster && <p className="text-gray-400">Laster...</p>}
      {feil && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-4">
          <p className="font-medium">Backend ikke tilgjengelig</p>
          <p className="text-sm mt-1">{feil}</p>
        </div>
      )}
      {!laster && !feil && oppskrifter.length === 0 && (
        <p className="text-gray-400">Ingen oppskrifter ennå. Legg til en!</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {oppskrifter.map((o) => (
          <OppskriftKort key={o.id} oppskrift={o} onSlettet={handleSlettet} />
        ))}
      </div>
    </main>
  );
}
