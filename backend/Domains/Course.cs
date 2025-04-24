using System.Text.Json.Serialization;

namespace LumiLearn.Domains
{
    public class Course
    {
        public Guid Id { get; set; }
        public Guid InstructorId { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Thumbnail { get; set; }
        public Guid TopicId { get; set; }

        // Navigation Properties
        public Topic Topic { get; set; }
        [JsonIgnore]
        public User Instructor { get; set; }

        public ICollection<Enrollment> Enrollments { get; set; }
        public ICollection<Feedback> Feedbacks { get; set; }
        public ICollection<Lesson> Lessons { get; set; }
        public ICollection<CourseNotification> CourseNotifications { get; set; }
    }
}
