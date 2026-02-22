// using System.Transactions;
// using ResourcingPlanner.Domain.Entities;
// using ResourcingPlanner.Domain.Interfaces;

// namespace ResourcingPlanner.Application.Services
// {
//     public class ProjectService(IProjectRepository repository)
//     {
//         // ================= CREATE (INSERT) =================
//         public async Task<Result<int>> CreateProjectAsync(ProjectRequest request)
//         {
//             // 🔹 Basic validations
//             if (string.IsNullOrWhiteSpace(request.ProjectName))
//                 return Result<int>.Failure("Project name is required", 400);

//             if (request.StartDate > request.EndDate)
//                 return Result<int>.Failure("Start date cannot be after end date", 400);

//             if (request.BillingStartDate > request.BillingEndDate)
//                 return Result<int>.Failure("Billing start date cannot be after billing end date", 400);

//             // 1️⃣ Create Domain Entity
//             var project = new ProjectDetails
//             {
//                 ProjectName = request.ProjectName,
//                 ProjectShortName = request.ProjectShortName,
//                 DomainName = request.DomainName,
//                 Department = request.Department,
//                 ClientName = request.ClientName,

//                 DeliveryLeadId = request.DeliveryLeadId,
//                 ServiceManagerId = request.ServiceManagerId,

//                 StartDate = request.StartDate,
//                 EndDate = request.EndDate,
//                 BillingStartDate = request.BillingStartDate,
//                 BillingEndDate = request.BillingEndDate,

//                 CreatedBy = request.CreatedBy,
//                 IsActive = true
//             };


//             // After creating ProjectDetails project

// foreach (var techId in request.TechStackIds)
// {
//     project.ProjectTechStacks.Add(new ProjectTechStack
//     {
//         TechStackId = techId
//     });
// }

//             // 2️⃣ Persist Project
//             await repository.AddProjectAsync(project);

//             return Result<int>.Success(project.ProjectId);
//         }

        
//         public async Task<Result<bool>> UpdateProjectAsync(int projectId, ProjectRequest request)
//         {
//             using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

//             try
//             {
//                 var project = await repository.GetProjectByIdAsync(projectId);
//                 if (project == null)
//                     return Result<bool>.Failure("Project not found", 404);

//                 if (request.StartDate > request.EndDate)
//                     return Result<bool>.Failure("Start date cannot be after end date", 400);

//                 if (request.BillingStartDate > request.BillingEndDate)
//                     return Result<bool>.Failure("Billing start date cannot be after billing end date", 400);

//                 // 1️⃣ Apply updates
//                 project.ProjectName = request.ProjectName;
//                 project.ProjectShortName = request.ProjectShortName;
//                 project.DomainName = request.DomainName;
//                 project.Department = request.Department;
//                 project.ClientName = request.ClientName;

//                 project.DeliveryLeadId = request.DeliveryLeadId;
//                 project.ServiceManagerId = request.ServiceManagerId;

//                 project.StartDate = request.StartDate;
//                 project.EndDate = request.EndDate;
//                 project.BillingStartDate = request.BillingStartDate;
//                 project.BillingEndDate = request.BillingEndDate;

//                 project.ModifiedBy = request.ModifiedBy;
//                 project.ModifiedAt = request.ModifiedAt;


//                 project.ProjectTechStacks.Clear();

// foreach (var techId in request.TechStackIds)
// {
//     project.ProjectTechStacks.Add(new ProjectTechStack
//     {
//         TechStackId = techId
//     });
// }                 
//                 // 2️⃣ Persist
//                 await repository.UpdateProjectAsync(projectId, project);

//                 scope.Complete();
//                 return Result<bool>.Success(true);
//             }
//             catch (Exception ex)
//             {
//                 return Result<bool>.Failure($"Failed to update project: {ex.Message}", 500);
//             }
//         }

//         // ================= DEACTIVATE (SOFT DELETE) =================
//         public async Task<Result<bool>> DeactivateProjectAsync(int projectId)
//         {
//             using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

//             try
//             {
//                 var project = await repository.GetProjectByIdAsync(projectId);
//                 if (project == null)
//                     return Result<bool>.Failure("Project not found", 404);

//                 // Domain behavior
//                 project.Deactivate();

//                 await repository.UpdateProjectAsync(projectId, project);

//                 scope.Complete();
//                 return Result<bool>.Success(true);
//             }
//             catch (Exception ex)
//             {
//                 return Result<bool>.Failure($"Failed to deactivate project: {ex.Message}", 500);
//             }
//         }

//         // ================= READ =================
//         public async Task<List<ProjectDetails>> GetProjectsAsync()
//         {
//             using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

//             try
//             {
//                 var projects = await repository.GetAllProjectsAsync();
//                 scope.Complete();
//                 return projects;
//             }
//             catch
//             {
//                 return new List<ProjectDetails>();
//             }
//         }

//         public async Task<ProjectDetails?> GetProjectByIdAsync(int projectId)
//         {
//             using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

//             try
//             {
//                 var project = await repository.GetProjectByIdAsync(projectId);
//                 scope.Complete();
//                 return project;
//             }
//             catch
//             {
//                 return null;
//             }
//         }

//         // ================= LOOKUPS =================
//         public async Task<List<string>> GetAllProjectNamesAsync()
//         {
//             using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

//             try
//             {
//                 var names = await repository.GetAllProjectNamesAsync();
//                 scope.Complete();
//                 return names;
//             }
//             catch
//             {
//                 return new List<string>();
//             }
//         }

//         public Task<List<string>> GetDomainsAsync() => repository.GetDomainsAsync();
//         public Task<List<string>> GetClientsAsync() => repository.GetClientsAsync();
//         public Task<List<UserDetails>> GetDeliveryLeadsAsync() => repository.GetDeliveryLeadsAsync();
//         public Task<List<UserDetails>> GetServiceManagersAsync() => repository.GetServiceManagersAsync();
//         public Task<List<TechStack>> GetTechStacksAsync() => repository.GetTechStacksAsync();
//     }
// }

using System.Transactions;
using ResourcingPlanner.Domain.Entities;
using ResourcingPlanner.Domain.Interfaces;

namespace ResourcingPlanner.Application.Services
{
    public class ProjectService(IProjectRepository repository)
    {
        // ================= CREATE (INSERT) =================
        public async Task<Result<int>> CreateProjectAsync(ProjectRequest request)
        {
            // 🔹 Basic validations
            if (string.IsNullOrWhiteSpace(request.ProjectName))
                return Result<int>.Failure("Project name is required", 400);

            if (request.ProjectStartDate > request.ProjectEndDate)
                return Result<int>.Failure("Project start date cannot be after project end date", 400);

            if (request.BillingStartDate > request.BillingEndDate)
                return Result<int>.Failure("Billing start date cannot be after billing end date", 400);

            // 1️⃣ Create Domain Entity
            var project = new ProjectDetails
            {
                ProjectName = request.ProjectName,
                ProjectShortName = request.ProjectShortName,
                DomainName = request.DomainName,
                Department = request.Department,
                ClientName = request.ClientName,
                ProjectType = request.ProjectType, 
                DeliveryLeadId = request.DeliveryLeadId,
                ServiceManagerId = request.ServiceManagerId,

                ProjectStartDate = request.ProjectStartDate,
                ProjectEndDate = request.ProjectEndDate,
                BillingStartDate = request.BillingStartDate,
                BillingEndDate = request.BillingEndDate,

                CreatedBy = request.CreatedBy,
                IsActive = true
            };

            // Map Tech Stacks
            foreach (var techId in request.TechStackIds)
            {
                project.ProjectTechStacks.Add(new ProjectTechStack
                {
                    TechStackId = techId
                });
            }

            // 2️⃣ Persist Project
            await repository.AddProjectAsync(project);

            return Result<int>.Success(project.ProjectId);
        }

        // ================= UPDATE =================
        public async Task<Result<bool>> UpdateProjectAsync(int projectId, ProjectRequest request)
        {
            using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

            try
            {
                var project = await repository.GetProjectByIdAsync(projectId);
                if (project == null)
                    return Result<bool>.Failure("Project not found", 404);

                if (request.ProjectStartDate > request.ProjectEndDate)
                    return Result<bool>.Failure("Project start date cannot be after project end date", 400);

                if (request.BillingStartDate > request.BillingEndDate)
                    return Result<bool>.Failure("Billing start date cannot be after billing end date", 400);

                // 1️⃣ Apply updates
                project.ProjectName = request.ProjectName;
                project.ProjectShortName = request.ProjectShortName;
                project.DomainName = request.DomainName;
                project.Department = request.Department;
                project.ClientName = request.ClientName;
                project.ProjectType = request.ProjectType,
                project.DeliveryLeadId = request.DeliveryLeadId;
                project.ServiceManagerId = request.ServiceManagerId;

                project.ProjectStartDate = request.ProjectStartDate;
                project.ProjectEndDate = request.ProjectEndDate;
                project.BillingStartDate = request.BillingStartDate;
                project.BillingEndDate = request.BillingEndDate;

                project.ModifiedBy = request.ModifiedBy;
                project.ModifiedAt = request.ModifiedAt;

                // Update Tech Stacks
                project.ProjectTechStacks.Clear();
                foreach (var techId in request.TechStackIds)
                {
                    project.ProjectTechStacks.Add(new ProjectTechStack
                    {
                        TechStackId = techId
                    });
                }

                // 2️⃣ Persist
                await repository.UpdateProjectAsync(projectId, project);

                scope.Complete();
                return Result<bool>.Success(true);
            }
            catch (Exception ex)
            {
                return Result<bool>.Failure($"Failed to update project: {ex.Message}", 500);
            }
        }

        // ================= DEACTIVATE (SOFT DELETE) =================
        public async Task<Result<bool>> DeactivateProjectAsync(int projectId)
        {
            using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

            try
            {
                var project = await repository.GetProjectByIdAsync(projectId);
                if (project == null)
                    return Result<bool>.Failure("Project not found", 404);

                project.Deactivate();
                await repository.UpdateProjectAsync(projectId, project);

                scope.Complete();
                return Result<bool>.Success(true);
            }
            catch (Exception ex)
            {
                return Result<bool>.Failure($"Failed to deactivate project: {ex.Message}", 500);
            }
        }

        // ================= READ =================
        public async Task<List<ProjectDetails>> GetProjectsAsync()
        {
            using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

            try
            {
                var projects = await repository.GetAllProjectsAsync();
                scope.Complete();
                return projects;
            }
            catch
            {
                return new List<ProjectDetails>();
            }
        }

        public async Task<ProjectDetails?> GetProjectByIdAsync(int projectId)
        {
            using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

            try
            {
                var project = await repository.GetProjectByIdAsync(projectId);
                scope.Complete();
                return project;
            }
            catch
            {
                return null;
            }
        }

        // ================= LOOKUPS =================
        public async Task<List<string>> GetAllProjectNamesAsync()
        {
            using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

            try
            {
                var names = await repository.GetAllProjectNamesAsync();
                scope.Complete();
                return names;
            }
            catch
            {
                return new List<string>();
            }
        }

        public Task<List<string>> GetDomainsAsync() => repository.GetDomainsAsync();
        public Task<List<string>> GetClientsAsync() => repository.GetClientsAsync();
        public Task<List<UserDetails>> GetDeliveryLeadsAsync() => repository.GetDeliveryLeadsAsync();
        public Task<List<UserDetails>> GetServiceManagersAsync() => repository.GetServiceManagersAsync();
        public Task<List<TechStack>> GetTechStacksAsync() => repository.GetTechStacksAsync();
    }
}


