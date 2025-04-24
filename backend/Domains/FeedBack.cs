namespace LumiLearn.Domains
{
    public class Feedback
    {
        public Guid UserId { get; set; }
        public Guid CourseId { get; set; }
        public int Rating { get; set; }

        // Navigation Properties
        public User User { get; set; }
        public Course Course { get; set; }
    }
}
