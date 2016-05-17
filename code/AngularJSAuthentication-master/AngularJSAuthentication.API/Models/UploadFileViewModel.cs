using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularJSAuthentication.API.Models
{
    public class UploadFileViewModel
    {
        public string base64String { get; set; }
        public string extension { get; set; }
        public string name { get; set; }
    }
}
