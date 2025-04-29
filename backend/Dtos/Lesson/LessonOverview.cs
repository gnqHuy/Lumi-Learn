using LumiLearn.Dtos.FlashcardSet;
using LumiLearn.Dtos.Quiz;

namespace LumiLearn.Dtos.Lesson
{
    public class LessonOverview
    {
        public Guid Id { get; set; }
        public Guid CourseId { get; set; }
        public string Title { get; set; }
        public IEnumerable<FlashcardSetOverview> FlashcardSets { get; set; }
        public IEnumerable<QuizzOverview> Quizzes { get; set; }
    }
}
