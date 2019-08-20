using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DemoMarketShopSprinta.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DemoMarketShopSprinta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signinManager;

        public ApplicationUserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signinManager )
        {
            _userManager = userManager;
            _signinManager = signinManager;
        }

    }
}