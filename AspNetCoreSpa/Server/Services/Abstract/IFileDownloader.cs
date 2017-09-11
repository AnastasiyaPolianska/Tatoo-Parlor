using System.IO;
using System.Threading.Tasks;

namespace AspNetCoreSpa.Server.Services.Abstract
{
    /// <summary>
    /// The interface for file downloader.
    /// </summary>
    public interface IFileUploader
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileStream"></param>
        /// <param name="imageId"></param>
        /// <param name="containerName"></param>
        /// <param name="fileName"></param>
        /// <returns></returns>
        Task<string> UploadImage(Stream fileStream, long imageId, string containerName = "Misc", string fileName = null);
    }
}