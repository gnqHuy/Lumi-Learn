using LumiLearn.Dtos.FlashCard;

namespace LumiLearn.Dtos.FlashcardSet
{
    public class CreateFlashcardSetRequest
    {
        public Guid LessonId { get; set; }
        public string Title { get; set; }
        public IEnumerable<CreateFlashcardRequest> Flashcards { get; set; }
    }
}
