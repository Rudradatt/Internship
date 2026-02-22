using Microsoft.AspNetCore.Mvc;
using ResourcingPlanner.Application.Common;
using ResourcingPlanner.Application.Services;
using ResourcingPlanner.Application.Features.Projects;

namespace ResourcingPlanner.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(ProjectService service) : ControllerBase
{
    // ================= CREATE =================
    [HttpPost("create")]
    public async Task<IActionResult> Create(ProjectRequest request)
    {
        var result = await service.CreateProjectAsync(request);

        if (!result.IsSuccess)
        {
            return BadRequest(new ApiResponse<object>(false, null, result.Error));
        }

        return Ok(new ApiResponse<int>(true, result.Value));
    }

    // ================= UPDATE =================
    [HttpPut("{projectId}")]
    public async Task<IActionResult> Update(int projectId, ProjectRequest request)
    {
        var result = await service.UpdateProjectAsync(projectId, request);

        return result.IsSuccess
            ? Ok(new ApiResponse<string>(true, "Project updated successfully"))
            : BadRequest(new ApiResponse<object>(false, null, result.Error));
    }

    // ================= DEACTIVATE (SOFT DELETE) =================
    [HttpDelete("{projectId}")]
    public async Task<IActionResult> Deactivate(int projectId)
    {
        var result = await service.DeactivateProjectAsync(projectId);

        return result.IsSuccess
            ? Ok(new ApiResponse<string>(true, "Project deactivated successfully"))
            : BadRequest(new ApiResponse<object>(false, null, result.Error));
    }

    // ================= READ =================
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var projects = await service.GetProjectsAsync();
        return Ok(new ApiResponse<object>(true, projects));
    }

    [HttpGet("{projectId}")]
    public async Task<IActionResult> GetById(int projectId)
    {
        var project = await service.GetProjectByIdAsync(projectId);

        if (project == null)
        {
            return NotFound(new ApiResponse<object>(false, null, "Project not found"));
        }

        return Ok(new ApiResponse<object>(true, project));
    }

    // ================= LOOKUPS =================
    [HttpGet("names")]
    public async Task<IActionResult> GetProjectNames()
    {
        var names = await service.GetAllProjectNamesAsync();
        return Ok(new ApiResponse<object>(true, names));
    }

    [HttpGet("domains")]
    public async Task<IActionResult> GetDomains()
    {
        var domains = await service.GetDomainsAsync();
        return Ok(new ApiResponse<object>(true, domains));
    }

    [HttpGet("clients")]
    public async Task<IActionResult> GetClients()
    {
        var clients = await service.GetClientsAsync();
        return Ok(new ApiResponse<object>(true, clients));
    }

    [HttpGet("delivery-leads")]
    public async Task<IActionResult> GetDeliveryLeads()
    {
        var leads = await service.GetDeliveryLeadsAsync();
        return Ok(new ApiResponse<object>(true, leads));
    }

    [HttpGet("service-managers")]
    public async Task<IActionResult> GetServiceManagers()
    {
        var managers = await service.GetServiceManagersAsync();
        return Ok(new ApiResponse<object>(true, managers));
    }

    [HttpGet("tech-stacks")]
    public async Task<IActionResult> GetTechStacks()
    {
        var techStacks = await service.GetTechStacksAsync();
        return Ok(new ApiResponse<object>(true, techStacks));
    }
}