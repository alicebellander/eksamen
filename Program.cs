var builder = WebApplication.CreateBuilder(args);

// Registrerer kontrollerne slik at ASP.NET finner og ruter til dem automatisk.
builder.Services.AddControllers();

// Registrerer EF Core med PostgreSQL som databaseleverandør.
// Tilkoblingsstrengen hentes fra appsettings.json under "ConnectionStrings:DefaultConnection".
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registrerer RecipeService slik at den kan injiseres i kontrollere.
// Scoped betyr at én instans opprettes per HTTP-forespørsel.
builder.Services.AddScoped<IRecipeService, RecipeService>();

// Legger til CORS-støtte (styres nærmere nedenfor) og Swagger for API-dokumentasjon.
builder.Services.AddCors();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger er kun tilgjengelig i utviklingsmiljøet, ikke i produksjon.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Tillater forespørsler fra Next.js-frontenden som kjører på port 3000.
// AllowAnyHeader og AllowAnyMethod gjør det enklere under utvikling.
app.UseCors(policy => policy
    .WithOrigins("http://localhost:3000")
    .AllowAnyHeader()
    .AllowAnyMethod());

// Videresender HTTP-forespørsler til HTTPS automatisk.
app.UseHttpsRedirection();

// Kobler URL-ruter til kontrollerne som er registrert med [Route]-attributter.
app.MapControllers();

app.Run();
