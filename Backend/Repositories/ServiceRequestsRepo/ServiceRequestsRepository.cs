using insurance_brokerage.Data;
using insurance_brokerage.Models;
using Microsoft.EntityFrameworkCore;

namespace insurance_brokerage.Repositories.ServiceRequestsRepo
{
    public class ServiceRequestsRepository : IServiceRequestsRepository
    {
        private readonly AppDbContext _context;
        public ServiceRequestsRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ServiceRequest>> GetAllAsync()
        {
            return await _context.Requests.ToListAsync();
        }
        public async Task<IEnumerable<ServiceRequest>> GetByUserAsync(string userId)
        {
            return await _context.Requests.Where(r => r.UserId == userId)
                .ToListAsync();
        }
        public async Task AddAsync(ServiceRequest request)
        {
            request.Status = "Pending";
            await _context.Requests.AddAsync(request);
            await _context.SaveChangesAsync();
        }
        public async Task<ServiceRequest> GetByRequestIdAsync(long requestId, string userId, bool isAdmin)
        {
            var query = _context.Requests.AsQueryable();
            if (!isAdmin)
            {
                query = query.Where(r => r.UserId == userId);
            }
            return await query.FirstOrDefaultAsync(r => r.RequestId == requestId);
        }
        public async Task<ServiceRequest> UpdateAsync(long requestId, string requestStatus)
        {
            var existingRequest = await _context.Requests.FindAsync(requestId);
            existingRequest.Status = requestStatus;
            await _context.SaveChangesAsync();
            return existingRequest;
        }
    }
}
