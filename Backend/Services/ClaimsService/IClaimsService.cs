using insurance_brokerage.Models;

namespace insurance_brokerage.Services.ClaimsService
{
    public interface IClaimsService
    {
        Task<IEnumerable<InsuranceClaim>> GetClaimsByUserIdAsync(string userId);
        Task<InsuranceClaim> CreateClaimsAsync(InsuranceClaim claim);
    }
}
