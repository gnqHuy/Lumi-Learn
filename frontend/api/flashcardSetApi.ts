import { CreateFlashcardSetRequest } from "@/types/flashcardSet";
import api from "./api";

const URL_PREFIX = 'api/FlashcardSets';

export function createFlashcardSet(request: CreateFlashcardSetRequest) {
    return api.post(`${URL_PREFIX}/WithContent`, request);
}