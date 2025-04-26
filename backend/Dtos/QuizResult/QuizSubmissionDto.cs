namespace LumiLearn.Dtos.QuizResult
{
    public class QuizSubmissionDto
    {
        public Guid UserId { get; set; }
        public Guid QuizId { get; set; }
        public List<QuizAnswerDto> Answers { get; set; }
    }
}
