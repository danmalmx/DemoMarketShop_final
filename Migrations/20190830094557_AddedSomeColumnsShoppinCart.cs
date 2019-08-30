using Microsoft.EntityFrameworkCore.Migrations;

namespace DemoMarketShopSprinta.Migrations
{
    public partial class AddedSomeColumnsShoppinCart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductPrice",
                table: "ShoppingCarts",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductPrice",
                table: "ShoppingCarts");
        }
    }
}
