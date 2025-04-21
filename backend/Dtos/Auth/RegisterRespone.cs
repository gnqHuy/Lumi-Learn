using LumiLearn.Dtos.User;

namespace LumiLearn.Dtos.Auth
{
    public class RegisterRespone
    {
        public UserDto User { get; set; }
        public string Message { get; set; }
    }
}
