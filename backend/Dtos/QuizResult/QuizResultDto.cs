﻿namespace LumiLearn.Dtos.QuizResult
{
    public class QuizResultDto
    {
        public Guid UserId { get; set; }
        public Guid QuizId { get; set; }
        public double Score { get; set; }
    }
}
