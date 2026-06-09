

namespace RecipeApi.Controllers;

// [ApiController] aktiverer automatisk validering av request-body og bedre feilmeldinger.
// [Route("api/oppskrifter")] setter basis-URL for alle endepunktene i denne kontrolleren.
[ApiController]
[Route("api/oppskrifter")]
// Kontrolleren tar imot HTTP-forespørsler og delegerer logikken til RecipeService.
// IRecipeService injiseres automatisk av ASP.NET sitt dependency injection-system.
public class RecipesController(IRecipeService recipeService) : ControllerBase
{
    private readonly IRecipeService _recipeService = recipeService;

    // GET /api/oppskrifter
    // Henter alle oppskrifter fra databasen og returnerer dem som JSON med statuskode 200 OK.
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var recipes = await _recipeService.GetAllAsync();
        return Ok(recipes);
    }

    // GET /api/oppskrifter/{id}
    // Henter én spesifikk oppskrift basert på ID.
    // Returnerer 200 OK med oppskriften, eller 404 Not Found hvis den ikke finnes.
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var recipe = await _recipeService.GetByIdAsync(id);
        if (recipe is null) return NotFound();
        return Ok(recipe);
    }

    // POST /api/oppskrifter
    // Oppretter en ny oppskrift fra JSON-kroppen i forespørselen.
    // [FromBody] henter og validerer dataene fra request-body.
    // Returnerer 201 Created med den nye oppskriften og en Location-header som peker til den.
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateRecipeRequest request)
    {
        var recipe = await _recipeService.CreateAsync(request);
        // CreatedAtAction genererer Location-headeren som peker til GET-endepunktet for den nye oppskriften.
        return CreatedAtAction(nameof(GetById), new { id = recipe.Id }, recipe);
    }

    // PUT /api/oppskrifter/{id}
    // Oppdaterer en eksisterende oppskrift med nye data fra request-body.
    // Returnerer 200 OK med oppdatert oppskrift, eller 404 Not Found hvis ID ikke finnes.
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateRecipeRequest request)
    {
        var recipe = await _recipeService.UpdateAsync(id, request);
        if (recipe is null) return NotFound();
        return Ok(recipe);
    }

    // DELETE /api/oppskrifter/{id}
    // Sletter en oppskrift med gitt ID.
    // Returnerer 204 No Content ved vellykket sletting, eller 404 Not Found hvis den ikke finnes.
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _recipeService.DeleteAsync(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}
