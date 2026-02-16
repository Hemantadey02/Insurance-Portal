using insurance_brokerage.Models;
using insurance_brokerage.Repositories.User;
using System;
using System.Security.Claims;

namespace insurance_brokerage.Services.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<string> RegisterAsync(string username, string email, string password, string role)
        {
            try
            {
                var user = new UserProfile
                {
                    UserName = username,
                    Email = email,
                    FullName = username
                };

                var result = await _userRepository.RegisterAsync(user, password, role);

                if (result.Succeeded)
                    return "User registered successfully!";
                else
                    return string.Join(", ", result.Errors.Select(e => e.Description));
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException($"Password error: {ex.Message}");
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred during registration: {ex.Message}");
            }
        }

        public async Task<LoginResponse> LoginAsync(string username, string password)
        {
            try
            {
                var user = await _userRepository.FindByNameAsync(username);
                if (user == null) throw new UnauthorizedAccessException("Invalid username");

                var validPassword = await _userRepository.CheckPasswordAsync(user, password);
                if (!validPassword) throw new UnauthorizedAccessException("Invalid password");

                var token = await _userRepository.GenerateJwtTokenAsync(user);

                var response = new LoginResponse
                {
                    Token = token,
                    UserId = user.Id,
                    Username = user.UserName,
                    FullName = user.FullName,
                    KycId = user.KycId,
                    Address = user.Address
                };

                return response;
            }
            catch (UnauthorizedAccessException ex)
            {
                throw new UnauthorizedAccessException(ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred during login", ex);
            }
        }


        public async Task<UserDto> GetUserDetailsAsync(ClaimsPrincipal user)
        {
            var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var email = user.FindFirst(ClaimTypes.Email)?.Value;
            var username = user.FindFirst(ClaimTypes.Name)?.Value;
            var roles = user.FindAll(ClaimTypes.Role).Select(r => r.Value).ToList();

            var userProfile = await _userRepository.GetUserByIdAsync(userId);

            return new UserDto
            {
                UserId = userId,
                Email = email,
                Username = username,
                FullName = userProfile?.FullName,
                KycId = userProfile?.KycId,
                Address = userProfile?.Address
            }; 

        }


    }
}
