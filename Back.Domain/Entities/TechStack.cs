namespace ResourcingPlanner.Domain.Entities;
public class TechStack : BaseEntity
    {
        [Key]
        [Display(Name = "Tech Stack ID")]
        public int TechStackId { get; set; }

        [Required]
        [MaxLength(50)]
        [Display(Name = "Technology Name")]
        public string TechName { get; set; } = "";

        [Display(Name = "Projects")]
        public ICollection<ProjectTechStack> ProjectTechStacks { get; set; }
            = new List<ProjectTechStack>();
    }