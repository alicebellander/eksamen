using Microsoft.EntityFrameworkCore;
using RecipeApi.Models;

namespace RecipeApi.Data;

// DbContext er broen mellom C#-modellene og PostgreSQL-databasen.
// EF Core bruker denne klassen til å generere SQL og håndtere tilkoblingen.
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    // DbSet representerer tabellen "Recipes" i databasen.
    // EF Core bruker modellnavnet (Recipe) til å sette tabellnavnet automatisk.
    public DbSet<Recipe> Recipes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Setter eksplisitt tabellnavn til "recipes" (lowercase er PostgreSQL-konvensjon)
        modelBuilder.Entity<Recipe>().ToTable("recipes");

        // Sørger for at CreatedAt alltid settes til gjeldende tid i UTC av databasen
        modelBuilder.Entity<Recipe>()
            .Property(r => r.OpprettetDato)
            .HasDefaultValueSql("NOW()");
    }
}
