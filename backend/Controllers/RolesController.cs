using LumiLearn.Data;
using LumiLearn.Domains;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LumiLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize]
    public class RolesController : ControllerBase
    {
        private readonly LumiLearnDbContext dbContext;
        public RolesController(LumiLearnDbContext lumiLearnDbContext)
        {
            dbContext = lumiLearnDbContext;
        }

        [HttpGet]
        // [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> GetAllRoles()
        {
            var roles = await dbContext.Roles.Include(r => r.Users).ToListAsync();

            return Ok(roles);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<Role>> GetRoleById(Guid id)
        {
            var role = await dbContext.Roles.FindAsync(id);
            if (role == null)
            {
                return NotFound();
            }

            return Ok(role);
        }

        [HttpPost]
        public async Task<ActionResult<Role>> CreateRole(string name)
        {
            if(name == null)
            {
                return BadRequest("Missing Name of Role");
            }

            var existingRole = await dbContext.Roles.FirstOrDefaultAsync(r => r.Name == name);

            if (existingRole != null)
            {
                return Conflict("Role already exists");
            }

            var role = new Role
            {
                Id = Guid.NewGuid(),
                Name = name,
            };

            await dbContext.Roles.AddAsync(role);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRoleById), new { id = role.Id }, role);
        }
    }
}
