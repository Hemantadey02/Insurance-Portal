using insurance_brokerage.Models;
using insurance_brokerage.Repositories.ClaimsRepo;
using System.ComponentModel.DataAnnotations;

namespace insurance_brokerage.Services.ClaimsService
{
    public class ClaimsService : IClaimsService
    {
        private readonly IClaimsRepository _repo;

        public ClaimsService(IClaimsRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<InsuranceClaim>> GetClaimsByUserIdAsync(string userId)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentNullException(nameof(userId), "User ID cannot be null or empty.");
            }

            var claims = await _repo.GetClaimsByUserIdAsync(userId);

            if (claims == null || !claims.Any())
            {
                throw new Exception($"No claims found for user ID: {userId}");
            }

            return claims;
        }

        public async Task<InsuranceClaim> CreateClaimsAsync(InsuranceClaim claim)
        {
            // Basic validation
            if (claim == null)
            {
                throw new ArgumentNullException(nameof(claim), "Claim object cannot be null.");
            }
            if (claim.ClaimAmt <= 0)
            {
                throw new ValidationException("Claim amount must be greater than zero.");
            }
            return await _repo.AddClaimsAsync(claim);
        }
    }
}