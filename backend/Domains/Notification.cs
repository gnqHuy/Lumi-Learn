namespace LumiLearn.Domains
{
    public class Notification
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public string Type { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Navigation Properties
        public CourseNotification CourseNotification { get; set; }
        public ICollection<NotificationUser> NotificationUsers { get; set; }
    }
}
