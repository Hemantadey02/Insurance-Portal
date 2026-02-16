using insurance_brokerage.Models;

namespace insurance_brokerage.Repositories.ServiceRequestsRepo
{
    public interface IServiceRequestsRepository
    {
        Task<IEnumerable<ServiceRequest>> GetAllAsync(); // Admin use
        Task<IEnumerable<ServiceRequest>> GetByUserAsync(string userId); // All requests for a specific user
        Task AddAsync(ServiceRequest serviceRequest); // Create a new service request by a user
        Task<ServiceRequest> GetByRequestIdAsync(long requestId, string userId, bool isAdmin); // Get a specific request by ID, with admin check
        Task<ServiceRequest> UpdateAsync(long requestId, string requestStatus); // Update the status of a specific request
    }
}
