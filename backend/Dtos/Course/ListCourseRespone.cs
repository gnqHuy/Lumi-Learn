namespace LumiLearn.Dtos.Course
{
    public class ListCourseRespone
    {
        public List<CourseDto> Courses { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int TotalCourses { get; set; }
    }
}
