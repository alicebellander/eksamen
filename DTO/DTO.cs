
using System.ComponentModel.DataAnnotations;

namespace RecipeApi.DTO;

public record CreateRecipeRequest(
    [Required,StringLength(100)] string Title,
    [StringLength(200)] string? Description,
    [Required] string Ingredients,
    [Required] string Instructions,
    [Required] int CookingTimeMinutes,
    [Required] int Portions
);
public record UpdateRecipeRequest(
    [Required,StringLength(100)] string Title,
    [StringLength(200)] string? Description,
    [Required] string Ingredients,
    [Required] string Instructions,
    [Required] int CookingTimeMinutes,
    [Required] int Portions
);

public record RecipeResponse(
    int Id,
    string Title,
    string? Description,
    string Ingredients,
    string Instructions,
    int Portions,
    int CookingTimeMinutes,
    DateTime CreatedAt,
    DateTime? UpdatedAt
);

