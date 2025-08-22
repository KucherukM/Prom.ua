using System.ComponentModel.DataAnnotations;

namespace PromClone.Core.Entities;

public class Product
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;
    
    [StringLength(1000)]
    public string? Description { get; set; }
    
    [Required]
    [Range(0, double.MaxValue)]
    public decimal Price { get; set; }
    
    [Range(0, double.MaxValue)]
    public decimal? OriginalPrice { get; set; }
    
    [Range(0, 100)]
    public int? DiscountPercentage { get; set; }
    
    [Range(0, int.MaxValue)]
    public int StockQuantity { get; set; }
    
    public string? ImageUrl { get; set; }
    
    public string? Brand { get; set; }
    
    public string? Model { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    // Foreign keys
    public int CategoryId { get; set; }
    public int SellerId { get; set; }
    
    // Navigation properties
    public virtual Category Category { get; set; } = null!;
    public virtual User Seller { get; set; } = null!;
    public virtual ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
} 