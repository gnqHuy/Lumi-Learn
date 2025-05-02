using LumiLearn.Dtos.Question;

namespace LumiLearn.Dtos.Quiz
{
    public class CreateQuizRequest
    {
        public Guid LessonId { get; set; }
        public string Title { get; set; }
        public IEnumerable<QuestionWithContent> Questions { get; set; }
    }
}
