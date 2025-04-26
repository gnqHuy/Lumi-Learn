using LumiLearn.Data;
using LumiLearn.Domains;
using LumiLearn.Dtos.Lesson;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LumiLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonsController : ControllerBase
    {
        private readonly LumiLearnDbContext _context;
        public LessonsController(LumiLearnDbContext context)
        {
            _context = context;
        }

        // GET: api/lessons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LessonDto>>> GetLessonsByCourseId(Guid courseId)
        {
            var lessons = await _context.Lessons
                .AsNoTracking()
                .Where(l => l.CourseId == courseId)
                .Select(l => new Lesson
                {
                    Id = l.Id,
                    CourseId = l.CourseId,
                    Title = l.Title,
                })
                .ToListAsync();

            return Ok(lessons);
        }

        // GET: api/lessons/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LessonDto>> GetLessonById(Guid id)
        {
            var lesson = await _context.Lessons
                .AsNoTracking()
                .FirstOrDefaultAsync(l => l.Id == id);
            if (lesson == null)
                return NotFound();

            return Ok(new LessonDto
            {
                CourseId = lesson.CourseId,
                Title = lesson.Title,
            });
        }

        // POST: api/lessons
        [HttpPost]
        public async Task<ActionResult<LessonDto>> CreateNewLesson(LessonDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Title))
                return BadRequest("Title is required.");

            if (!await _context.Courses.AnyAsync(c => c.Id == request.CourseId))
                return NotFound("Course not found.");

            var lesson = new Lesson
            {
                Id = Guid.NewGuid(),
                CourseId = request.CourseId,
                Title = request.Title,
            };

            _context.Lessons.Add(lesson);
            await _context.SaveChangesAsync();

            var dto = new LessonDto
            {
                CourseId = lesson.CourseId,
                Title = lesson.Title,
            };

            return CreatedAtAction(nameof(GetLessonById), new { request.CourseId, id = lesson.Id }, dto);
        }

        // PUT: api/lessons/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLesson(Guid id, [FromBody] LessonDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Title))
                return BadRequest("Title is required.");

            var lesson = await _context.Lessons
                .FirstOrDefaultAsync(l => l.Id == id);
            if (lesson == null)
                return NotFound();

            lesson.Title = request.Title;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/lessons/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLesson(Guid id)
        {
            var lesson = await _context.Lessons
                .FirstOrDefaultAsync(l => l.Id == id);
            if (lesson == null)
                return NotFound();

            _context.Lessons.Remove(lesson);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
