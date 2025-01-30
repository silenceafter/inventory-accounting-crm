public class Warehouse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}