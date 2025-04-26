using LumiLearn.Data;
using LumiLearn.Domains;
using LumiLearn.Dtos.AnswerOption;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LumiLearn.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnswerOptionsController : ControllerBase
    {
        private readonly LumiLearnDbContext _context;

        public AnswerOptionsController(LumiLearnDbContext context)
        {
            _context = context;
        }

        // GET: api/answeroptions?questionId={id}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnswerOptionDto>>> GetAnswerOptionsByQuestionId([FromQuery] Guid questionId)
        {
            var options = await _context.AnswerOptions
                .AsNoTracking()
                .Where(a => a.QuestionId == questionId)
                .Select(a => new AnswerOptionDto
                {
                    Id = a.Id,
                    Content = a.Content,
                    IsCorrect = a.IsCorrect,
                    QuestionId = a.QuestionId
                })
                .ToListAsync();

            return Ok(options);
        }

        // GET: api/answeroptions/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AnswerOptionDto>> GetAnswerOptionById(Guid id)
        {
            var option = await _context.AnswerOptions
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == id);

            if (option == null)
                return NotFound();

            return Ok(new AnswerOptionDto
            {
                Id = option.Id,
                Content = option.Content,
                IsCorrect = option.IsCorrect,
                QuestionId = option.QuestionId
            });
        }

        // POST: api/answeroptions
        [HttpPost]
        public async Task<ActionResult<AnswerOptionDto>> CreateAnswerOption([FromBody] CreateAnswerOptionRequestDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Content))
                return BadRequest("Content is required.");

            if (!await _context.Questions.AnyAsync(q => q.Id == dto.QuestionId))
                return NotFound("Question not found.");

            var option = new AnswerOption
            {
                Id = Guid.NewGuid(),
                Content = dto.Content,
                IsCorrect = dto.IsCorrect,
                QuestionId = dto.QuestionId
            };

            _context.AnswerOptions.Add(option);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAnswerOptionById), new { id = option.Id }, dto);
        }

        // PUT: api/answeroptions/{id}
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateAnswerOption(Guid id, [FromBody] AnswerOptionDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Content))
                return BadRequest("Content is required.");

            var option = await _context.AnswerOptions.FirstOrDefaultAsync(a => a.Id == id);
            if (option == null)
                return NotFound();

            option.Content = dto.Content;
            option.IsCorrect = dto.IsCorrect;
            option.QuestionId = dto.QuestionId;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/answeroptions/{id}
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteAnswerOption(Guid id)
        {
            var option = await _context.AnswerOptions.FirstOrDefaultAsync(a => a.Id == id);
            if (option == null)
                return NotFound();

            _context.AnswerOptions.Remove(option);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
