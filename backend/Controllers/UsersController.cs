using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            try {
                var existing = await _userService.GetUserByAuth0Id(user.Auth0Id);
                if (existing == null) {
                    await _userService.CreateUserAsync(user);
                } 

                return Ok();
            }
            catch(Exception e) {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            try
            {
                return Ok(await _userService.GetUserByEmail(email));
            } catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
