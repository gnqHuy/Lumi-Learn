﻿namespace LumiLearn.Dtos.AnswerOption
{
    public class AnswerOptionDto
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public bool IsCorrect { get; set; }
        public Guid QuestionId { get; set; }
    }
}
