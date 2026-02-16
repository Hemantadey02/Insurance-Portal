using insurance_brokerage.Models;
using insurance_brokerage.Services.ClaimsService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace insurance_brokerage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ClaimsController : ControllerBase
    {
        public readonly IClaimsService _claimsService;
        public ClaimsController(IClaimsService claimsService)
        {
            _claimsService = claimsService;
        }
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<InsuranceClaim>>> GetClaimsByUserId(string userId) {
            var claims = await _claimsService.GetClaimsByUserIdAsync(userId);


            if (claims == null || !claims.Any())
            {
                return NotFound("No Claims found for the given user.");
            }
            return Ok(claims);
        }
        [HttpPost]
        public async Task<ActionResult<InsuranceClaim>> CreateClaims(InsuranceClaim claim)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdClaims = await _claimsService.CreateClaimsAsync(claim);

            return CreatedAtAction(nameof(GetClaimsByUserId), new { userId = createdClaims.UserId }, createdClaims);
        }
    }
}
