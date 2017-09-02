using System.Threading.Tasks;

namespace AspNetCoreSpa.Server.Services.Abstract
{
    /// <summary>
    /// The interface for file downloader.
    /// </summary>
    public interface IFileDownloader
    {
        /// <summary>
        /// Downloads the image to images folder.
        /// </summary>
        /// <param name="imageUrl">Url of the image.</param>
        /// <param name="imageId">Id of the image.</param>
        /// <param name="directoryName">Name of the sudirectory inside Images folder.</param>
        /// <param name="FileName">The nae of file. If name is not specified, Id is used.</param>
        /// <returns>The relative path to image.</returns>
        /// <exception cref="FileNotFoundException">If file with given url doesn`t exist.</exception>
        /// <exception cref="UnsupportedMediaTypeException">If file with given url isn`t an image.</exception>
        Task<string> DownloadImage(string imageUrl, long imageId, string directoryName, string FileName = null); 
    }
}
