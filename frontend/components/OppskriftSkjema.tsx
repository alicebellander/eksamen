"use client";

import { useId, useState } from "react";
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

  // useId gir unike ID-er for label–input-kobling (WCAG 1.3.1, 4.1.2)
  const uid = useId();
  const id = (felt: string) => `${uid}-${felt}`;

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
      setFeil(err instanceof Error ? err.message : "Noe gikk galt. Prøv igjen.");
    } finally {
      setLaster(false);
    }
  }

  // Stjerne + skjult tekst markerer obligatoriske felt (WCAG 3.3.2)
  const Obligatorisk = () => (
    <>
      <span aria-hidden="true" style={{ color: "var(--red)", marginLeft: "0.2rem" }}>*</span>
      <span className="sr-only">(obligatorisk)</span>
    </>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

      {/* role="alert" sørger for at skjermlesere annonserer feil (WCAG 4.1.3) */}
      {feil && (
        <div className="alert-error" role="alert" aria-live="assertive">
          <span className="font-bold">Feil: </span>{feil}
        </div>
      )}

      {/* Forklaring på obligatoriske felt */}
      <p className="text-sm" style={{ color: "var(--text-muted)" }} aria-hidden="true">
        Felt merket med <span style={{ color: "var(--red)" }}>*</span> er obligatoriske.
      </p>

      <div>
        <label htmlFor={id("tittel")} className="form-label">
          Tittel<Obligatorisk />
        </label>
        <input
          id={id("tittel")}
          type="text"
          required
          autoComplete="off"
          value={form.tittel}
          onChange={(e) => oppdater("tittel", e.target.value)}
          className="form-input"
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor={id("beskrivelse")} className="form-label">
          Kort beskrivelse
        </label>
        <input
          id={id("beskrivelse")}
          type="text"
          value={form.beskrivelse}
          onChange={(e) => oppdater("beskrivelse", e.target.value)}
          className="form-input"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={id("porsjoner")} className="form-label">
            Porsjoner<Obligatorisk />
          </label>
          <input
            id={id("porsjoner")}
            type="number"
            min={1}
            required
            value={form.porsjoner}
            onChange={(e) => oppdater("porsjoner", Number(e.target.value))}
            className="form-input"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor={id("tid")} className="form-label">
            Tid (minutter)<Obligatorisk />
          </label>
          <input
            id={id("tid")}
            type="number"
            min={1}
            required
            value={form.tilberedningstidMinutter}
            onChange={(e) => oppdater("tilberedningstidMinutter", Number(e.target.value))}
            className="form-input"
            aria-required="true"
          />
        </div>
      </div>

      <div>
        <label htmlFor={id("ingredienser")} className="form-label">
          Ingredienser<Obligatorisk />
        </label>
        <textarea
          id={id("ingredienser")}
          required
          rows={5}
          value={form.ingredienser}
          onChange={(e) => oppdater("ingredienser", e.target.value)}
          placeholder={"Én ingrediens per linje, f.eks:\n2 egg\n1 dl melk"}
          className="form-textarea"
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor={id("fremgangsmaate")} className="form-label">
          Fremgangsmåte<Obligatorisk />
        </label>
        <textarea
          id={id("fremgangsmaate")}
          required
          rows={7}
          value={form.fremgangsmaate}
          onChange={(e) => oppdater("fremgangsmaate", e.target.value)}
          placeholder="Beskriv steg for steg…"
          className="form-textarea"
          aria-required="true"
        />
      </div>

      <button
        type="submit"
        disabled={laster}
        className="btn btn-primary w-full"
        aria-disabled={laster}
      >
        {laster ? "Lagrer…" : submitTekst}
      </button>
    </form>
  );
}
