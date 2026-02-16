using insurance_brokerage.Models;
using insurance_brokerage.Services.PolicyService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace insurance_brokerage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Require authentication for all actions
    public class PolicyConsolidationController : ControllerBase
    {
        private readonly IPolicyService _service;

        public PolicyConsolidationController(IPolicyService service)
        {
            _service = service;
        }
        

        // Accessible by authenticated users (Admin or User)
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Policy>>> GetPoliciesByUserId(string userId)
        {
            // Only allow if the current user is Admin or requesting their own data
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var isAdmin = User.IsInRole("Admin");
            if (!isAdmin && currentUserId != userId)
            {
                return Forbid();
            }

            var policies = await _service.GetPoliciesByUserIdAsync(userId);

            if (policies == null || !policies.Any())
            {
                return NotFound("No Policies found for the given user.");
            }

            return Ok(policies);
        }

        // Post request for policy purchase by user
        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<Policy>> CreatePolicy(Policy policy)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdPolicy = await _service.CreatePolicyAsync(policy);

            return CreatedAtAction(nameof(GetPoliciesByUserId), new { userId = createdPolicy.UserId }, createdPolicy);
        }
    }
}
