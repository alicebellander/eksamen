const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export interface Oppskrift {
  id: number;
  tittel: string;
  beskrivelse: string;
  ingredienser: string;
  fremgangsmaate: string;
  porsjoner: number;
  tilberedningstidMinutter: number;
}

export type OppskriftInput = Omit<Oppskrift, "id">;

export async function hentAlleOppskrifter(): Promise<Oppskrift[]> {
  const res = await fetch(`${BASE_URL}/oppskrifter`);
  if (!res.ok) throw new Error("Kunne ikke hente oppskrifter");
  return res.json();
}

export async function hentOppskrift(id: number): Promise<Oppskrift> {
  const res = await fetch(`${BASE_URL}/oppskrifter/${id}`);
  if (!res.ok) throw new Error("Kunne ikke hente oppskrift");
  return res.json();
}

export async function opprettOppskrift(data: OppskriftInput): Promise<Oppskrift> {
  const res = await fetch(`${BASE_URL}/oppskrifter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Kunne ikke opprette oppskrift");
  return res.json();
}

export async function oppdaterOppskrift(id: number, data: OppskriftInput): Promise<Oppskrift> {
  const res = await fetch(`${BASE_URL}/oppskrifter/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Kunne ikke oppdatere oppskrift");
  return res.json();
}

export async function slettOppskrift(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/oppskrifter/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Kunne ikke slette oppskrift");
}
