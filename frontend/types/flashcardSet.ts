import { CreateFlashcardRequest } from "./flashcard";

export type FlashcardSetOverview = {
    id: string;
    lessonId: string;
    title: string;
};

export type CreateFlashcardSetRequest = {
    lessonId: string;
    title: string;
    flashcards: CreateFlashcardRequest[];
};