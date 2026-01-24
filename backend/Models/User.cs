namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Auth0Id { get; set; } = null!;
        public string NickName {get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public bool? EmailVerified { get; set; }
        public string UpdatedAt { get; set; } = null!;
        public string ImageUrl { get; set; } = null!;
    }
}