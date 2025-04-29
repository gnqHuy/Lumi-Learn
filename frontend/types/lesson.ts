import { FlashcardSetOverview } from "./flashcardSet";
import { QuizzOverview } from "./quizz";

export type LessonOverview = {
    id: string;
    courseId: string;
    title: string;
    flashcardSets: FlashcardSetOverview[];
    quizzes: QuizzOverview[];
};