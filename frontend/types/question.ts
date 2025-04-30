import { AnswerOptionDto } from "./answerOption";

export type QuizQuestionDto = {
    id: string;
    content: string;
    answerOptions: AnswerOptionDto[];
  }