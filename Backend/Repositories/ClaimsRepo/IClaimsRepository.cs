
using insurance_brokerage.Models;

namespace insurance_brokerage.Repositories.ClaimsRepo
{
    public interface IClaimsRepository
    {
        Task<IEnumerable<InsuranceClaim>> GetClaimsByUserIdAsync(string userId);
        Task<InsuranceClaim> AddClaimsAsync(InsuranceClaim claim);
    }
}
