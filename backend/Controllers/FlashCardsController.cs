using LumiLearn.Data;
using LumiLearn.Domains;
using LumiLearn.Dtos.FlashCard;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LumiLearn.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlashCardsController : ControllerBase
    {
        private readonly LumiLearnDbContext _context;

        public FlashCardsController(LumiLearnDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlashCard>>> GetFlashCards([FromQuery] Guid flashCardSetId)
        {
            var flashCards = await _context.FlashCards
                .AsNoTracking()
                .Where(f => f.FlashCardSetId == flashCardSetId)
                .ToListAsync();

            return Ok(flashCards);
        }

        [HttpPost]
        public async Task<ActionResult> CreateFlashCard([FromBody] FlashCardDto dto)
        {
            var flashCard = new FlashCard
            {
                Id = Guid.NewGuid(),
                Term = dto.Term,
                Definition = dto.Definition,
                FlashCardSetId = dto.FlashCardSetId
            };

            _context.FlashCards.Add(flashCard);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Flashcard created successfully." });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateFlashCard(Guid id, [FromBody] FlashCardDto dto)
        {
            var flashCard = await _context.FlashCards.FindAsync(id);
            if (flashCard == null) return NotFound("Flashcard not found.");

            flashCard.Term = dto.Term;
            flashCard.Definition = dto.Definition;
            flashCard.FlashCardSetId = dto.FlashCardSetId;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Flashcard updated successfully." });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFlashCard(Guid id)
        {
            var flashCard = await _context.FlashCards.FindAsync(id);
            if (flashCard == null) return NotFound("Flashcard not found.");

            _context.FlashCards.Remove(flashCard);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Flashcard deleted successfully." });
        }
    }
}
