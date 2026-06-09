namespace RecipeApi.Services;

// Interfacet definerer kontrakten for hva en RecipeService må kunne gjøre.
// Ved å bruke et interface kan vi bytte ut implementasjonen uten å endre kontrollerene,
// og det gjør det enklere å skrive tester med falske (mock) implementasjoner.
public interface IRecipeService
{
    // Henter alle oppskrifter som en liste av RecipeResponse-objekter.
    Task<IEnumerable<RecipeResponse>> GetAllAsync();

    // Henter én oppskrift basert på ID. Returnerer null hvis den ikke finnes.
    Task<RecipeResponse?> GetByIdAsync(int id);

    // Oppretter en ny oppskrift fra forespørselsdata og returnerer den lagrede oppskriften.
    Task<RecipeResponse> CreateAsync(CreateRecipeRequest request);

    // Oppdaterer en eksisterende oppskrift. Returnerer null hvis ID ikke finnes.
    Task<RecipeResponse?> UpdateAsync(int id, UpdateRecipeRequest request);

    // Sletter en oppskrift. Returnerer true ved vellykket sletting, false hvis den ikke finnes.
    Task<bool> DeleteAsync(int id);
}
