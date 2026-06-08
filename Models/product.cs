using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeApi.Models;

// Domenemodellen for en oppskrift.
// [Column] beholder de eksisterende kolonnenavnene i databasen mens vi bruker norske C#-navn.
public class Recipe
{

    public int ID { get; set; }

    public string Title { get; set; } 

    public string Description { get; set; }

    public string Ingredients { get; set; } 

    public string Instructions { get; set; } 

    // Nye kolonner – legges til i neste migrasjon
    public int Porsjoner { get; set; }

    public int TilberedningstidMinutter { get; set; }

    [Column("CreatedAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("UpdatedAt")]
    public DateTime? UpdatedAt  { get; set; }
}
