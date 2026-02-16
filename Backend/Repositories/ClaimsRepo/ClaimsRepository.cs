using insurance_brokerage.Data;
using insurance_brokerage.Models;
using Microsoft.EntityFrameworkCore;

namespace insurance_brokerage.Repositories.ClaimsRepo
{
    public class ClaimsRepository : IClaimsRepository
    {
        private readonly AppDbContext _context ;
        public ClaimsRepository(AppDbContext context) {
            _context = context;
        }
        public async Task<IEnumerable<InsuranceClaim>> GetClaimsByUserIdAsync(string userId)
        {
            return await _context.Claims.Where(c => c.UserId == userId).ToListAsync();
        }

        public async Task<InsuranceClaim> AddClaimsAsync(InsuranceClaim claim)
        {
            _context.Claims.Add(claim);
            await _context.SaveChangesAsync();
            return claim;
        }
    }
}
