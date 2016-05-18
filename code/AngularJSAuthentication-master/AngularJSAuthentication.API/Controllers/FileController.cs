using AngularJSAuthentication.API.Infrastructure;
using AngularJSAuthentication.API.Models;
using AngularJSAuthentication.Models.API;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace AngularJSAuthentication.API.Controllers
{
    [RoutePrefix("api/FileAPI")]
    [Authorize(Roles = "Administrator")]
    public class FileController : ApiController
    {

        private ApplicationDbContext db = new ApplicationDbContext();
        private materijalno materijalno = new materijalno();
        [HttpPost]
        [Route("UploadFile")]
        public async void UploadFile()
        {
            string input = "";
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = 100000000;
            using (var reader = new StreamReader(HttpContext.Current.Request.InputStream))
            {
                input = reader.ReadToEnd();
            }
            Dictionary<string, object> obj = (Dictionary<string, object>)serializer.DeserializeObject(input);
            string fileName = obj["name"].ToString();
            string base64String = obj["base64String"].ToString();
            string extension = obj["extension"].ToString();
            Byte[] bytes = Convert.FromBase64String(base64String.Substring(base64String.IndexOf(",") + 1));
            await UploadPhotoAsync(bytes, extension, fileName);
        }

        [HttpGet]
        [Route("GetFiles")]
        public string GetFiles()
        {
            /* StorageCredentials creds = new StorageCredentials("rwportalvhds3h1495pxbkfr", "B1QdjmL4Tl7kGfakR6Cg8h8l7KzBmbm2XXgGX6Q/L/JmeYNtNaOt2ME32kysJj6t4Q0xCyUtrAaXvHZeJIa+ig==");
             CloudStorageAccount storageAccount = new CloudStorageAccount(creds, false);
             // Create the blob client and reference the container
             CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
             CloudBlobContainer container = blobClient.GetContainerReference("files");
             IEnumerable<IListBlobItem> blobs = container.ListBlobs();*/
            ApplicationUser user = db.Users.Where(x => x.UserName == User.Identity.Name).FirstOrDefault();
            var jsonResult = materijalno.sp_user_files.Where(y => y.USER_ID == user.Id).Select(x => new { url = x.URL }).ToList();
            string json = JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        public async Task<string> UploadPhotoAsync(byte[] bytes, string extension, string name)
        {

            string fullPath = null;
            Stopwatch timespan = Stopwatch.StartNew();

            try
            {
                StorageCredentials creds = new StorageCredentials("rwportalvhds3h1495pxbkfr", "B1QdjmL4Tl7kGfakR6Cg8h8l7KzBmbm2XXgGX6Q/L/JmeYNtNaOt2ME32kysJj6t4Q0xCyUtrAaXvHZeJIa+ig==");
                CloudStorageAccount storageAccount = new CloudStorageAccount(creds, false);

                // Create the blob client and reference the container
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference("files");

                // Create a unique name for the images we are about to upload
                string fileName = String.Format("{0}-{1}{2}",
                    name,
                    Guid.NewGuid().ToString(),
                    extension);

                // Upload file to Blob Storage
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(fileName);
                await blockBlob.UploadFromByteArrayAsync(bytes, 0, bytes.Length);

                // Convert to be HTTP based URI (default storage path is HTTPS)
                var uriBuilder = new UriBuilder(blockBlob.Uri);
                uriBuilder.Scheme = "http";
                fullPath = uriBuilder.ToString();

                ApplicationUser user = db.Users.Where(x => x.UserName == User.Identity.Name).FirstOrDefault();
                sp_user_files user_file = new sp_user_files();
                user_file.URL = fullPath;
                user_file.USER_ID = user.Id;
                materijalno.sp_user_files.Add(user_file);
                materijalno.SaveChanges();
                timespan.Stop();
            }
            catch (Exception ex)
            {

            }

            return fullPath;
        }
    }
}
