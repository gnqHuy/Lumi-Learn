namespace LumiLearn.Domains
{
    public class AnswerOption
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public bool IsCorrect { get; set; }
        public Guid QuestionId { get; set; }

        // Navigation Properties
        public Question Question { get; set; }
    }
}
