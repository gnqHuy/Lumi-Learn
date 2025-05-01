import api from "./api"

const URL_PREFIX = 'api/Flashcards'

export function GetFlashcards(flashcardSetId: string) {
    return api.get(`${URL_PREFIX}?flashcardSetId=${flashcardSetId}`);
}