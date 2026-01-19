using insurance_brokerage.Models;
using insurance_brokerage.Repositories.ServiceRequestsRepo;

namespace insurance_brokerage.Services.ServiceRequestsService
{
    public class ServiceRequestsService : IServiceRequestsService
    { 
        private readonly IServiceRequestsRepository _repository;
        public ServiceRequestsService(IServiceRequestsRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<ServiceRequest>> GetAllRequestAsync()
        {
            return await _repository.GetAllAsync();
        }
        public async Task<IEnumerable<ServiceRequest>> GetRequestsByUserAsync(string userId)
        {
            return await _repository.GetByUserAsync(userId);
        }
        public async Task AddRequestAsync(ServiceRequest serviceRequest)
        {
            await _repository.AddAsync(serviceRequest);
        }
        public async Task<ServiceRequest> GetRequestByRequestIdAsync(long requestId, string userId, bool isAdmin)
        {
            return await _repository.GetByRequestIdAsync(requestId, userId, isAdmin);
        }
        public async Task<ServiceRequest> UpdateRequestAsync(long requestId, string requestStatus)
        {
            return await _repository.UpdateAsync(requestId, requestStatus);
        }
    }
}
