using insurance_brokerage.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace insurance_brokerage.Repositories.User
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<UserProfile> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _config;

        public UserRepository(
            UserManager<UserProfile> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration config)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _config = config;
        }

        public async Task<IdentityResult> RegisterAsync(UserProfile user, string password, string role)
        {
            try
            {
                var passwordValid = await CheckPasswordPolicyAsync(password);
                if (!passwordValid)
                {
                    throw new InvalidOperationException("Password does not meet the required policy. Must contain atlest 1 Uppercase, 1 Spacial Character and atlest 8 characters");
                }

                var result = await _userManager.CreateAsync(user, password);

                if (!await _roleManager.RoleExistsAsync(role))
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                }

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, role);
                }

                return result;
            }
            catch (InvalidOperationException ex)
            {
                var errorMessages = new List<IdentityError>
                {
                    new IdentityError { Description = ex.Message }
                };
                throw new InvalidOperationException($"{ex}");
            }
            catch (Exception ex)
            {
                var errorMessages = new List<IdentityError>
                {
                    new IdentityError { Description = $"An unexpected error occurred: {ex.Message}" }
                };
                return IdentityResult.Failed(errorMessages.ToArray());
            }
        }


        public async Task<UserProfile> GetUserByIdAsync(string userId)
        {
            return await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);
        }


        private async Task<bool> CheckPasswordPolicyAsync(string password)
        {
            var passwordValidator = new PasswordValidator<UserProfile>();
            var validationResult = await passwordValidator.ValidateAsync(_userManager, null, password);

            return validationResult.Succeeded;
        }

        public async Task<UserProfile> FindByNameAsync(string username)
        {
            return await _userManager.FindByNameAsync(username);
        }

        public async Task<bool> CheckPasswordAsync(UserProfile user, string password)
        {
            return await _userManager.CheckPasswordAsync(user, password);
        }

        public async Task<string> GenerateJwtTokenAsync(UserProfile user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }


            var authSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
