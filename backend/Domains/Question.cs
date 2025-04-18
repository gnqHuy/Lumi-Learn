namespace LumiLearn.Domains
{
    public class Question
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public Guid QuizId { get; set; }

        // Navigation Properties
        public Quiz Quiz { get; set; }
        
        public ICollection<AnswerOption> AnswerOptions { get; set; }
    }
}
