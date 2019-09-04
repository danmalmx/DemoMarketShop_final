﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DemoMarketShopSprinta.Models
{
    public class ShoppingCart
    {
        [Key]
        public int Id { get; set; }
        public int? ShoppingCartId { get; set; }
        public string ProductName { get; set; }
        public int ProductPrice { get; set; }
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }
    }
}
