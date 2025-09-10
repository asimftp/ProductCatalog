using ProductCatalogApi.DTOs;

namespace ProductCatalogApi.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetProductsAsync();
        Task<IEnumerable<CategoryDto>> GetCategoriesAsync();
        Task<ProductDto?> GetProductAsync(int id);
        Task<ProductDto> CreateProductAsync(CreateProductDto productDto);
        Task<bool> UpdateProductAsync(int id, UpdateProductDto productDto);
        Task<bool> DeleteProductAsync(int id);
    }
}
