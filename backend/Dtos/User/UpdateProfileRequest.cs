namespace LumiLearn.Dtos.User
{
    public class UpdateProfileRequest
    {
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public DateTime? Birthday { get; set; }
        public string? Name { get; set; }
    }
}
