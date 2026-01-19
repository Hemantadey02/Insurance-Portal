using insurance_brokerage.Models;

namespace insurance_brokerage.Repositories.ProfileRepo
{
    public interface IProfileRepository
    {
        Task<UserProfile[]?> GetAllUsersAsync();
        Task<UserProfile?> GetProfileAsync(string userId);
        Task<UserProfile?> UpdateProfileAsync(UserProfile user);
    }
}
