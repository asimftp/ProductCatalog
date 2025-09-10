using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProductCatalogApi.Data.Entities
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }

        [Required, MaxLength(100)]
        public string? CategoryName { get; set; } = string.Empty;

        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
