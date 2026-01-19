using insurance_brokerage.Models;
using System.Security.Claims;

namespace insurance_brokerage.Services.User
{
    public interface IUserService
    {
        Task<string> RegisterAsync(string username, string email, string password, string role);
        Task<LoginResponse> LoginAsync(string username, string password);
        Task<UserDto> GetUserDetailsAsync(ClaimsPrincipal user);
    }
}
