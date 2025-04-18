namespace LumiLearn.Domains
{
    public class FlashCardSet
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public Guid LessonId { get; set; }
        
        // Navigation Properties
        public Lesson Lesson { get; set; }

        public ICollection<FlashCard> FlashCards { get; set; }
    }
}
