namespace LumiLearn.Domains
{
    public class Quiz
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public Guid LessonId { get; set; }

        // Navigation Properties
        public Lesson Lesson { get; set; }

        public ICollection<Question> Questions { get; set; }
        public ICollection<QuizResult> QuizResults { get; set; }
    }
}
