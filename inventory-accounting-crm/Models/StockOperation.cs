public class StockOperation
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string Type { get; set; } // "In" или "Out"
    public int ProductId { get; set; }
    public virtual Product Product { get; set; }
    public int Quantity { get; set; }
}