using insurance_brokerage.Models;

namespace insurance_brokerage.Services.MessagesService
{
    public interface IMessagesService
    {
        Task<IEnumerable<Message>> GetAllMessagesAsync(); // Admin use
        Task<IEnumerable<Message>> GetMessagesByUserAsync(string userId); // All messages for a specific user
        Task<Message> AddMessageAsync(Message message); // Create a new message by admin to a user
    }
}
