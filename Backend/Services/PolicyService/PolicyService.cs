using insurance_brokerage.Models;
using insurance_brokerage.Repositories.PolicyRepo;

namespace insurance_brokerage.Services.PolicyService
{
    public class PolicyService : IPolicyService
    {
        private readonly IPolicyRepository _repo;
        public PolicyService(IPolicyRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Policy>> GetPoliciesByUserIdAsync(string userId)
        {
            return await _repo.GetPoliciesByUserIdAsync(userId);
        }

        public async Task<Policy> CreatePolicyAsync(Policy policy)
        {
            return await _repo.AddPolicyAsync(policy);
        }

    }
}
