using System.Text.Json.Serialization;

namespace LumiLearn.Domains
{
    public class Role
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        // Navigation Properties
        [JsonIgnore]
        public ICollection<User> Users { get; set; }
    }
}
