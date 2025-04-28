namespace LumiLearn.Domains
{
    public class SearchHistory
    {
        public Guid UserId { get; set; }
        public string Content { get; set; }
        public DateTime SearchedAt { get; set; }

        // Navigation Properties
        public User User { get; set; }
    }
}
