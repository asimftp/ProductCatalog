using Microsoft.EntityFrameworkCore;
using ProductCatalogApi.Controllers;
using ProductCatalogApi.Data.Entities;
using ProductCatalogApi.Data;
using ProductCatalogApi.DTOs;

namespace ProductCatalogApi.Services
{
    public class ProductService : IProductService
    {
        private readonly ILogger<ProductService> _logger;
        private readonly ProductCatalogDbContext _context;
        private readonly IAzureService _azure;

        public ProductService(ILogger<ProductService> logger, ProductCatalogDbContext context, IAzureService azure)
        {
            _logger = logger;
            _context = context;
            _azure = azure;
        }

        public async Task<IEnumerable<CategoryDto>> GetCategoriesAsync()
        {
            return await _context.Category
                .Select(c => new CategoryDto
                {
                    CategoryId = c.CategoryId,
                    CategoryName = c.CategoryName,
                }
                ).ToListAsync();
        }
        public async Task<IEnumerable<ProductDto>> GetProductsAsync()
        {
            var products = await _context.Product
                    .Select(p => new ProductDto
                    {
                        ProductId = p.ProductId,
                        Name = p.Name!,
                        Description = p.Description,
                        Price = p.Price,
                        CategoryId = p.CategoryId,
                        ImagePath = p.ImagePath,
                    }).ToListAsync();
            foreach (var product in products)
            {
                if (string.IsNullOrEmpty(product.ImagePath)) continue;

                string blobPath = product.ImagePath; //url = container-name/1.jpg
                //Fetch sasUrl (Shared Access Signature URL)
                var response = await _azure.GetSasUrlAsync(blobPath);
                //Replace in DTO
                if (response.Success && !string.IsNullOrEmpty(response.Data))
                {
                    // SAS URL replace which is valid only 1 hour
                    product.ImagePath = response.Data;
                }
            }
            return products;
        }
        public async Task<ProductDto?> GetProductAsync(int id)
        {
            var product = await _context.Product
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.ProductId == id);
            if (product == null) return null;
            if (!string.IsNullOrEmpty(product.ImagePath))
            {
                var blobPath = product.ImagePath;
                var response = await _azure.GetSasUrlAsync(blobPath);
                if (response.Success && !string.IsNullOrEmpty(response.Data))
                {
                    product.ImagePath = response.Data;
                }
            }

            return new ProductDto
            {
                ProductId = product.ProductId,
                Name = product.Name!,
                Description = product.Description,
                Price = product.Price,
                CategoryId = product.CategoryId,
                ImagePath = product.ImagePath,
            };
        }

        public async Task<ProductDto> CreateProductAsync(CreateProductDto productDto)
        {
            var product = new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                CategoryId = productDto.CategoryId,
                ImagePath = productDto.ImagePath,
            };

            //Only execute when file is selected from UI (On Handle Change)
            if (productDto.File != null && productDto.File.Length > 0)
            {
                try
                {
                    var ImagePath = await UploadImage(productDto.File);
                    product.ImagePath = ImagePath;
                }
                catch (Exception ex)
                {
                    throw new Exception($"Image upload failed: {ex.Message}", ex);
                }
            }
            _context.Product.Add(product);
            await _context.SaveChangesAsync();

            // Client will get new product after saving. 
            return new ProductDto
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                CategoryId = product.CategoryId,
                ImagePath = product.ImagePath
            };
        }

        public async Task<bool> UpdateProductAsync(int id, UpdateProductDto productDto)
        {
            var existingProduct = await _context.Product.FindAsync(id);
            if (existingProduct == null) return false;

            existingProduct.Name = productDto.Name;
            existingProduct.Description = productDto.Description;
            existingProduct.Price = productDto.Price;
            existingProduct.CategoryId = productDto.CategoryId;

            //only execute if some use handleImage function
            if (productDto.File != null && productDto.File.Length > 0)
            {
                try
                {
                    // Upload new image and replace old URL productDto.ImagePath is old patch
                    var ImagePath = await UploadImage(productDto.File, existingProduct.ImagePath);
                    existingProduct.ImagePath = ImagePath;
                }
                catch (Exception ex)
                {
                    throw new Exception($"Image upload failed: {ex.Message}", ex);
                }
            }

            _context.Product.Update(existingProduct);
            await _context.SaveChangesAsync();

            return true;

        }
        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _context.Product.FindAsync(id);
            if (product == null) return false;

            // Delete image from Azure if exists
            if (!string.IsNullOrEmpty(product.ImagePath))
            {
                try
                {
                    var deleteResponse = await _azure.DeleteAsync(product.ImagePath);
                    if (!deleteResponse.Success)
                    {
                        // Optional: log warning, continue deletion
                        _logger.LogWarning("Failed to delete image: {Message}", deleteResponse.Message);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Exception while deleting image for product {ProductId}", id);
                }
            }

            _context.Product.Remove(product);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<string> UploadImage(IFormFile image, string? oldFilePath = null)
        {
            try
            {
                var extension = Path.GetExtension(image.FileName);
                var uniqueFileName = $"{Guid.NewGuid()}{extension}";

                //only for Update case
                if (!string.IsNullOrEmpty(oldFilePath))
                {
                    var deleteResult = await _azure.DeleteAsync(oldFilePath);

                    if (!deleteResult.Success)
                        throw new Exception($"Failed to delete old file: {oldFilePath}");
                }
                //Cloud upload
                var uploadResult = await _azure.UploadAsync(image, uniqueFileName);

                if (!uploadResult.Success || string.IsNullOrEmpty(uploadResult.Data))
                    throw new Exception("Image upload failed.");

                return uploadResult.Data;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Image upload error");
                throw;
            }
        }
    }
}
