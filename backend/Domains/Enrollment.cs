namespace LumiLearn.Domains
{
    public class Enrollment
    {
        public Guid CourseId { get; set; }
        public Guid StudentId { get; set; }

        // Navigation Properties
        public Course Course { get; set; }
        public User Student { get; set; }
    }
}
