using LumiLearn.Data;
using LumiLearn.Domains;
using LumiLearn.Dtos.FlashcardSet;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LumiLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlashcardSetsController : ControllerBase
    {
        private readonly LumiLearnDbContext _context;

        public FlashcardSetsController(LumiLearnDbContext context)
        {
            _context = context;
        }

        // GET: api/FlashcardSets?lessonId=...
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlashcardSetDto>>> GetFlashcardSetsByLessonId([FromQuery] Guid lessonId)
        {
            var flashcardSets = await _context.FlashCardSets
                .AsNoTracking()
                .Where(f => f.LessonId == lessonId)
                .Select(f => new FlashCardSet
                {
                    Id = f.Id,
                    Title = f.Title,
                    LessonId = f.LessonId
                })
                .ToListAsync();

            return Ok(flashcardSets);
        }

        // POST: api/FlashcardSets
        [HttpPost]
        public async Task<ActionResult> CreateNewFlashcardSet([FromBody] FlashcardSetDto request)
        {
            var lessonExists = await _context.Lessons.AnyAsync(l => l.Id == request.LessonId);
            if (!lessonExists)
            {
                return BadRequest("Invalid Lesson ID");
            }

            var newSet = new FlashCardSet
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                LessonId = request.LessonId
            };

            _context.FlashCardSets.Add(newSet);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFlashcardSetsByLessonId), new { lessonId = newSet.LessonId }, request);
        }
        // PUT: api/FlashcardSets/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateFlashcardSet(Guid id, [FromBody] FlashcardSetDto request)
        {
            var flashcardSet = await _context.FlashCardSets.FindAsync(id);
            if (flashcardSet == null)
            {
                return NotFound();
            }

            flashcardSet.Title = request.Title;

            await _context.SaveChangesAsync();

            return NoContent(); 
        }

        // DELETE: api/FlashcardSets/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFlashcardSet(Guid id)
        {
            var flashcardSet = await _context.FlashCardSets.FindAsync(id);
            if (flashcardSet == null)
            {
                return NotFound();
            }

            _context.FlashCardSets.Remove(flashcardSet);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
