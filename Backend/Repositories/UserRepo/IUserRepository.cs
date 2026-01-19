using insurance_brokerage.Models;
using Microsoft.AspNetCore.Identity;

namespace insurance_brokerage.Repositories.User
{
    public interface IUserRepository
    {
        Task<IdentityResult> RegisterAsync(UserProfile user, string password, string role);
        Task<UserProfile> GetUserByIdAsync(string userId);
        Task<UserProfile> FindByNameAsync(string username);
        Task<bool> CheckPasswordAsync(UserProfile user, string password);
        Task<string> GenerateJwtTokenAsync(UserProfile user);
    }
}
