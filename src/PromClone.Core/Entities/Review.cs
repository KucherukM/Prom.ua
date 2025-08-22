using System.ComponentModel.DataAnnotations;

namespace PromClone.Core.Entities;

public class Review
{
    public int Id { get; set; }
    
    [Required]
    [Range(1, 5)]
    public int Rating { get; set; }
    
    [StringLength(1000)]
    public string? Comment { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
    
    public bool IsVerified { get; set; }
    
    // Foreign keys
    public int ProductId { get; set; }
    public int UserId { get; set; }
    
    // Navigation properties
    public virtual Product Product { get; set; } = null!;
    public virtual User User { get; set; } = null!;
} 