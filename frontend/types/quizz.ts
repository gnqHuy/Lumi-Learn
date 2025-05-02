import { QuestionWithContent, QuizQuestionDto } from "./question";

export type QuizzOverview = {
    id: string;
    lessonId: string;
    title: string;
};

export type QuizDetailDto = {
    id: string;
    title: string;
    questions: QuizQuestionDto[];
};

export type CreateQuizRequest = {
    lessonId: string;
    title: string;
    questions: QuestionWithContent[];
};