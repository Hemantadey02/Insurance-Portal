using insurance_brokerage.Models;

namespace insurance_brokerage.Services.PolicyService
{
    public interface IPolicyService
    {
        Task<IEnumerable<Policy>> GetPoliciesByUserIdAsync(string userId);
        Task<Policy> CreatePolicyAsync(Policy policy);

    }
}
