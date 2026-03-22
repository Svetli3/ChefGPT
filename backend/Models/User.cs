namespace Backend.Models
{
    public class User
    {
        public required int Id { get; set; }
        public required string Auth0Id { get; set; } = null!;
        public string NickName {get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public bool? EmailVerified { get; set; }
        public string UpdatedAt { get; set; } = null!;
        public string ImageUrl { get; set; } = null!;

        public ICollection<Recipe>? Recipes {get; set;}
    }
}