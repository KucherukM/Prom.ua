using System.ComponentModel.DataAnnotations;

namespace PromClone.Core.Entities;

public class ProductImage
{
    public int Id { get; set; }
    
    [Required]
    public string ImageUrl { get; set; } = string.Empty;
    
    [StringLength(255)]
    public string? AltText { get; set; }
    
    public bool IsPrimary { get; set; }
    
    public int DisplayOrder { get; set; }
    
    // Foreign key
    public int ProductId { get; set; }
    
    // Navigation property
    public virtual Product Product { get; set; } = null!;
} 