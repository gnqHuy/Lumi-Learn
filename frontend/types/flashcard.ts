export type Flashcard = {
    id: string,
    term: string,
    definition: string,
    flashcardSetId: string
}

export type FlashcardDto = {
    term: string,
    definition: string,
    flashcardSetId: string
}