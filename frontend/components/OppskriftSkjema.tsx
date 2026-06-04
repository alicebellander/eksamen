"use client";

import { useState } from "react";
import { OppskriftInput, Oppskrift } from "@/lib/api";

interface Props {
  initialVerdier?: Oppskrift;
  onSubmit: (data: OppskriftInput) => Promise<void>;
  submitTekst: string;
}

const tomSkjema: OppskriftInput = {
  tittel: "",
  beskrivelse: "",
  ingredienser: "",
  fremgangsmaate: "",
  porsjoner: 2,
  tilberedningstidMinutter: 30,
};

export default function OppskriftSkjema({ initialVerdier, onSubmit, submitTekst }: Props) {
  const [form, setForm] = useState<OppskriftInput>(initialVerdier ?? tomSkjema);
  const [laster, setLaster] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  function oppdater(felt: keyof OppskriftInput, verdi: string | number) {
    setForm((prev) => ({ ...prev, [felt]: verdi }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLaster(true);
    setFeil(null);
    try {
      await onSubmit(form);
    } catch (err) {
      setFeil(err instanceof Error ? err.message : "Noe gikk galt");
    } finally {
      setLaster(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {feil && <p className="text-red-600 bg-red-50 p-3 rounded-lg">{feil}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tittel</label>
        <input
          type="text"
          required
          value={form.tittel}
          onChange={(e) => oppdater("tittel", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kort beskrivelse</label>
        <input
          type="text"
          value={form.beskrivelse}
          onChange={(e) => oppdater("beskrivelse", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Porsjoner</label>
          <input
            type="number"
            min={1}
            required
            value={form.porsjoner}
            onChange={(e) => oppdater("porsjoner", Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tilberedningstid (min)</label>
          <input
            type="number"
            min={1}
            required
            value={form.tilberedningstidMinutter}
            onChange={(e) => oppdater("tilberedningstidMinutter", Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ingredienser</label>
        <textarea
          required
          rows={5}
          value={form.ingredienser}
          onChange={(e) => oppdater("ingredienser", e.target.value)}
          placeholder="Én ingrediens per linje, f.eks:&#10;2 egg&#10;1 dl melk"
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Fremgangsmåte</label>
        <textarea
          required
          rows={7}
          value={form.fremgangsmaate}
          onChange={(e) => oppdater("fremgangsmaate", e.target.value)}
          placeholder="Beskriv steg for steg..."
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        disabled={laster}
        className="bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {laster ? "Lagrer..." : submitTekst}
      </button>
    </form>
  );
}
