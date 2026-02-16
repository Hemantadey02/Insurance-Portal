using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace insurance_brokerage.Models
{
    public class Message
    {
        [Key]
        public long MessageId { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public string Content { get; set; }
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        [ForeignKey("UserId")]
        public UserProfile? User { get; set; }
    }
}
