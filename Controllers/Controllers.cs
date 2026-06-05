using Microsoft.AspNetCore.Mvc;

namespace RecipeApi.Controllers;

// Controller for oppskrifter – håndterer alle HTTP-forespørsler mot /api/oppskrifter.
// Klassenavnet OppskrifterController gir automatisk ruten "oppskrifter".
[ApiController]
[Route("api/[controller]")]
public class OppskrifterController(IRecipeService recipeService) : ControllerBase
{
    private readonly IRecipeService _recipeService = recipeService;

    // GET api/oppskrifter – henter alle oppskrifter
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var oppskrifter = await _recipeService.GetAllAsync();
        return Ok(oppskrifter); // 200 OK
    }

    // GET api/oppskrifter/{id} – henter én oppskrift
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var oppskrift = await _recipeService.GetByIdAsync(id);
        if (oppskrift is null) return NotFound();
        return Ok(oppskrift);
    }

    // POST api/oppskrifter – oppretter en ny oppskrift
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] OpprettOppskriftRequest request)
    {
        var oppskrift = await _recipeService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = oppskrift.Id }, oppskrift);
    }

    // PUT api/oppskrifter/{id} – oppdaterer en eksisterende oppskrift
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] OppdaterOppskriftRequest request)
    {
        var oppskrift = await _recipeService.UpdateAsync(id, request);
        if (oppskrift is null) return NotFound();
        return Ok(oppskrift);
    }

    // DELETE api/oppskrifter/{id} – sletter en oppskrift
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _recipeService.DeleteAsync(id);
        if (!deleted) return NotFound();
        return NoContent(); // 204 No Content
    }
}
