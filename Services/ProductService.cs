using Microsoft.EntityFrameworkCore;
using RecipeApi.Data;

namespace RecipeApi.Services;

// Databaseimplementasjon av IRecipeService med EF Core mot PostgreSQL.
public class RecipeService(AppDbContext db) : IRecipeService
{
    public async Task<IEnumerable<OppskriftResponse>> GetAllAsync() =>
        await db.Recipes.Select(r => MapToResponse(r)).ToListAsync();

    public async Task<OppskriftResponse?> GetByIdAsync(int id)
    {
        var recipe = await db.Recipes.FindAsync(id);
        return recipe is not null ? MapToResponse(recipe) : null;
    }

    public async Task<OppskriftResponse> CreateAsync(OpprettOppskriftRequest request)
    {
        var recipe = new Recipe
        {
            Tittel = request.Tittel,
            Beskrivelse = request.Beskrivelse,
            Ingredienser = request.Ingredienser,
            Fremgangsmaate = request.Fremgangsmaate,
            Porsjoner = request.Porsjoner,
            TilberedningstidMinutter = request.TilberedningstidMinutter,
            OpprettetDato = DateTime.UtcNow
        };
        db.Recipes.Add(recipe);
        await db.SaveChangesAsync();
        return MapToResponse(recipe);
    }

    public async Task<OppskriftResponse?> UpdateAsync(int id, OppdaterOppskriftRequest request)
    {
        var recipe = await db.Recipes.FindAsync(id);
        if (recipe is null) return null;

        recipe.Tittel = request.Tittel;
        recipe.Beskrivelse = request.Beskrivelse;
        recipe.Ingredienser = request.Ingredienser;
        recipe.Fremgangsmaate = request.Fremgangsmaate;
        recipe.Porsjoner = request.Porsjoner;
        recipe.TilberedningstidMinutter = request.TilberedningstidMinutter;
        recipe.OppdatertDato = DateTime.UtcNow;

        await db.SaveChangesAsync();
        return MapToResponse(recipe);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var recipe = await db.Recipes.FindAsync(id);
        if (recipe is null) return false;
        db.Recipes.Remove(recipe);
        await db.SaveChangesAsync();
        return true;
    }

    private static OppskriftResponse MapToResponse(Recipe r) => new(
        r.Id,
        r.Tittel,
        r.Beskrivelse,
        r.Ingredienser,
        r.Fremgangsmaate,
        r.Porsjoner,
        r.TilberedningstidMinutter,
        r.OpprettetDato,
        r.OppdatertDato
    );
}
