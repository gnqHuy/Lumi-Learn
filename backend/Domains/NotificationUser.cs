namespace LumiLearn.Domains
{
    public class NotificationUser
    {
        public Guid UserId { get; set; }
        public Guid NotificationId { get; set; }
        public bool IsRead { get; set; }

        // Navigation Properties
        public User User { get; set; }
        public Notification Notification { get; set; }
    }
}
