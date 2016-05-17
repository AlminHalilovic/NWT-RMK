namespace AngularJSAuthentication.API.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class sp_user_files
    {
        public int Id { get; set; }

        [Required]
        [StringLength(300)]
        public string USER_ID { get; set; }

        [Required]
        [StringLength(400)]
        public string URL { get; set; }
    }
}
