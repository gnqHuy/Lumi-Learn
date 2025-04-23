namespace LumiLearn.Dtos.Course
{
    public class CreateCourseRequest
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Thumbnail {  get; set; }
        public string Topic { get; set; }
    }
}
