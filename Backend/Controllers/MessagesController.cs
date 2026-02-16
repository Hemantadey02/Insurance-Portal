using insurance_brokerage.Models;
using insurance_brokerage.Services.MessagesService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace insurance_brokerage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMessagesService _service;
        public MessagesController(IMessagesService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Message>>> GetAll()
        {
            var messages = await _service.GetAllMessagesAsync();
            return Ok(messages);
        }

        [HttpGet("{userId}")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<IEnumerable<Message>>> GetByUser(string userId)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(currentUserId == userId)
            {
                var messages = await _service.GetMessagesByUserAsync(userId);
                return Ok(messages);
            }
            else
            {
                return BadRequest("User not found!");
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Message>> Create([FromBody] Message message)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdMessage = await _service.AddMessageAsync(message);
            return Ok(createdMessage);
        }
    }
}
