using Microsoft.EntityFrameworkCore.Migrations;

namespace DemoMarketShopSprinta.Migrations
{
    public partial class AddedProductToShoppingCart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProductName",
                table: "ShoppingCarts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductName",
                table: "ShoppingCarts");
        }
    }
}
