using LumiLearn.Data;
using LumiLearn.Dtos.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace LumiLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly LumiLearnDbContext dbContext;

        public UsersController(LumiLearnDbContext lumiLearnDbContext)
        {
            dbContext = lumiLearnDbContext;
        }

        [HttpGet("my-profile")]
        public async Task<ActionResult<UserDto>> GetMyProfile()
        {
            var username = User?.Identity?.Name;
                
            if(username == null)
            {
                return BadRequest("Sub (Username) is missing from JWT");
            }

            var user = await dbContext.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Username == username);

            if(user == null)
            {
                return NotFound("Your Profile is not exists");
            }

            return Ok(new UserDto
            {
                Id = user.Id,
                Role = user.Role.Name,
                Email = user.Email,
                Phone = user.Phone,
                Birthday = user.Birthday,
                Name = user.Name,
                Username = user.Username
            });
        }

        /*[HttpPatch("my-profile")]
        public async Task<IActionResult> UpdateProfile()*/
    }
}
