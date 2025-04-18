namespace LumiLearn.Domains
{
    public class FeedBack
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid CourseId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }

        // Navigation Properties
        public User User { get; set; }
        public Course Course { get; set; }
    }
}
