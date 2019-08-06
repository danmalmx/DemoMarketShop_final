using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoMarketShopSprinta.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public string OrderShipName { get; set; }

        public string OrderStreetAddress { get; set; }
        public string OrderCity { get; set; }
        public string OrderCountry { get; set; }
        public int OrderTrackingNumber { get; set; }

        public Customer Customer { get; set; }
        public int CustomerId { get; set; }

        public List<Product> Products { get; set; }
    }
}