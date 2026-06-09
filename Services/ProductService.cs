namespace RecipeApi.Services;

// RecipeService inneholder all forretningslogikken for oppskrifter.
// AppDbContext injiseres via konstruktøren og gir tilgang til databasen gjennom EF Core.
public class RecipeService(AppDbContext db) : IRecipeService
{
    // Henter alle oppskrifter fra databasen og konverterer dem til RecipeResponse-objekter.
    // Select brukes til å mappe hver Recipe-rad til et response-objekt.
    public async Task<IEnumerable<RecipeResponse>> GetAllAsync() =>
        await db.Recipes.Select(r => MapToResponse(r)).ToListAsync();

    // Henter én oppskrift med FindAsync (søker på primærnøkkelen).
    // Returnerer null hvis ingen oppskrift med den ID-en finnes.
    public async Task<RecipeResponse?> GetByIdAsync(int id)
    {
        var recipe = await db.Recipes.FindAsync(id);
        return recipe is not null ? MapToResponse(recipe) : null;
    }

    // Oppretter et nytt Recipe-objekt fra forespørselsdataene og lagrer det i databasen.
    // CreatedAt settes til nåværende UTC-tid for å registrere opprettelsestidspunktet.
    public async Task<RecipeResponse> CreateAsync(CreateRecipeRequest request)
    {
        var recipe = new Recipe
        {
            Title = request.Title,
            Description = request.Description,
            Ingredients = request.Ingredients,
            Instructions = request.Instructions,
            Portions = request.Portions,
            CookingTimeMinutes = request.CookingTimeMinutes,
            CreatedAt = DateTime.UtcNow
        };
        db.Recipes.Add(recipe);
        // SaveChangesAsync sender INSERT-spørringen til databasen og populerer Id-feltet.
        await db.SaveChangesAsync();
        return MapToResponse(recipe);
    }

    // Finner oppskriften i databasen og oppdaterer alle feltene med nye verdier.
    // UpdatedAt settes til nåværende tid for å loggføre når endringen skjedde.
    public async Task<RecipeResponse?> UpdateAsync(int id, UpdateRecipeRequest request)
    {
        var recipe = await db.Recipes.FindAsync(id);
        if (recipe is null) return null;

        recipe.Title = request.Title;
        recipe.Description = request.Description;
        recipe.Ingredients = request.Ingredients;
        recipe.Instructions = request.Instructions;
        recipe.Portions = request.Portions;
        recipe.CookingTimeMinutes = request.CookingTimeMinutes;
        recipe.UpdatedAt = DateTime.UtcNow;

        // SaveChangesAsync sender UPDATE-spørringen til databasen.
        await db.SaveChangesAsync();
        return MapToResponse(recipe);
    }

    // Finner og sletter oppskriften fra databasen.
    // Returnerer false hvis oppskriften ikke finnes, true hvis slettingen lyktes.
    public async Task<bool> DeleteAsync(int id)
    {
        var recipe = await db.Recipes.FindAsync(id);
        if (recipe is null) return false;
        db.Recipes.Remove(recipe);
        // SaveChangesAsync sender DELETE-spørringen til databasen.
        await db.SaveChangesAsync();
        return true;
    }

    // Hjelpemetode som konverterer en Recipe-modell til et RecipeResponse-objekt.
    // Dette skiller databasemodellen fra det vi eksponerer i API-et (se DTO.cs).
    private static RecipeResponse MapToResponse(Recipe r) => new(
        r.ID,
        r.Title,
        r.Description,
        r.Ingredients,
        r.Instructions,
        r.Portions,
        r.CookingTimeMinutes,
        r.CreatedAt,
        r.UpdatedAt
    );
}
