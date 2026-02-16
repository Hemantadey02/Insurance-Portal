using insurance_brokerage.Models;
using insurance_brokerage.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace insurance_brokerage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel requestUser)
        {
            try
            {
                var result = await _userService.RegisterAsync(requestUser.Username, requestUser.Email, requestUser.Password, requestUser.Role);

                if (result.StartsWith("Password error"))
                    return BadRequest(result);

                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while processing your request.", details = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel requestUser)
        {
            try
            {
                var loginResponse = await _userService.LoginAsync(requestUser.Username, requestUser.Password);

                return Ok(new
                {
                    loginResponse.Token,
                    loginResponse.UserId,
                    loginResponse.Username,
                    loginResponse.FullName,
                    loginResponse.KycId,
                    loginResponse.Address
                });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while processing your request.", details = ex.Message });
            }

        }


        [Authorize]
        [HttpGet("user-details")]
        public async Task<IActionResult> GetUserDetails()
        {
            var userDetails = await _userService.GetUserDetailsAsync(User);
            return Ok(userDetails);
        }


    }
}
