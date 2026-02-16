using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace insurance_brokerage.Models
{
    public class Policy
    {
        [Key]
        public long PolicyId { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public string Insurer { get; set; }
        [Required]
        public string PolicyType { get; set; }
        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Premium { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public DateTime Expiry { get; set; }
        [ForeignKey("UserId")]
        public UserProfile? User { get; set; }
    }
}
