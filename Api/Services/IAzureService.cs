namespace ProductCatalogApi.Services
{   //1️⃣ Tuple Return
    // Ex - Task<(bool Success, string Message, string? Data)>
    //2️⃣ AzureResponse<T> (Generic Class) ✅ Recommended
    //3️⃣ Minimal API with HttpResults / TypedResults
    //return TypedResults.Ok(result); or BadRequest(result)
    public class AzureResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }
    }

    //Controller ko bas iska pta hoga usko direct AzureService ka kuch pta nahi hoga
    public interface IAzureService
    {
        Task<AzureResponse<string>> UploadAsync(IFormFile file, string blobPath);
        Task<AzureResponse<string>> GetSasUrlAsync(string blobPath);
        Task<AzureResponse<string>> DeleteAsync(string blobPath);
    }
}
