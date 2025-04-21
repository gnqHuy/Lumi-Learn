using LumiLearn.Domains;
using LumiLearn.Enums;

namespace LumiLearn.Dtos.Auth
{
    public class RegisterRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public UserRole Role { get; set; }
    }
}
