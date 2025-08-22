using System.ComponentModel.DataAnnotations;

namespace PromClone.Core.Entities;

public class Order
{
    public int Id { get; set; }
    
    [Required]
    public string OrderNumber { get; set; } = string.Empty;
    
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    
    public DateTime? ShippedDate { get; set; }
    
    public DateTime? DeliveredDate { get; set; }
    
    [Required]
    [Range(0, double.MaxValue)]
    public decimal TotalAmount { get; set; }
    
    [Range(0, double.MaxValue)]
    public decimal ShippingCost { get; set; }
    
    [Range(0, double.MaxValue)]
    public decimal TaxAmount { get; set; }
    
    public string Status { get; set; } = "Pending";
    
    public string? ShippingAddress { get; set; }
    
    public string? BillingAddress { get; set; }
    
    public string? Notes { get; set; }
    
    // Foreign keys
    public int UserId { get; set; }
    
    // Navigation properties
    public virtual User User { get; set; } = null!;
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
} 