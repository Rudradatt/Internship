using ResourcingPlanner.Domain.Entities;
using ResourcingPlanner.Domain.Interfaces;
using ResourcingPlanner.Infrastructure.Persistence;
namespace ResourcingPlanner.Domain.Interfaces
{
    public interface IProjectRepository
    {
        // ================= CREATE =================
        Task AddProjectAsync(ProjectDetails project);

        // ================= UPDATE =================
        Task UpdateProjectAsync(int projectId, ProjectDetails updatedProject);

        // ================= READ =================
        Task<ProjectDetails?> GetProjectByIdAsync(int projectId);
        Task<List<ProjectDetails>> GetAllProjectsAsync();

        // ================= LOOKUPS =================
        Task<List<string>> GetAllProjectNamesAsync();
        Task<List<string>> GetClientsAsync();
        Task<List<string>> GetDomainsAsync();
        Task<List<UserDetails>> GetDeliveryLeadsAsync();
        Task<List<UserDetails>> GetServiceManagersAsync();
        Task<List<TechStack>> GetTechStacksAsync();
    }
}