using Microsoft.EntityFrameworkCore;
using ProductCatalogApi.Data.Entities;

namespace ProductCatalogApi.Data
{
    public class ProductCatalogDbContext : DbContext
    {
        public ProductCatalogDbContext(DbContextOptions<ProductCatalogDbContext> options)
            : base(options)
        {
        }

        public DbSet<Category> Category { get; set; }
        public DbSet<Product> Product { get; set; }

        // Optional: If you want extra config not possible with annotations
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Example: Default value (since annotation doesn’t support GETDATE())
            modelBuilder.Entity<Product>()
                .Property(p => p.CreatedDate)
                .HasDefaultValueSql("GETDATE()");
        }
    }
}
