using System.ComponentModel.DataAnnotations;

namespace RecipeApi.DTO;

// DTO for å opprette en ny oppskrift – feltnavnene matcher frontend-grensesnittet.
public record OpprettOppskriftRequest(
    [Required, StringLength(100)] string Tittel,
    [Required] string Beskrivelse,
    [Required] string Ingredienser,
    [Required] string Fremgangsmaate,
    int Porsjoner,
    int TilberedningstidMinutter
);

// DTO for å oppdatere en eksisterende oppskrift.
public record OppdaterOppskriftRequest(
    [Required, StringLength(100)] string Tittel,
    [Required] string Beskrivelse,
    [Required] string Ingredienser,
    [Required] string Fremgangsmaate,
    int Porsjoner,
    int TilberedningstidMinutter
);

// DTO for svar til klienten – camelCase serialiseres automatisk av ASP.NET Core
// slik at f.eks. Tittel → "tittel" i JSON, som matcher TypeScript-grensesnittet i frontend.
public record OppskriftResponse(
    int Id,
    string Tittel,
    string Beskrivelse,
    string Ingredienser,
    string Fremgangsmaate,
    int Porsjoner,
    int TilberedningstidMinutter,
    DateTime OpprettetDato,
    DateTime? OppdatertDato
);
