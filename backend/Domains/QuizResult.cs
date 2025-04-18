namespace LumiLearn.Domains
{
    public class QuizResult
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid QuizId { get; set; }
        public double score { get; set; }

        // Navigation Properties
        public User User { get; set; }
        public Quiz Quiz { get; set; }
    }
}
