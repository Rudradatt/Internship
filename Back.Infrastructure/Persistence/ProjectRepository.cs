using Microsoft.EntityFrameworkCore;
using ResourcingPlanner.Domain.Entities;
using ResourcingPlanner.Domain.Interfaces;

namespace ResourcingPlanner.Infrastructure.Persistence
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly ApplicationDbContext _context;

        public ProjectRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // ================= CREATE =================

        public async Task AddProjectAsync(ProjectDetails project)
        {
            await using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                await _context.Projects.AddAsync(project);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        // ================= UPDATE =================

        public async Task UpdateProjectAsync(int projectId, ProjectDetails updatedProject)
        {
            var project = await _context.Projects
                .FirstOrDefaultAsync(p => p.ProjectId == projectId && p.IsActive);

            if (project == null)
                throw new Exception("Project not found");

            // Update only required fields
            project.ProjectName = updatedProject.ProjectName;
            project.ProjectShortName = updatedProject.ProjectShortName;
            project.ClientName = updatedProject.ClientName;
            project.DomainId = updatedProject.DomainId;
            project.DepartmentId = updatedProject.DepartmentId;
            project.DeliveryLeadId = updatedProject.DeliveryLeadId;
            project.ServiceManagerId = updatedProject.ServiceManagerId;
            project.StartDate = updatedProject.StartDate;
            project.EndDate = updatedProject.EndDate;
            project.ProjectType = updatedProject.ProjectType;

            await _context.SaveChangesAsync();
        }

        // ================= READ =================

        public async Task<ProjectDetails?> GetProjectByIdAsync(int projectId)
        {
            return await _context.Projects
                .FirstOrDefaultAsync(p => p.ProjectId == projectId && p.IsActive);
        }

        public async Task<List<ProjectDetails>> GetAllProjectsAsync()
        {
            return await _context.Projects
                .Where(p => p.IsActive)
                .ToListAsync();
        }

        // ================= LOOKUPS =================

        public async Task<List<string>> GetAllProjectNamesAsync()
        {
            return await _context.Projects
                .Where(p => p.IsActive)
                .Select(p => p.ProjectName)
                .Distinct()
                .ToListAsync();
        }

        public async Task<List<string>> GetClientsAsync()
        {
            return await _context.Projects
                .Where(p => p.IsActive)
                .Select(p => p.ClientName)
                .Distinct()
                .ToListAsync();
        }

        public async Task<List<string>> GetDomainsAsync()
        {
            return await _context.Domains
                .Select(d => d.DomainName)
                .Distinct()
                .ToListAsync();
        }

        public async Task<List<UserDetails>> GetDeliveryLeadsAsync()
        {
            return await _context.Users
                .Where(u => u.Designation == "Delivery Lead")
                .ToListAsync();
        }

        public async Task<List<UserDetails>> GetServiceManagersAsync()
        {
            return await _context.Users
                .Where(u => u.Designation == "Service Manager")
                .ToListAsync();
        }

        public async Task<List<TechStack>> GetTechStacksAsync()
        {
            return await _context.TechStacks.ToListAsync();
        }
    }
}
