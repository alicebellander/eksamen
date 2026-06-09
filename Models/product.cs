using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeApi.Models;

public class Recipe
{
    public int ID { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public string Ingredients { get; set; }
    public string Instructions { get; set; }
    [Column("TilberedningstidMinutter")]
    public int CookingTimeMinutes { get; set; }
    [Column("Porsjoner")]
    public int Portions { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

}

public class User
{
    public Guid Id { get; set; }
    public string GoogleId { get; set; }
    public string Email { get; set; }
    public string? Name { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}