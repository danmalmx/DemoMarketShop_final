using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DemoMarketShopSprinta.Migrations
{
    public partial class AddedShopCartTable2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "ShoppingCarts");

            migrationBuilder.RenameColumn(
                name: "ProductName",
                table: "ShoppingCarts",
                newName: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "ShoppingCarts",
                newName: "ProductName");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                table: "ShoppingCarts",
                nullable: true);
        }
    }
}
