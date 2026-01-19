using insurance_brokerage.Data;
using insurance_brokerage.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace insurance_brokerage.Repositories.ProfileRepo
{
    public class ProfileRepository : IProfileRepository
    {
        private readonly AppDbContext _context;

        public ProfileRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<UserProfile[]> GetAllUsersAsync()
        {
            try
            {
                return await _context.Users.ToArrayAsync();
            }
            catch (Exception ex)
            {
                throw new ApplicationException($"An error occurred while retrieving the profile. {ex}");
            }
        }

        public async Task<UserProfile?> GetProfileAsync(string userId)
        {
            try
            {
                return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            }
            catch (Exception ex)
            {
                throw new ApplicationException($"An error occurred while retrieving the profile. {ex}");
            }
        }

        public async Task<UserProfile?> UpdateProfileAsync(UserProfile user)
        {
            try
            {
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                throw new ApplicationException($"An error occurred while updating the profile. {ex}");
            }
        }
    }
}
