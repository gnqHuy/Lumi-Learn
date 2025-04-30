using LumiLearn.Data;
using LumiLearn.Domains;
using LumiLearn.Dtos.Question;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LumiLearn.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionsController : Controller
    {
        private readonly LumiLearnDbContext _context;

        public QuestionsController(LumiLearnDbContext context)
        {
            _context = context;
        }

        // GET: api/questions?quizId={quizId}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetQuestionReponseDto>>> GetAllQuestionsByQuizId([FromQuery] Guid quizId)
        {
            var questions = await _context.Questions
                .AsNoTracking()
                .Where(q => q.QuizId == quizId)
                .Select(q => new GetQuestionReponseDto
                {
                    Id = q.Id,
                    Title = q.Content
                })
                .ToListAsync();

            return Ok(questions);
        }

        // GET: api/questions/{id}
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<QuestionDto>> GetQuestionById(Guid id)
        {
            var question = await _context.Questions.AsNoTracking().FirstOrDefaultAsync(q => q.Id == id);
            if (question == null)
                return NotFound();

            return Ok(new QuestionDto
            {
                Content = question.Content,
                QuizId = question.QuizId
            });
        }

        // POST: api/questions
        [HttpPost]
        public async Task<ActionResult<QuestionDto>> CreateNewQuestion(QuestionDto questionDto)
        {
            if (string.IsNullOrWhiteSpace(questionDto.Content))
                return BadRequest("Content is required.");

            if (!await _context.Quizzes.AnyAsync(q => q.Id == questionDto.QuizId))
                return NotFound("Quiz not found.");

            var question = new Question
            {
                Id = Guid.NewGuid(),
                Content = questionDto.Content,
                QuizId = questionDto.QuizId
            };

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuestionById), new { id = question.Id }, questionDto);
        }

        [HttpPost("Range")]
        public async Task<ActionResult<IEnumerable<Question>>> CreateQuestions(IEnumerable<QuestionDto> questions)
        {
            if (!await _context.Quizzes.AnyAsync(q => q.Id == questions.ElementAt(0).QuizId))
                return NotFound("Quiz not found.");

            var questionsToAdd = new List<Question>();

            foreach(var question in questions)
            {
                questionsToAdd.Add(new Question
                {
                    Id = Guid.NewGuid(),
                    Content = question.Content,
                    QuizId = question.QuizId
                });
            }

            await _context.Questions.AddRangeAsync(questionsToAdd);
            await _context.SaveChangesAsync();

            return Ok(questionsToAdd);
        }

        // PUT: api/questions/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuestion(Guid id, [FromBody] QuestionDto questionDto)
        {
            if (string.IsNullOrWhiteSpace(questionDto.Content))
                return BadRequest("Content is required.");

            var question = await _context.Questions.FirstOrDefaultAsync(q => q.Id == id);
            if (question == null)
                return NotFound();

            question.Content = questionDto.Content;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/questions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(Guid id)
        {
            var question = await _context.Questions.FirstOrDefaultAsync(q => q.Id == id);
            if (question == null)
                return NotFound();

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
