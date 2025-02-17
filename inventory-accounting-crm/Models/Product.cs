﻿public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public int CategoryId { get; set; }
    public virtual Category Category { get; set; }
    public int WarehouseId { get; set; }
    public virtual Warehouse Warehouse { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    public virtual ICollection<SupplyItem> SupplyItems { get; set; } = new List<SupplyItem>();
}