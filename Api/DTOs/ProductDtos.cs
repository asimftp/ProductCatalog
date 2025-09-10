using System.ComponentModel.DataAnnotations;

namespace ProductCatalogApi.DTOs
{
    // DTO (Data Transfer Object) is used to expose only necessary data to clients. 
    // It is recommended to use DTOs instead of exposing EF entity classes directly in APIs to
    // ensuring security and loose coupling between API and database.

    // Base class for common fields
    public class ProductBaseDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        [Required]
        [Range(1.00, 999999.99)]
        public decimal? Price { get; set; }
        public int CategoryId { get; set; }
        public string? ImagePath { get; set; }
    }

    // Read-only DTO with ProductId
    public class ProductDto : ProductBaseDto
    {
        public int ProductId { get; set; }
    }

    // Create DTO
    public class CreateProductDto : ProductBaseDto
    {
        public IFormFile? File { get; set; }
    }

    // Update DTO
    public class UpdateProductDto : ProductBaseDto
    {
        public int ProductId { get; set; } // ID required for update
        public IFormFile? File { get; set; }
    }
}
