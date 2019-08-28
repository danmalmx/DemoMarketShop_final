using Microsoft.EntityFrameworkCore.Migrations;

namespace DemoMarketShopSprinta.Migrations
{
    public partial class AddedShopCartTable3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "ShoppingCarts",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ProductId",
                table: "ShoppingCarts",
                nullable: true,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
