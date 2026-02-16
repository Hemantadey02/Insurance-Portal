using insurance_brokerage.Models;

namespace insurance_brokerage.Repositories.MessagesRepo
{
    public interface IMessagesRepository
    {
        Task<IEnumerable<Message>> GetAllAsync(); // Admin use
        Task<IEnumerable<Message>> GetByUserAsync(string userId); // All messages for a specific user
        Task<Message> AddAsync(Message message); // Create a new message by admin to a user
    }
}
