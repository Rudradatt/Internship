using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options), IApplicationDbContext
{
    public DbSet<UserDetails> Users => Set<UserDetails>();
    public DbSet<ResourceAllocation> Allocations => Set<ResourceAllocation>();
    public DbSet<ProjectDetails> Projects => Set<ProjectDetails>();

    public DbSet<TechStack> TechStacks => Set<TechStack>();
    public DbSet<ProjectTechStack> ProjectTechStacks => Set<ProjectTechStack>();
    public DbSet<Domains> Domains => Set<Domains>();
    public DbSet<Departments> Departments => Set<Departments>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<UserDetails>()
        .HasIndex(u => u.Username)
        .IsUnique();

    modelBuilder.Entity<UserDetails>()
        .HasIndex(u => u.Email)
        .IsUnique();

    modelBuilder.Entity<ProjectDetails>()
        .HasOne(p => p.DeliveryLead)
        .WithMany()
        .HasForeignKey(p => p.DeliveryLeadId)
        .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<ProjectDetails>()
        .HasOne(p => p.ServiceManager)
        .WithMany()
        .HasForeignKey(p => p.ServiceManagerId)
        .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<ProjectTechStack>()
        .HasOne(pt => pt.Project)
        .WithMany(p => p.ProjectTechStacks)
        .HasForeignKey(pt => pt.ProjectId);

    modelBuilder.Entity<ProjectTechStack>()
        .HasOne(pt => pt.TechStack)
        .WithMany(t => t.ProjectTechStacks)
        .HasForeignKey(pt => pt.TechStackId);

    modelBuilder.Entity<Domains>()
        .HasIndex(d => d.DomainName)
        .IsUnique();

    modelBuilder.Entity<Departments>()
        .HasIndex(d => d.DepartmentName)
        .IsUnique();
}
    
}
}