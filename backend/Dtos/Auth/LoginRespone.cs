using LumiLearn.Dtos.User;

namespace LumiLearn.Dtos.Auth
{
    public class LoginRespone
    {
        public UserDto User { get; set; }
        public string AuthToken { get; set; }
    }
}
