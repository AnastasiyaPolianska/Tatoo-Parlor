﻿using AspNetCoreSpa.Server.Services.Abstract;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace AspNetCoreSpa.Server.Services
{
    /// <summary>
    /// The implementation of IFileDownloader interface
    /// </summary>
    public class FileUploader : IFileUploader
    {
        CloudStorageAccount storageAccount = new CloudStorageAccount(
    new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials("tatoostorage", "Yt2q1jNUDUPVl/IkJ991V6MhKW4Fghy9QV5qLK3LGGz5ODi9mMbrGOYbAT5Zp6mND/oypUyLoGMRdkoPrp027w=="), true);


        ///<inheritdoc />
        public async Task<string> UploadImage(Stream fileStream, long imageId, string containerName = "Misc", string fileName = null)
        {
            var storageClient = storageAccount.CreateCloudBlobClient();
            var container = storageClient.GetContainerReference(containerName);

            var cloudBlob = container.GetBlockBlobReference(fileName != null ? fileName :"image"+ imageId+".png");
            try
            {
                await cloudBlob.UploadFromStreamAsync(fileStream);
            }
            catch (Exception e)
            {
                throw;
            }
            return cloudBlob.Uri.AbsoluteUri;
        }

    }
}