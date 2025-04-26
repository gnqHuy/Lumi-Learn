namespace LumiLearn.Dtos.QuizResult
{
    public class QuizAnswerDto
    {
        public Guid QuestionId { get; set; }
        public Guid SelectedAnswerId { get; set; }
    }
}
