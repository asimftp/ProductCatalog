using Azure;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ProductCatalogApi.Configurations;

namespace ProductCatalogApi.Services
{
    public class AzureService : IAzureService
    {
        private readonly BlobContainerClient _containerClient;

        public AzureService(IOptions<AzureStorageOptions> options)
        {
            var settings = options.Value;
            var blobServiceClient = new BlobServiceClient(settings.ConnectionString);
            _containerClient = blobServiceClient.GetBlobContainerClient(settings.ContainerName);
        }

        public async Task<AzureResponse<string>> UploadAsync(IFormFile file, string fileName)
        {
            try
            {
                var blobClient = _containerClient.GetBlobClient(fileName);

                using (var stream = file.OpenReadStream())
                {
                    await blobClient.UploadAsync(stream, overwrite: true);
                }

                return new AzureResponse<string>
                {
                    Success = true,
                    Message = "File uploaded successfully.",
                    Data = $"{fileName}"
                };
            }
            catch (RequestFailedException ex)
            {
                return new AzureResponse<string>
                {
                    Success = false,
                    Message = $"Azure request failed: {ex.Message}"
                };
            }
            catch (Exception ex)
            {
                return new AzureResponse<string>
                {
                    Success = false,
                    Message = $"Unexpected error: {ex.Message}"
                };
            }
        }
        /// <summary>
        ///  //Fetch sasUrl (Shared Access Signature URL)
        /// </summary>
        /// <param name="blobPath"></param>
        /// <returns></returns>
        public async Task<AzureResponse<string>> GetSasUrlAsync(string blobPath)
        {
            try
            {
                var blobClient = _containerClient.GetBlobClient(blobPath);
                if (!await blobClient.ExistsAsync())
                    return new AzureResponse<string>
                    {
                        Success = false,
                        Message = "Blob not found."
                    };

                var sasBuilder = new BlobSasBuilder
                {
                    BlobContainerName = _containerClient.Name,
                    BlobName = blobPath,
                    Resource = "b",
                    ExpiresOn = DateTimeOffset.UtcNow.AddHours(1)
                };

                sasBuilder.SetPermissions(BlobSasPermissions.Read);

                var sasUri = blobClient.GenerateSasUri(sasBuilder);
                return new AzureResponse<string>
                {
                    Success = true,
                    Message = "SAS URL generated successfully.",
                    Data = sasUri.ToString()
                };
            }
            catch (Exception ex)
            {
                return new AzureResponse<string>
                {
                    Success = false,
                    Message = $"Error generating SAS URL: {ex.Message}"
                };
            }
        }

        public async Task<AzureResponse<string>> DeleteAsync(string blobPath)
        {
            try
            {
                var blobClient = _containerClient.GetBlobClient(blobPath);
                await blobClient.DeleteIfExistsAsync();
                return new AzureResponse<string>
                {
                    Success = true,
                    Message = "File deleted successfully.",
                    Data = blobPath
                };
            }
            catch (Exception ex)
            {
                return new AzureResponse<string>
                {
                    Success = false,
                    Message = $"Error deleting file: {ex.Message}"
                };
            }
        }
    }
}
