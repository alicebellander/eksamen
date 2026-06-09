

namespace RecipeApi.Data;

// AppDbContext er broen mellom C#-modellene og PostgreSQL-databasen.
// EF Core bruker denne klassen til å generere SQL og håndtere databasetilkoblingen.
// DbContextOptions sendes inn via dependency injection fra Program.cs.
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    // DbSet<Recipe> representerer "recipes"-tabellen i databasen.
    // Vi kan spørre, legge til, oppdatere og slette rader via denne egenskapen.
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<User> Users { get; set; }

    // OnModelCreating kjøres én gang ved oppstart og konfigurerer tabellstrukturen.
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Recipe>().ToTable("recipes");
        modelBuilder.Entity<Recipe>()
            .Property(r => r.CreatedAt)
            .HasDefaultValueSql("NOW()");

        modelBuilder.Entity<User>().ToTable("users");
        modelBuilder.Entity<User>()
            .HasIndex(u => u.GoogleId)
            .IsUnique();
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
        modelBuilder.Entity<User>()
            .Property(u => u.CreatedAt)
            .HasDefaultValueSql("NOW()");
    }
}
