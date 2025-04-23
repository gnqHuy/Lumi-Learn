namespace LumiLearn.Dtos.Course
{
    public class CourseDto
    {
        public Guid Id { get; set; }
        public string Instructor { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Thumbnail { get; set; }
        public string Topic { get; set; }
    }
}
