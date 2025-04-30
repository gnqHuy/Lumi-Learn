namespace LumiLearn.Dtos.QuizDetailDto
{
    public class QuizDetailDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public List<QuizQuestionDto> Questions { get; set; }
    }

    public class QuizQuestionDto
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public List<QuestionAnswerOptionDto> AnswerOptions { get; set; }
    }

    public class QuestionAnswerOptionDto
    {
        public Guid Id { get; set; }
        public bool IsCorrect { get; set; }
        public string Content { get; set; }
    }
}
