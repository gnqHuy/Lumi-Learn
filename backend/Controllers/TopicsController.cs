using LumiLearn.Data;
using LumiLearn.Domains;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LumiLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicsController : ControllerBase
    {
        private readonly LumiLearnDbContext dbContext;

        public TopicsController(LumiLearnDbContext lumiLearnDbContext)
        {
            dbContext = lumiLearnDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTopic()
        {
            var topics = await dbContext.Topics.ToListAsync();

            return Ok(topics);
        }

        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> GetTopicById(Guid id)
        {
            var topic = await dbContext.Topics.FirstOrDefaultAsync(t => t.Id == id);

            return Ok(topic);
        }

        [HttpPost]
        public async Task<ActionResult<Topic>> CreateTopic(string name)
        {
            if(name == null)
            {
                return BadRequest("Missing topic name");
            }

            var existTopic = await dbContext.Topics.FirstOrDefaultAsync(t => t.Name == name);

            if(existTopic != null)
            {
                return Conflict("Topic is already exist");
            }

            var topic = new Topic
            {
                Id = Guid.NewGuid(),
                Name = name
            };

            await dbContext.Topics.AddAsync(topic);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTopicById), new { id = topic.Id }, topic);
        }
    }
}
