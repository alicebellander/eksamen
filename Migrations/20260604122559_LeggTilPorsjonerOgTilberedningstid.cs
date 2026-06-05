using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeApi.Migrations
{
    /// <inheritdoc />
    public partial class LeggTilPorsjonerOgTilberedningstid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DifficultyLevel",
                table: "recipes");

            migrationBuilder.AddColumn<int>(
                name: "Porsjoner",
                table: "recipes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TilberedningstidMinutter",
                table: "recipes",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Porsjoner",
                table: "recipes");

            migrationBuilder.DropColumn(
                name: "TilberedningstidMinutter",
                table: "recipes");

            migrationBuilder.AddColumn<string>(
                name: "DifficultyLevel",
                table: "recipes",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
