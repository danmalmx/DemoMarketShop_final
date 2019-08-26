using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoMarketShopSprinta.Models
{
    public class DbInitializer
    {
        public static void Initialize(ShopContext context)
        {
            /////////////////////////////// Categories
            if (context.Categories.Any())
            {
                //return;   // DB has been seeded
            }
            else
            {
                // Nolla Primaty key
                context.Database.ExecuteSqlCommand("DBCC CHECKIDENT('dbo.Categories', RESEED, 1)");
                var categorys = new Category[]
                {
                new Category{ CategoryName = "Good-Food" },
                new Category{ CategoryName = "Rubber-Boots" },
                new Category{ CategoryName = "Design-Clothing" }
                };
                foreach (Category c in categorys)
                {
                    context.Categories.Add(c);
                }
                context.SaveChanges();
            }

            /////////////////////////////// Customers
            if (context.Customers.Any())
            {
                //return;   // DB has been seeded
            }
            else
            {
                // Nolla Primaty key
                context.Database.ExecuteSqlCommand("DBCC CHECKIDENT('dbo.Customers', RESEED, 1)");
                var customer = new Customer[]
                {
                new Customer{ CustomerFirstName = "Magnus", CustomerLastName = "Eriksson", CustomerStreetAddress = "Street qwerty",CustomerCity = "Gbg", CustomerPostCode = "123 45", CustomerEmail = "cust@cust.se", CustomerPhone = "031-123123", CustomerRegDate = DateTime.Parse("2013-09-01") },
                new Customer{ CustomerFirstName = "Lisa", CustomerLastName = "Andersson", CustomerStreetAddress = "Street qwerty",CustomerCity = "Gbg", CustomerPostCode = "123 45", CustomerEmail = "cust@cust.se", CustomerPhone = "031-123123", CustomerRegDate = DateTime.Parse("2013-09-01") },
                new Customer{ CustomerFirstName = "Daniel", CustomerLastName = "Malmgren", CustomerStreetAddress = "Street qwerty",CustomerCity = "Gbg", CustomerPostCode = "123 45", CustomerEmail = "cust@cust.se", CustomerPhone = "031-123123", CustomerRegDate = DateTime.Parse("2013-09-01") },
                new Customer{ CustomerFirstName = "Kurt", CustomerLastName = "Johansson", CustomerStreetAddress = "Street qwerty",CustomerCity = "Gbg", CustomerPostCode = "123 45", CustomerEmail = "cust@cust.se", CustomerPhone = "031-123123", CustomerRegDate = DateTime.Parse("2013-09-01") }
                };
                foreach (Customer c in customer)
                {
                    context.Customers.Add(c);
                }
                context.SaveChanges();
            }

            /////////////////////////////// Orders
            if (context.Orders.Any())
            {
                //return;   // DB has been seeded
            }
            else
            {
                // Nolla Primaty key
                context.Database.ExecuteSqlCommand("DBCC CHECKIDENT('dbo.Orders', RESEED, 1)");
                var order = new Order[]
                {
                new Order{ OrderShipName = "First Order", OrderStreetAddress = "Street qwe", OrderCity = "Göteborg", OrderCountry = "Sweden", OrderTrackingNumber = 123, CustomerId = 1 },
                new Order{ OrderShipName = "Second Order", OrderStreetAddress = "Street dfgs", OrderCity = "Stockholm", OrderCountry = "Sweden", OrderTrackingNumber = 231, CustomerId = 1 },
                new Order{ OrderShipName = "Third Order", OrderStreetAddress = "Street dfsa", OrderCity = "Malmö", OrderCountry = "Sweden", OrderTrackingNumber = 312, CustomerId = 1 },
                new Order{ OrderShipName = "Fourth Order", OrderStreetAddress = "Street ghjd", OrderCity = "Piteå", OrderCountry = "Sweden", OrderTrackingNumber = 132, CustomerId = 1 }
                };
                foreach (Order o in order)
                {
                    context.Orders.Add(o);
                }
                context.SaveChanges();
            }

            /////////////////////////////// Products
            if (context.Products.Any())
            {
                //return;   // DB has been seeded
            }
            else
            {
                // Nolla Primaty key
                context.Database.ExecuteSqlCommand("DBCC CHECKIDENT('dbo.Products', RESEED, 1)");
                var product = new Product[]
                {
                new Product{ ProductName = "Hamburgare", ProductDescription = "Otroligt god burgare", ProductImage = "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", ProductPrice = 42, ProductQuantity = 2, CategoryId = 1, OrderId = 1 },
                new Product{ ProductName = "KokosNöt", ProductDescription = "Flöt iland på västkusten i veckan", ProductImage = "https://images.pexels.com/photos/1030973/pexels-photo-1030973.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", ProductPrice = 18, ProductQuantity = 3, CategoryId = 1, OrderId = 2 },
                new Product{ ProductName = "Potatis", ProductDescription = "Rolig potatis i sin rätta miljö", ProductImage = "https://images.pexels.com/photos/111130/potatoes-ketchup-murder-blood-111130.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", ProductPrice = 12, ProductQuantity = 5, CategoryId = 1, OrderId = 3 },
                new Product{ ProductName = "Wrap", ProductDescription = "Mexikansk tortilla med nötkött", ProductImage = "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", ProductPrice = 39, ProductQuantity = 2, CategoryId = 1, OrderId = 4 }
                };
                foreach (Product p in product)
                {
                    context.Products.Add(p);
                }
                context.SaveChanges();
            }


        }

        //public static void Initialize2(AuthenticationContext context)
        //{
        //    context.Database.ExecuteSqlCommand("DBCC CHECKIDENT('dbo.AspNetRoles', RESEED, 1)");
        //    var RolesModel = new IdentityRole[]
        //    {
        //        new IdentityRole{ Name = "Admin", NormalizedName = "Admin"},
        //        new IdentityRole{ Name = "Customer", NormalizedName = "Customer"}
        //    };

        //    foreach (IdentityRole p in RolesModel)
        //    {
        //        context.Roles.Add(p);
        //    }
        //    context.SaveChanges();
        //}
    }
       
}

