using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace insurance_brokerage.Models
{
    public class InsuranceClaim
    {
        [Key]
        public long ClaimId { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public long PolicyId { get; set; }
        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal ClaimAmt { get; set; }
        [Required]
        public string Status { get; set; }
        public DateTime FiledAt { get; set; } = DateTime.UtcNow;
        [ForeignKey("UserId")]
        public UserProfile? User { get; set; }
        [ForeignKey("PolicyId")]
        public Policy? Policy { get; set; }
    }
}
