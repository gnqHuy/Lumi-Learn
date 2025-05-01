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
        public async Task<ActionResult> GetFlashCards([FromQuery] Guid flashCardSetId)
        {
            var flashcardSet = await _context.FlashCardSets.FindAsync(flashCardSetId);

            if (flashcardSet == null)
            {
                return NotFound();
            }

            var flashCards = await _context.FlashCards
                .AsNoTracking()
                .Where(f => f.FlashCardSetId == flashCardSetId)
                .Select(f => new FlashCardDto
                {
                    FlashCardSetId = f.FlashCardSetId,
                    Term = f.Term,
                    Definition = f.Definition,
                })
                .ToListAsync();

            return Ok(new
            {
                title = flashcardSet.Title,
                flashCards = flashCards
            });
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

        [HttpPost("Range")]
        public async Task<ActionResult<IEnumerable<FlashCard>>> CreateFlashCards([FromBody] IEnumerable<FlashCardDto> flashCardDtos)
        {
            var flashcards = new List<FlashCard>();

            foreach(var flashcardDto in flashCardDtos)
            {
                var flashcard = new FlashCard
                {
                    Id = Guid.NewGuid(),
                    Term = flashcardDto.Term,
                    Definition = flashcardDto.Definition,
                    FlashCardSetId = flashcardDto.FlashCardSetId
                };

                flashcards.Add(flashcard);
            }

            await _context.FlashCards.AddRangeAsync(flashcards);
            await _context.SaveChangesAsync();

            return Ok(flashcards);
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
