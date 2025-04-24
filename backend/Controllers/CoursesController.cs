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

        // Get My Course ? Teacher ? Student -> Role
        [HttpGet("mine")]
        [Authorize]
        public async Task<IActionResult> GetMyCourses()
        {
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            if(role == "Student")
            {
                var courses = await dbContext.Enrollments
                    .Where(e => e.StudentId == userId)
                    .Select(e => e.Course)
                    .ToListAsync();
                return Ok(courses);
            }
            else if (role == "Teacher")
            {
                var courses = await dbContext.Courses
                    .Where(c => c.InstructorId == userId)
                    .ToListAsync();

                return Ok(courses);
            }

            return Forbid();
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
                topic = new Topic
                {
                    Id = Guid.NewGuid(),
                    Name = request.Topic
                };
                await dbContext.Topics.AddAsync(topic);
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

        [HttpPatch("{id:Guid}")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> UpdateCourse(Guid id, UpdateCourseRequest request)
        {
            if(request.Title == null && 
               request.Description == null && 
               request.Thumbnail == null && 
               request.Topic == null)
            {
                return BadRequest("Nothing to change!"); // Handle at frontend not to call
            }

            var course = await dbContext.Courses
                .Include(c => c.Topic)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
            {
                return NotFound();
            }

            // Check permission 
            // Frontend cannot show delete button of others instructor
            // But they could do something like postman to delete it
            var instructorId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            if (instructorId != course.InstructorId)
            {
                return Forbid("You don't have permission to update this course");
            }

            if (request.Title != null && request.Title != course.Title)
            {
                course.Title = request.Title;
            }

            if (request.Description != null && request.Description != course.Description)
            {
                course.Description = request.Description;
            }

            if (request.Thumbnail != null && request.Thumbnail != course.Thumbnail)
            {
                course.Thumbnail = request.Thumbnail;
            }

            if (request.Topic != null && request.Topic != course.Topic.Name)
            {
                var topic = await dbContext.Topics.FirstOrDefaultAsync(t => t.Name == request.Topic);
                if (topic == null)
                {
                    topic = new Topic
                    {
                        Id = Guid.NewGuid(),
                        Name = request.Topic
                    };
                    await dbContext.Topics.AddAsync(topic);
                }
                course.TopicId = topic.Id;
            }

            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:Guid}")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> DeleteCourse(Guid id)
        {
            var course = await dbContext.Courses.FirstOrDefaultAsync(c => c.Id == id);
            if(course == null)
            {
                return BadRequest("Course Id doesn't exist");
            }

            // Check Permisson
            var instructorId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            if (instructorId != course.InstructorId)
            {
                return Forbid();
            }

            dbContext.Courses.Remove(course);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
