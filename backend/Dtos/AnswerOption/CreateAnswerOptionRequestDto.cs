namespace LumiLearn.Dtos.AnswerOption
{
    public class CreateAnswerOptionRequestDto
    {
        public string Content { get; set; }
        public bool IsCorrect { get; set; }
        public Guid QuestionId { get; set; }
    }
}
