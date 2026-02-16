using insurance_brokerage.Data;
using insurance_brokerage.Models;
using Microsoft.EntityFrameworkCore;

namespace insurance_brokerage.Repositories.PolicyRepo
{
    public class PolicyRepository : IPolicyRepository
    {
        private readonly AppDbContext _context;
        public PolicyRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Policy>> GetPoliciesByUserIdAsync(string userId)
        {
            return await _context.Policies.Where(p => p.UserId == userId).ToListAsync();
        }

        public async Task<Policy> AddPolicyAsync(Policy policy)
        {
            _context.Policies.Add(policy);
            await _context.SaveChangesAsync();
            return policy;
        }
    }
}
