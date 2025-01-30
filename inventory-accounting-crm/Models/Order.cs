using Microsoft.AspNetCore.Identity;

public class Order
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public string UserId { get; set; } // Идентификатор пользователя, сделавшего заказ
    public virtual IdentityUser User { get; set; } // Связь с пользователем

    public int? CustomerId { get; set; } // Внешний ключ для связи с клиентом
    public virtual Customer Customer { get; set; } // Связь с клиентом

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public decimal TotalPrice => OrderItems.Sum(oi => oi.Price * oi.Quantity);
}