using insurance_brokerage.Models;

namespace insurance_brokerage.Repositories.PolicyRepo
{
    public interface IPolicyRepository
    {
        Task<IEnumerable<Policy>> GetPoliciesByUserIdAsync(string userId);
        Task<Policy>AddPolicyAsync(Policy policy);
    }
}
