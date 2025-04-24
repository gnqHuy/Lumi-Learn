using LumiLearn.Data;
using LumiLearn.Domains;
using LumiLearn.Dtos.Feedback;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LumiLearn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbacksController : ControllerBase
    {
        private readonly LumiLearnDbContext dbContext;
        public FeedbacksController(LumiLearnDbContext lumiLearnDbContext)
        {
            dbContext = lumiLearnDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFeedbacks()
        {
            var feedbacks = await dbContext.Feedbacks
                .Select(f => new FeedbackDto
                {
                    UserId = f.UserId,
                    CourseId = f.CourseId,
                    Rating = f.Rating,
                })
                .ToListAsync();

           return Ok(feedbacks);
        }

        [HttpGet("{courseId:Guid}")]
        public async Task<IActionResult> GetFeedbackOfCourse(Guid courseId)
        {
            var feedbacks = await dbContext.Feedbacks
                .Where(f => f.CourseId == courseId)
                .Select(f => new FeedbackDto
                {
                    UserId = f.UserId,
                    CourseId = courseId,
                    Rating = f.Rating
                })
                .ToListAsync();

            return Ok(feedbacks);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<FeedbackDto>> UserAddFeedback(AddFeedbackRequest request)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var existFeedback = await dbContext.Feedbacks
                .FirstOrDefaultAsync(f => f.UserId == userId && f.CourseId == request.CourseId);

            if (existFeedback != null)
            {
                if(request.Rating != existFeedback.Rating)
                {
                    existFeedback.Rating = request.Rating;
                }
                
                await dbContext.SaveChangesAsync();

                return NoContent();
            }

            var feedback = new Feedback
            {
                UserId = userId,
                CourseId = request.CourseId,
                Rating = request.Rating
            };

            await dbContext.Feedbacks.AddAsync(feedback);
            await dbContext.SaveChangesAsync();

            var feedbackDto = new FeedbackDto
            {
                UserId = userId,
                CourseId = request.CourseId,
                Rating = request.Rating
            };

            return CreatedAtAction(nameof(GetFeedbackOfCourse), new { courseId = feedbackDto.CourseId }, feedbackDto);
        }

    }
}
