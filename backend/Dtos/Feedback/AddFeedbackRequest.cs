namespace LumiLearn.Dtos.Feedback
{
    public class AddFeedbackRequest
    {
        public Guid CourseId { get; set; }
        public int Rating { get; set; }
    }
}
