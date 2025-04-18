using LumiLearn.Enums;

namespace LumiLearn.Domains
{
    public class CourseNotification
    {
        public Guid CourseId { get; set; }
        public Guid NotificationId { get; set; }
        public CourseNotificationType Type { get; set; }

        // Navigation Properties
        public Course Course { get; set; }
        public Notification Notification { get; set; }
    }
}
