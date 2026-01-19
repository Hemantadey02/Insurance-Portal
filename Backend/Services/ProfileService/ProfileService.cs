using insurance_brokerage.Models;
using insurance_brokerage.Repositories.ProfileRepo;
using System;

namespace insurance_brokerage.Services.ProfileService
{
    public class ProfileService : IProfileService
    {
        private readonly IProfileRepository _profileRepository;

        public ProfileService(IProfileRepository profileRepository)
        {
            _profileRepository = profileRepository;
        }


        public async Task<object[]?> GetAllProfileAsync()
        {
            try
            {
                var users = await _profileRepository.GetAllUsersAsync();
                if (users == null) return null;

                var profiles = users.Select(user => new
                {
                    user.FullName,
                    user.Address,
                    user.KycId,
                    user.Id,
                    user.UserName,
                    user.NormalizedUserName,
                    user.Email
                }).ToArray();  

                return profiles;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while retrieving the profile.");
            }
        }
        public async Task<object?> GetProfileAsync(string userId)
        {
            try
            {
                var user = await _profileRepository.GetProfileAsync(userId);
                if (user == null) return null;

                return new
                {
                    user.FullName,
                    user.Address,
                    user.KycId,
                    user.Id,
                    user.UserName,
                    user.NormalizedUserName,
                    user.Email
                };
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error retrieving profile for user {userId}: {ex.Message}");
                throw new ApplicationException("An error occurred while retrieving the profile.");
            }
        }

        public async Task<object?> UpdateProfileAsync(string userId, string fullName, string address, string kycId)
        {
            try
            {
                var user = await _profileRepository.GetProfileAsync(userId);
                if (user == null) return null;

                user.FullName = fullName;
                user.Address = address;
                user.KycId = kycId;

                var updatedUser = await _profileRepository.UpdateProfileAsync(user);

                return new
                {
                    updatedUser.FullName,
                    updatedUser.Address,
                    updatedUser.KycId,
                    updatedUser.Id,
                    updatedUser.UserName,
                    updatedUser.NormalizedUserName,
                    updatedUser.Email
                };
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error updating profile for user {userId}: {ex.Message}");
                throw new ApplicationException("An error occurred while updating the profile.");
            }
        }
    }
}
