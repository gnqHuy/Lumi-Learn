using LumiLearn.Data;
using LumiLearn.Domains;
using LumiLearn.Dtos.Lesson;
using LumiLearn.Dtos.Quiz;
using LumiLearn.Dtos.Quizz;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LumiLearn.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizzesController : Controller
    {
        private readonly LumiLearnDbContext _context;

        public QuizzesController(LumiLearnDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetQuizReponseDto>>> GetAllQuizzesByLessonId(Guid lessonId)
        {
            var quizzes = await _context.Quizzes
                .AsNoTracking()
                .Where(q => q.LessonId == lessonId)
                .Select(q => new GetQuizReponseDto
                {
                    Id = q.Id,
                    Title = q.Title
                })
                .ToListAsync();

            return Ok(quizzes);
        }


        [HttpGet("{id:guid}")]
        public async Task<ActionResult<Quiz>> GetQuizzById(Guid id)
        {
            var quiz = await _context.Quizzes.AsNoTracking().FirstOrDefaultAsync(l => l.Id == id);
            if (quiz == null) 
                return NotFound();
            return Ok(new QuizDto
            {
                LessonId = quiz.LessonId,
                Title = quiz.Title,
            });
        }

        [HttpPost]
        public async Task<ActionResult<QuizDto>> CreateNewQuiz([FromBody] QuizDto quizDto)
        {
            if (string.IsNullOrWhiteSpace(quizDto.Title))
                return BadRequest("Title is required.");

            if (!await _context.Lessons.AnyAsync(c => c.Id == quizDto.LessonId))
                return NotFound("Course not found.");

            var quiz = new Quiz
            {
                Id = Guid.NewGuid(),
                LessonId = quizDto.LessonId,
                Title = quizDto.Title,
            };

            _context.Quizzes.Add(quiz);
            await _context.SaveChangesAsync();

            var dto = new QuizDto
            {
                LessonId = quiz.LessonId,
                Title = quiz.Title,
            };

            return CreatedAtAction(nameof(GetQuizzById), new { quiz.LessonId, id = quiz.Id }, dto);
        }

        // PUT: api/quizzes/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuiz(Guid id, [FromBody] QuizDto quizDto)
        {
            if (string.IsNullOrWhiteSpace(quizDto.Title))
                return BadRequest("Title is required.");

            var quiz = await _context.Quizzes
                .FirstOrDefaultAsync(l => l.Id == id);
            if (quiz == null)
                return NotFound();

            quiz.Title = quizDto.Title;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/quizzes/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuiz(Guid id)
        {
            var quiz = await _context.Quizzes
                .FirstOrDefaultAsync(l => l.Id == id);
            if (quiz == null)
                return NotFound();

            _context.Quizzes.Remove(quiz);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
