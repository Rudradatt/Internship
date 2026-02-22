    namespace ResourcingPlanner.Domain.Entities;
    public class UserDetails : BaseEntity
    {
        [Key]
        [Display(Name = "User ID")]
        public int UserId { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(100)]
        [Display(Name = "Full Name")]
        public string FullName { get; set; } = "";

        [Required]
        [MinLength(5)]
        [MaxLength(50)]
        [Display(Name = "Username")]
        public string Username { get; set; } = "";

        [Required]
        [EmailAddress]
        [MinLength(5)]
        [MaxLength(100)]
        [Display(Name = "Email Address")]
        public string Email { get; set; } = "";

        [Required]
        [MaxLength(300)]
        [Display(Name = "Password")]
        public string PasswordHash { get; set; } = "";

        [Required]
        [MaxLength(20)]
        [Display(Name = "Designation")]
        public string? Designation { get; set; }
    }