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
            var existing = await _userService.GetUserByAuth0Id(user.Auth0Id);
            if (existing != null) return Conflict("User already exists");

            Console.WriteLine(existing);

            var createdUser = await _userService.CreateUserAsync(user);
            Console.WriteLine(createdUser);

            return Ok(createdUser);
        }
    }
}
