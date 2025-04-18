namespace LumiLearn.Domains
{
    public class FlashCard
    {
        public Guid Id { get; set; }
        public string Term { get; set; }
        public string Definition { get; set; }
        public Guid FlashCardSetId { get; set; }

        // Navigation Properties
        public FlashCardSet FlashCardSet { get; set; }
    }
}
