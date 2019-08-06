using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoMarketShopSprinta.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public string ProductImage { get; set; }
        public double ProductPrice { get; set; }
        public int ProductQuantity { get; set; }

        public Category Category { get; set; }
        public int CategoryId { get; set; }

        public Order Order { get; set; }
        public int OrderId { get; set; }
    }
}
