namespace ResourcingPlanner.Application.DTOs.Project
{
    public record ProjectRequest
    (
        string ProjectName,
        string ProjectShortName,
        string DomainName,
        string Department,
        string ClientName,

        int DeliveryLeadId,
        int ServiceManagerId,

        DateOnly ProjectStartDate,
        DateOnly ProjectEndDate,
        DateOnly BillingStartDate,
        DateOnly BillingEndDate,

        List<int> TechStackIds,   // 👈 comes from Angular

        string CreatedBy,
        string? ModifiedBy,
        DateTime? ModifiedAt
    );
}
