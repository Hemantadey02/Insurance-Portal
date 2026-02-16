using insurance_brokerage.Models;
using insurance_brokerage.Services.ServiceRequestsService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace insurance_brokerage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceRequestsController : ControllerBase
    {
        private readonly IServiceRequestsService _service;
        public ServiceRequestsController(IServiceRequestsService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<ServiceRequest>>> GetAll()
        {
            var requests = await _service.GetAllRequestAsync();
            if (requests == null || !requests.Any())
            {
                return NotFound("No service requests found.");
            }
            return Ok(requests);
        }

        [HttpGet("{userId}")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<IEnumerable<ServiceRequest>>> GetAll(string userId)
        {
            var requests = await _service.GetRequestsByUserAsync(userId);
            if (requests == null || !requests.Any())
            {
                return NotFound("No service requests found for the given user.");
            }
            return Ok(requests);
        }

        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<ServiceRequest>> Create([FromBody] ServiceRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _service.AddRequestAsync(request);
            return Ok(request);
        }

        [HttpGet("request/{requestId}")]
        [Authorize(Roles = "User,Admin")]
        public async Task<ActionResult<ServiceRequest>> GetById(long requestId, string userId)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var isAdmin = User.IsInRole("Admin");
            //var request = await _service.GetRequestByRequestIdAsync(requestId, userId, isAdmin);
            if (currentUserId == userId)
            {
                var request = await _service.GetRequestByRequestIdAsync(requestId, userId, isAdmin);
                if (request == null)
                {
                    return NotFound("Service request not found or access denied.");
                }
                return Ok(request);
            }
            else
            {
                return NotFound("UserId does not match.");
            }
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        [Route("update/{requestId}")]
        public async Task<ActionResult<ServiceRequest>> UpdateStatus(long requestId, [FromBody] string requestStatus)
        {
            if (string.IsNullOrWhiteSpace(requestStatus))
            {
                return BadRequest("Request status cannot be empty.");
            }
            var updatedRequest = await _service.UpdateRequestAsync(requestId, requestStatus);
            if (updatedRequest == null)
            {
                return NotFound("Service request not found.");
            }
            return Ok(updatedRequest);
        }
    }
}
