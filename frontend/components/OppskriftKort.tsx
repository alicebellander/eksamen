"use client";

import Link from "next/link";
import { Oppskrift, slettOppskrift } from "@/lib/api";

interface Props {
  oppskrift: Oppskrift;
  onSlettet: (id: number) => void;
}

export default function OppskriftKort({ oppskrift, onSlettet }: Props) {
  async function handleSlett() {
    if (!confirm(`Slett "${oppskrift.tittel}"?`)) return;
    await slettOppskrift(oppskrift.id);
    onSlettet(oppskrift.id);
  }

  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm flex flex-col gap-2">
      <h2 className="text-xl font-semibold text-gray-800">{oppskrift.tittel}</h2>
      <p className="text-gray-500 text-sm line-clamp-2">{oppskrift.beskrivelse}</p>
      <div className="flex gap-3 text-sm text-gray-400 mt-1">
        <span>🍽 {oppskrift.porsjoner} porsjoner</span>
        <span>⏱ {oppskrift.tilberedningstidMinutter} min</span>
      </div>
      <div className="flex gap-2 mt-3">
        <Link
          href={`/oppskrifter/${oppskrift.id}`}
          className="flex-1 text-center py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium"
        >
          Se oppskrift
        </Link>
        <Link
          href={`/oppskrifter/${oppskrift.id}/rediger`}
          className="flex-1 text-center py-1.5 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 text-sm font-medium"
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
  );
}
