namespace RecipeApi.Services;

// Interface som definerer kontrakten for Oppskrift-servicen.
public interface IRecipeService
{
    Task<IEnumerable<OppskriftResponse>> GetAllAsync();
    Task<OppskriftResponse?> GetByIdAsync(int id);
    Task<OppskriftResponse> CreateAsync(OpprettOppskriftRequest request);
    Task<OppskriftResponse?> UpdateAsync(int id, OppdaterOppskriftRequest request);
    Task<bool> DeleteAsync(int id);
}
