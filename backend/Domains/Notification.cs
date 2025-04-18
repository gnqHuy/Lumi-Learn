namespace LumiLearn.Domains
{
    public class Notification
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation Properties
        public CourseNotification CourseNotification { get; set; }
    }
}
