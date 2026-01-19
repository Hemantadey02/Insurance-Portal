using insurance_brokerage.Models;
using insurance_brokerage.Services.ProfileService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace insurance_brokerage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet("profiles")]
        public async Task<IActionResult> GetAllProfiles()
        {
            try
            {
                var profiles = await _profileService.GetAllProfileAsync();

                if (profiles == null || profiles.Length == 0)
                {
                    return NotFound(new { message = "No profiles found." });
                }

                return Ok(profiles); 
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error in GetAllProfiles: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while retrieving the profiles.", details = ex.Message });
            }
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetProfile(string userId)
        {
            try
            {
                var profile = await _profileService.GetProfileAsync(userId);
                if (profile == null) return NotFound("User not found");

                return Ok(profile);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error retrieving profile for user {userId}: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving the profile.");
            }
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateProfile(string userId, UpdateProfile updatedProfileData)
        {
            try
            {
                var updated = await _profileService.UpdateProfileAsync(userId, updatedProfileData.FullName, updatedProfileData.Address, updatedProfileData.KycId);
                if (updated == null) return NotFound("User not found");

                return Ok(updated);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error updating profile for user {userId}: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating the profile.");
            }
        }
    }
}
