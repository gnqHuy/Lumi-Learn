using LumiLearn.Data;
using LumiLearn.Domains;
using LumiLearn.Dtos.SearchHistory;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LumiLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SearchHistoriesController : ControllerBase
    {
        private readonly LumiLearnDbContext dbContext;

        public SearchHistoriesController(LumiLearnDbContext lumiLearnDbContext)
        {
            dbContext = lumiLearnDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetMySearchHistories()
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var searchHistories = await dbContext.SearchHistories
                .Where(sh => sh.UserId == userId)
                .OrderByDescending(sh => sh.SearchedAt)
                .Select(sh => new SearchHistoryDto
                {
                    Content = sh.Content,
                    SearchedAt = sh.SearchedAt,
                })
                .ToListAsync();

            return Ok(searchHistories);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteMySearchHistory(string content)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var searchHistory = await dbContext.SearchHistories
                .FirstOrDefaultAsync(sh => sh.UserId == userId && sh.Content == content);

            if(searchHistory == null)
            {
                return BadRequest();
            }

            dbContext.SearchHistories.Remove(searchHistory);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("all")]
        public async Task<IActionResult> DeleteAllMySearchHistories()
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var searchHistories = dbContext.SearchHistories.Where(sh => sh.UserId == userId);

            dbContext.SearchHistories.RemoveRange(searchHistories);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
