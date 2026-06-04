"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { hentOppskrift, oppdaterOppskrift, Oppskrift, OppskriftInput } from "@/lib/api";
import OppskriftSkjema from "@/components/OppskriftSkjema";

export default function RedigerOppskrift() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [oppskrift, setOppskrift] = useState<Oppskrift | null>(null);

  useEffect(() => {
    hentOppskrift(Number(id)).then(setOppskrift);
  }, [id]);

  async function handleSubmit(data: OppskriftInput) {
    await oppdaterOppskrift(Number(id), data);
    router.push(`/oppskrifter/${id}`);
  }

  if (!oppskrift) return <p className="p-10 text-gray-400">Laster...</p>;

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link href={`/oppskrifter/${id}`} className="text-sm text-blue-600 hover:underline mb-6 block">
        ← Tilbake
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Rediger oppskrift</h1>
      <OppskriftSkjema
        initialVerdier={oppskrift}
        onSubmit={handleSubmit}
        submitTekst="Lagre endringer"
      />
    </main>
  );
}
