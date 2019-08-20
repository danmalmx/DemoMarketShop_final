using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DemoMarketShopSprinta.Models
{
    public class ApplicationUserModel
    {
        [Column(TypeName = "nvarchar(50)")]
        public string UserName { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string FirstName { get; set; }
        [Column(TypeName = "nvarchar(30)")]
        public string LastName { get; set; }
        [Column(TypeName = "nvarchar(150)")]
        public string FullName { get; set; }
        [Column(TypeName = "nvarchar(40)")]
        public string Email { get; set; }
        [Column(TypeName = "nvarchar(8)")]
        public string Password { get; set; }
    }
}
