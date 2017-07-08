using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class _1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "releaseDate",
                table: "Product");

            migrationBuilder.RenameColumn(
                name: "starRating",
                table: "Product",
                newName: "StarRating");

            migrationBuilder.RenameColumn(
                name: "productName",
                table: "Product",
                newName: "ProductName");

            migrationBuilder.RenameColumn(
                name: "price",
                table: "Product",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "imageUrl",
                table: "Product",
                newName: "ImageUrl");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Product",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "productCode",
                table: "Product",
                newName: "AmountLeft");

            migrationBuilder.CreateTable(
                name: "UserProducts",
                columns: table => new
                {
                    ProductId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    Amount = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProducts", x => new { x.ProductId, x.UserId });
                    table.ForeignKey(
                        name: "FK_UserProducts_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserProducts_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserProducts_UserId",
                table: "UserProducts",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserProducts");

            migrationBuilder.RenameColumn(
                name: "StarRating",
                table: "Product",
                newName: "starRating");

            migrationBuilder.RenameColumn(
                name: "ProductName",
                table: "Product",
                newName: "productName");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Product",
                newName: "price");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Product",
                newName: "imageUrl");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Product",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "AmountLeft",
                table: "Product",
                newName: "productCode");

            migrationBuilder.AddColumn<DateTime>(
                name: "releaseDate",
                table: "Product",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
