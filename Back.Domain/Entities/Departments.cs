namespace ResourcingPlanner.Domain.Entities;

    public class Departments:BaseEntity
    {
         [Key]
         [Display(Name = "Department ID")]
         public int DepartmentId { get; set; }

         [Required]
         [MaxLength(50)]
         [Display(Name = "Department Name")]
        public string DepartmentName { get; set; } = "";
    }

