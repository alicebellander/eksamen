"use client";

import { useId, useState } from "react";
import { RecipeInput, Recipe } from "@/lib/api";

interface Props {
  initialVerdier?: Recipe;
  onSubmit: (data: RecipeInput) => Promise<void>;
  submitTekst: string;
}

const emptyForm: RecipeInput = {
  title: "",
  description: "",
  ingredients: "",
  instructions: "",
  portions: 2,
  cookingTimeMinutes: 30,
};

export default function OppskriftSkjema({ initialVerdier, onSubmit, submitTekst }: Props) {
  const [form, setForm] = useState<RecipeInput>(initialVerdier ?? emptyForm);
  const [laster, setLaster] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  // useId gir unike ID-er for label–input-kobling (WCAG 1.3.1, 4.1.2)
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;

  function update(field: keyof RecipeInput, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
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
        <label htmlFor={id("title")} className="form-label">
          Tittel<Obligatorisk />
        </label>
        <input
          id={id("title")}
          type="text"
          required
          autoComplete="off"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className="form-input"
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor={id("description")} className="form-label">
          Kort beskrivelse
        </label>
        <input
          id={id("description")}
          type="text"
          value={form.description ?? ""}
          onChange={(e) => update("description", e.target.value)}
          className="form-input"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={id("portions")} className="form-label">
            Porsjoner<Obligatorisk />
          </label>
          <input
            id={id("portions")}
            type="number"
            min={1}
            required
            value={form.portions}
            onChange={(e) => update("portions", Number(e.target.value))}
            className="form-input"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor={id("cookingTimeMinutes")} className="form-label">
            Tid (minutter)<Obligatorisk />
          </label>
          <input
            id={id("cookingTimeMinutes")}
            type="number"
            min={1}
            required
            value={form.cookingTimeMinutes}
            onChange={(e) => update("cookingTimeMinutes", Number(e.target.value))}
            className="form-input"
            aria-required="true"
          />
        </div>
      </div>

      <div>
        <label htmlFor={id("ingredients")} className="form-label">
          Ingredienser<Obligatorisk />
        </label>
        <textarea
          id={id("ingredients")}
          required
          rows={5}
          value={form.ingredients}
          onChange={(e) => update("ingredients", e.target.value)}
          placeholder={"Én ingrediens per linje, f.eks:\n2 egg\n1 dl melk"}
          className="form-textarea"
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor={id("instructions")} className="form-label">
          Fremgangsmåte<Obligatorisk />
        </label>
        <textarea
          id={id("instructions")}
          required
          rows={7}
          value={form.instructions}
          onChange={(e) => update("instructions", e.target.value)}
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
