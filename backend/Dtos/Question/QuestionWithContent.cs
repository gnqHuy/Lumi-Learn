using LumiLearn.Dtos.AnswerOption;

namespace LumiLearn.Dtos.Question
{
    public class QuestionWithContent
    {
        public string Content { get; set; }
        public IEnumerable<AnswerOptionContent> AnswerOptions { get; set; }
    }
}
