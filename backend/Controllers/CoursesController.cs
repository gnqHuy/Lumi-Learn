using LumiLearn.Data;
using LumiLearn.Domains;
using LumiLearn.Dtos.Course;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Security.Claims;

namespace LumiLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class CoursesController : ControllerBase
    {
        private readonly LumiLearnDbContext dbContext;

        public CoursesController(LumiLearnDbContext lumiLearnDbContext)
        {
            dbContext = lumiLearnDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await dbContext.Courses
                .Include(c => c.Instructor)
                .Include(c => c.Topic)
                .Select(c => new CourseDto
                {
                    Id = c.Id,
                    Instructor = c.Instructor.Name ?? c.Instructor.Username,
                    Title = c.Title,
                    Description = c.Description,
                    Thumbnail = c.Thumbnail,
                    Topic = c.Topic.Name
                })
                .ToListAsync();

            return Ok(courses);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<CourseDto>> GetCourseDetail(Guid id)
        {
            var course = await dbContext.Courses
                .Include(c => c.Instructor)
                .Include(c => c.Topic)
                .FirstOrDefaultAsync(c => c.Id == id);

            if(course == null)
            {
                return NotFound();
            }

            var courseDto = new CourseDto
            {
                Id = course.Id,
                Instructor = course.Instructor.Name ?? course.Instructor.Username,
                Title = course.Title,
                Description = course.Description,
                Thumbnail = course.Thumbnail,
                Topic = course.Topic.Name
            };

            return Ok(courseDto);
        }

        [HttpPost]
        [Authorize(Roles = "Teacher")]
        public async Task<ActionResult<CourseDto>> CreateNewCourse(CreateCourseRequest request)
        {
            if (request.Topic == null || request.Title == null)
            {
                return BadRequest("Missing Some Props");
            }

            // Check the Unique InstructorId and Title

            var instructorId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var existCourse = await dbContext.Courses
                .AnyAsync(c => c.InstructorId == instructorId && c.Title == request.Title);

            if(existCourse)
            {
                return Conflict("You already create course with this title!");
            }
            
            var topic = await dbContext.Topics.FirstOrDefaultAsync(r => r.Name == request.Topic);

            if (topic == null)
            {
                return BadRequest("Topic doesn't exist"); // Just for test
            }

            var course = new Course
            {
                Id = Guid.NewGuid(),
                InstructorId = instructorId,
                Title = request.Title,
                Description = request.Description,
                Thumbnail = request.Thumbnail,
                TopicId = topic.Id
            };

            await dbContext.Courses.AddAsync(course);
            await dbContext.SaveChangesAsync();

            var instructor = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == instructorId);

            var courseDto = new CourseDto
            {
                Id = course.Id,
                Instructor = instructor.Name ?? instructor.Username,
                Title = course.Title,
                Description = course.Description,
                Thumbnail = course.Thumbnail,
                Topic = topic.Name
            };

            return CreatedAtAction(nameof(GetCourseDetail), new { id = course.Id }, courseDto);
        }
    }
}
