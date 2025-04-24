namespace LumiLearn.Dtos.Feedback
{
    public class FeedbackDto
    {
        public Guid UserId { get; set; }
        public Guid CourseId { get; set; }
        public int Rating { get; set; }
    }
}
