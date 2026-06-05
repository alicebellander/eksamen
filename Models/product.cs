using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeApi.Models;

// Domenemodellen for en oppskrift.
// [Column] beholder de eksisterende kolonnenavnene i databasen mens vi bruker norske C#-navn.
public class Recipe
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [Required, MaxLength(100)]
    [Column("Title")]
    public string Tittel { get; set; } = string.Empty;

    [Required, MaxLength(500)]
    [Column("Description")]
    public string Beskrivelse { get; set; } = string.Empty;

    [Required]
    [Column("Ingredients")]
    public string Ingredienser { get; set; } = string.Empty;

    [Required]
    [Column("Instructions")]
    public string Fremgangsmaate { get; set; } = string.Empty;

    // Nye kolonner – legges til i neste migrasjon
    public int Porsjoner { get; set; }

    public int TilberedningstidMinutter { get; set; }

    [Column("CreatedAt")]
    public DateTime OpprettetDato { get; set; } = DateTime.UtcNow;

    [Column("UpdatedAt")]
    public DateTime? OppdatertDato { get; set; }
}
