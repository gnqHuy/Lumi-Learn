using BCrypt.Net;
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

        [HttpPatch("my-profile")]
        public async Task<IActionResult> UpdateProfile(UpdateProfileRequest request)
        {
            if(request.Email == null && request.Phone == null && request.Birthday == null && request.Name == null)
            {
                return BadRequest("Request require at least one prop");
            }

            var username = User?.Identity?.Name;
            var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Username == username);

            if(user == null)
            {
                return NotFound(); // Maybe never happen bacause authorize required ?
            }

            if(request.Email != null && request.Email != user.Email) // Should handle at frontend
            {
                user.Email = request.Email;
            }

            if (request.Phone != null && request.Phone != user.Phone) // Should handle at frontend
            {
                user.Phone = request.Phone;
            }

            if (request.Birthday != null && request.Birthday != user.Birthday) // Should handle at frontend
            {
                user.Birthday = request.Birthday;
            }

            if (request.Name != null && request.Name != user.Name) // Should handle at frontend
            {
                user.Name = request.Name;
            }

            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordRequest request)
        {
            if (request.CurrentPassword == null || request.NewPassword == null)
            {
                return BadRequest("Missing field(s) to change password!");
            }

            if (request.CurrentPassword == request.NewPassword)
            {
                return BadRequest("New Password must be different with Current Password");
            }

            var username = User?.Identity?.Name;
            var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return NotFound();
            }

            if (!BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.PasswordHash))
            {
                return BadRequest("Current Password is Wrong!");
            }


            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
