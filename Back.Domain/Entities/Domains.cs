namespace ResourcingPlanner.Domain.Entities;
    public class Domains : BaseEntity
    {
       [Key]
       [Display(Name = "Domain ID")]
       public int DomainId { get; set; }

       [Required]
       [MaxLength(100)]
       [Display(Name = "Domain Name")]
       public string DomainName { get; set; } = "";
    }

