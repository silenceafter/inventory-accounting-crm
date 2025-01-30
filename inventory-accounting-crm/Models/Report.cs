public class Report
{
    public int Id { get; set; }
    public string Title { get; set; }
    public DateTime GeneratedAt { get; set; }
    public string Content { get; set; } // Например, JSON-данные отчета
}