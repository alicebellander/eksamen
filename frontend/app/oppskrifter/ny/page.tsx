"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import OppskriftSkjema from "@/components/OppskriftSkjema";
import { opprettOppskrift, OppskriftInput } from "@/lib/api";

export default function NyOppskrift() {
  const router = useRouter();

  async function handleSubmit(data: OppskriftInput) {
    const oppskrift = await opprettOppskrift(data);
    router.push(`/oppskrifter/${oppskrift.id}`);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link href="/" className="back-link mb-6 block">
        ← Tilbake til alle oppskrifter
      </Link>
      <h1 className="text-2xl mb-8" style={{ color: "var(--text)" }}>
        Ny oppskrift
      </h1>
      <OppskriftSkjema onSubmit={handleSubmit} submitTekst="Lagre oppskrift" />
    </div>
  );
}
