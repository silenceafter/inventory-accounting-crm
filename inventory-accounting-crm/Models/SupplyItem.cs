public class SupplyItem
{
    public int Id { get; set; }
    public int SupplyId { get; set; }
    public virtual Supply Supply { get; set; }
    public int ProductId { get; set; }
    public virtual Product Product { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}