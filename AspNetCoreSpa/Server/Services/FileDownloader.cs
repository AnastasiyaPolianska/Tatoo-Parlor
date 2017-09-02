using AspNetCoreSpa.Server.Services.Abstract;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Net.Http;

namespace AspNetCoreSpa.Server.Services
{
    /// <summary>
    /// The implementation of IFileDownloader interface
    /// </summary>
    public class FileDownloader : IFileDownloader
    {
        /// <summary>
        /// The path of images directory, is used to download files.
        /// </summary>
        private readonly string imagesDirectoryPath = Directory.GetCurrentDirectory() + "/wwwroot/Images";

        ///<inheritdoc />
        public async Task<string> DownloadImage(string imageUrl, long imageId, string directoryName = "Misc", string fileName=null)
        {
            using (HttpClient client = new HttpClient())
            {
                var responce = await client.GetAsync(imageUrl);
                if (!responce.IsSuccessStatusCode)
                {
                    throw new FileNotFoundException("The file doesn`t exist");
                }

                if (!responce.Content.Headers.ContentType.MediaType.Contains("image"))
                {
                    throw new UnsupportedMediaTypeException("The file is not an image", responce.Content.Headers.ContentType);
                }

                var folderPath = $"{this.imagesDirectoryPath}/{directoryName}";
                var imageExtension = this.GetFileExtension(imageUrl);
                if(string.IsNullOrWhiteSpace(imageExtension))
                {
                    imageExtension = ".png";
                }

                var path = "";
                if (fileName !=null)
                {
                    path = $"{folderPath}/{fileName}{imageExtension}";
                }
                else
                {
                    path = $"{folderPath}/{imageId}{imageExtension}";
                }

                using (Stream targetStream = File.Create(path))
                {
                    await responce.Content.CopyToAsync(targetStream);
                    targetStream.Close();
                }

                return $"./Images/{directoryName}/{imageId}{imageExtension}";
            }
        }

        /// <summary>
        /// Gets the file extension from its url.
        /// </summary>
        /// <param name="fileUrl">The file's url.</param>
        /// <returns>The extension of file or empty string if it doesn`t exist.</returns>
        private string GetFileExtension(string fileUrl)
        {
            return Path.GetExtension(fileUrl);
        }
    }
}