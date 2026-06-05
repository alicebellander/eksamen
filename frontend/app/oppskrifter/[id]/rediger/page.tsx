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

  if (!oppskrift) {
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
        Rediger: {oppskrift.tittel}
      </h1>
      <OppskriftSkjema
        initialVerdier={oppskrift}
        onSubmit={handleSubmit}
        submitTekst="Lagre endringer"
      />
    </div>
  );
}
