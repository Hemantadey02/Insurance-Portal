using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace insurance_brokerage.Models
{
    public class ServiceRequest
    {
        [Key]
        public long RequestId { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [ForeignKey("UserId")]
        public UserProfile? User { get; set; }
    }
}
