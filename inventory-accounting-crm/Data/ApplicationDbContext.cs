using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<IdentityUser>
{
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Report> Reports { get; set; }
    public DbSet<Setting> Settings { get; set; }
    public DbSet<StockOperation> StockOperations { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    public DbSet<Supply> Supplies { get; set; }
    public DbSet<SupplyItem> SupplyItems { get; set; }
    public DbSet<Warehouse> Warehouses { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Связь Product - Category
        modelBuilder.Entity<Product>()
            .HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        // Связь Product - Warehouse
        modelBuilder.Entity<Product>()
            .HasOne(p => p.Warehouse)
            .WithMany(w => w.Products)
            .HasForeignKey(p => p.WarehouseId)
            .OnDelete(DeleteBehavior.Cascade);

        // Связь Order - User
        modelBuilder.Entity<Order>()
            .HasOne(o => o.User)
            .WithMany()
            .HasForeignKey(o => o.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // Связь Order - OrderItem
        modelBuilder.Entity<Order>()
            .HasMany(o => o.OrderItems)
            .WithOne(oi => oi.Order)
            .HasForeignKey(oi => oi.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        // Связь OrderItem - Product
        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Product)
            .WithMany()
            .HasForeignKey(oi => oi.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        // Связь Supply - Supplier
        modelBuilder.Entity<Supply>()
            .HasOne(s => s.Supplier)
            .WithMany(sp => sp.Supplies)
            .HasForeignKey(s => s.SupplierId)
            .OnDelete(DeleteBehavior.Cascade);

        // Связь Supply - SupplyItem
        modelBuilder.Entity<Supply>()
            .HasMany(s => s.SupplyItems)
            .WithOne(si => si.Supply)
            .HasForeignKey(si => si.SupplyId)
            .OnDelete(DeleteBehavior.Cascade);

        // Связь SupplyItem - Product
        modelBuilder.Entity<SupplyItem>()
            .HasOne(si => si.Product)
            .WithMany()
            .HasForeignKey(si => si.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        // Связь StockOperation - Product
        modelBuilder.Entity<StockOperation>()
            .HasOne(so => so.Product)
            .WithMany()
            .HasForeignKey(so => so.ProductId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}