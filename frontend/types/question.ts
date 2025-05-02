import { AnswerOptionContent, AnswerOptionDto } from "./answerOption";

export type QuizQuestionDto = {
    id: string;
    content: string;
    answerOptions: AnswerOptionDto[];
}

export type QuestionWithContent = {
    content: string;
    answerOptions: AnswerOptionContent[];
};