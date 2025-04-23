using System.Text.Json.Serialization;

namespace LumiLearn.Domains
{
    public class Topic
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        // Navigation Properties
        [JsonIgnore]
        public ICollection<Course> Courses { get; set; }
    }
}
