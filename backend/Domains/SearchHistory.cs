namespace LumiLearn.Domains
{
    public class SearchHistory
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Content { get; set; }

        // Navigation Properties
        public User User { get; set; }
    }
}
