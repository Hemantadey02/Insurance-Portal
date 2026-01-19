using insurance_brokerage.Models;

namespace insurance_brokerage.Services.ServiceRequestsService
{
    public interface IServiceRequestsService
    {
        Task<IEnumerable<ServiceRequest>> GetAllRequestAsync(); // Admin use
        Task<IEnumerable<ServiceRequest>> GetRequestsByUserAsync(string userId); // All requests for a specific user
        Task AddRequestAsync(ServiceRequest serviceRequest); // Create a new service request by a user
        Task<ServiceRequest> GetRequestByRequestIdAsync(long requestId, string userId, bool isAdmin); // Get a specific request by ID, with admin check
        Task<ServiceRequest> UpdateRequestAsync(long requestId, string requestStatus); // Update the status of a specific request
    }
}
