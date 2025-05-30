﻿namespace LumiLearn.Dtos.User
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Role { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public DateTime? Birthday { get; set; }
        public string? Name { get; set; }
        public string Username { get; set; }
    }
}
