export type QuizAnswerDto = {
    questionId: string;
    selectedAnswerId: string;
}

export type QuizSubmissionDto = {
    userId: string;
    quizId: string;
    answers: QuizAnswerDto[];
}

export type QuizResult = {
    id: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
}