using insurance_brokerage.Models;

namespace insurance_brokerage.Services.ProfileService
{
    public interface IProfileService
    {
        Task<object[]?> GetAllProfileAsync();
        Task<object?> GetProfileAsync(string userId);
        Task<object?> UpdateProfileAsync(string userId, string fullName, string address, string kycId);
    }
}
