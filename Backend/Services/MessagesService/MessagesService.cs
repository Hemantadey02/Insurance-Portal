using insurance_brokerage.Models;
using insurance_brokerage.Repositories.MessagesRepo;

namespace insurance_brokerage.Services.MessagesService
{
    public class MessagesService : IMessagesService
    {
        private readonly IMessagesRepository _repository;
        public MessagesService(IMessagesRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<Message>> GetAllMessagesAsync()
        {
            return await _repository.GetAllAsync();
        }
        public async Task<IEnumerable<Message>> GetMessagesByUserAsync(string userId)
        {
            return await _repository.GetByUserAsync(userId);
        }
        public async Task<Message> AddMessageAsync(Message message)
        {
            return await _repository.AddAsync(message);
        }
    }
}
