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
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link href="/" className="text-sm text-blue-600 hover:underline mb-6 block">
        ← Tilbake
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Ny oppskrift</h1>
      <OppskriftSkjema onSubmit={handleSubmit} submitTekst="Lagre oppskrift" />
    </main>
  );
}
