using System.ComponentModel.DataAnnotations;

namespace PromClone.Core.Entities;

public class OrderItem
{
    public int Id { get; set; }
    
    [Required]
    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }
    
    [Required]
    [Range(0, double.MaxValue)]
    public decimal UnitPrice { get; set; }
    
    [Required]
    [Range(0, double.MaxValue)]
    public decimal TotalPrice { get; set; }
    
    // Foreign keys
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    
    // Navigation properties
    public virtual Order Order { get; set; } = null!;
    public virtual Product Product { get; set; } = null!;
} 