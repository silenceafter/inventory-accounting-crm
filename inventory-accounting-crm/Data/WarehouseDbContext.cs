using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class WarehouseDbContext : IdentityDbContext<IdentityUser>
{
    public DbSet<Warehouse> Warehouses { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<StockOperation> StockOperations { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    public DbSet<Supply> Supplies { get; set; }
    public DbSet<SupplyItem> SupplyItems { get; set; }
    public DbSet<Report> Reports { get; set; }
    public DbSet<Setting> Settings { get; set; }

    public WarehouseDbContext(DbContextOptions<WarehouseDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Конфигурация отношений между моделями

        // Связь Product - Category
        modelBuilder.Entity<Product>()
            .HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.CategoryId);

        // Связь Product - Warehouse
        modelBuilder.Entity<Product>()
            .HasOne(p => p.Warehouse)
            .WithMany(w => w.Products)
            .HasForeignKey(p => p.WarehouseId);

        // Связь StockOperation - Product
        modelBuilder.Entity<StockOperation>()
            .HasOne(so => so.Product)
            .WithMany()
            .HasForeignKey(so => so.ProductId);

        // Связь Order - Customer
        modelBuilder.Entity<Order>()
            .HasOne(o => o.Customer)
            .WithMany(c => c.Orders)
            .HasForeignKey(o => o.CustomerId);

        // Связь Order - OrderItem
        modelBuilder.Entity<Order>()
            .HasMany(o => o.OrderItems)
            .WithOne(oi => oi.Order)
            .HasForeignKey(oi => oi.OrderId);

        // Связь OrderItem - Product
        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Product)
            .WithMany()
            .HasForeignKey(oi => oi.ProductId);

        // Связь Supply - Supplier
        modelBuilder.Entity<Supply>()
            .HasOne(s => s.Supplier)
            .WithMany(sp => sp.Supplies)
            .HasForeignKey(s => s.SupplierId);

        // Связь Supply - SupplyItem
        modelBuilder.Entity<Supply>()
            .HasMany(s => s.SupplyItems)
            .WithOne(si => si.Supply)
            .HasForeignKey(si => si.SupplyId);

        // Связь SupplyItem - Product
        modelBuilder.Entity<SupplyItem>()
            .HasOne(si => si.Product)
            .WithMany()
            .HasForeignKey(si => si.ProductId);
    }
}