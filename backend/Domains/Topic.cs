namespace LumiLearn.Domains
{
    public class Topic
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? thumbnail { get; set; }

        // Navigation Properties
        public ICollection<Course> Courses { get; set; }
    }
}
