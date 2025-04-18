namespace LumiLearn.Domains
{
    public class Role
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        // Navigation Properties
        public ICollection<User> Users { get; set; }
    }
}
