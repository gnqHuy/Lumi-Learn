using LumiLearn.Data;
using LumiLearn.Domains;
using LumiLearn.Dtos.Lesson;
using LumiLearn.Dtos.Quiz;
using LumiLearn.Dtos.QuizDetailDto;
using LumiLearn.Dtos.Quizz;
using LumiLearn.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LumiLearn.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizzesController : Controller
    {
        private readonly LumiLearnDbContext _context;
        private readonly INotificationRepository notificationRepository;

        public QuizzesController(LumiLearnDbContext context, INotificationRepository notificationRepository)
        {
            _context = context;
            this.notificationRepository = notificationRepository;
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

        // GET: api/quizzes/{quizId}
        [HttpGet("{quizId:guid}")]
        public async Task<ActionResult<QuizDetailDto>> GetQuizDetail(Guid quizId)

        {
            var quiz = await _context.Quizzes.FindAsync(quizId);

            if (quiz == null)
            {
                return NotFound();
            }

            var questions = await _context.Questions.Where(q => q.QuizId == quizId).ToListAsync();
            var questionsDto = new List<QuizQuestionDto>();

            foreach(var question in questions)
            {
                var answerOptions = await _context.AnswerOptions.Where(a => a.QuestionId == question.Id)
                    .Select(a => new QuestionAnswerOptionDto
                    {
                        Id = a.Id,
                        IsCorrect = a.IsCorrect,
                        Content = a.Content,
                    }).ToListAsync();

                var questionDto = new QuizQuestionDto
                {
                    Id = question.Id,
                    Content = question.Content,
                    AnswerOptions = answerOptions
                };

                questionsDto.Add(questionDto);
            }

            var quizDetailDto = new QuizDetailDto
            {
                Id = quiz.Id,
                Title = quiz.Title,
                Questions = questionsDto
            };

            return Ok(quizDetailDto);
        }


        [HttpPost]
        public async Task<ActionResult<QuizDto>> CreateNewQuiz([FromBody] QuizDto quizDto)
        {
            if (string.IsNullOrWhiteSpace(quizDto.Title))
                return BadRequest("Title is required.");

            var lessonExists = await _context.Lessons.FirstOrDefaultAsync(l => l.Id == quizDto.LessonId);
            if (lessonExists == null)
            {
                return BadRequest("Invalid Lesson ID");
            }

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

            _ = Task.Run(async () =>
            {
                await notificationRepository
                .SendNotificationWhenCreateLessonResource(
                    lessonExists,
                    Enums.CourseNotificationType.Quiz,
                    quiz.Title
                );
            }).ConfigureAwait(false);

            return CreatedAtAction(nameof(GetQuizDetail), new { quizId = quiz.Id }, dto);
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
