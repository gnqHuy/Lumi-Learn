namespace LumiLearn.Domains
{
    public class Lesson
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public Guid CourseId { get; set; }

        // Navigation Properties
        public Course Course { get; set; }

        public ICollection<FlashCardSet> FlashCardSets { get; set; }
        public ICollection<Quiz> Quizzes { get; set; }
    }
}
