using insurance_brokerage.Data;
using insurance_brokerage.Models;
using Microsoft.EntityFrameworkCore;

namespace insurance_brokerage.Repositories.MessagesRepo
{
    public class MessagesRepository : IMessagesRepository
    {
        private readonly AppDbContext _context;
        public MessagesRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Message>> GetAllAsync()
        {
            return await _context.Messages.ToListAsync();
        }
        public async Task<IEnumerable<Message>> GetByUserAsync(string userId)
        {
            return await _context.Messages
                .Where(m => m.UserId == userId)
                .ToListAsync();
        }
        public async Task<Message> AddAsync(Message message)
        {
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
            return message;
        }
    }
}
