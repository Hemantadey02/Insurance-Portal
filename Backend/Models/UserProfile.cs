using Microsoft.AspNetCore.Identity;

namespace insurance_brokerage.Models
{
    // IdentityUser provides Id, UserName, Email, PasswordHash
    public class UserProfile : IdentityUser
    {
        public string? FullName { get; set; }
        public string? Address { get; set; }
        public string? KycId { get; set; }

        public ICollection<Policy>? Policies { get; set; }
        public ICollection<ServiceRequest>? Requests { get; set; }
        public ICollection<InsuranceClaim>? Claims { get; set; }
        public ICollection<Message>? Messages { get; set; }
    }
}
