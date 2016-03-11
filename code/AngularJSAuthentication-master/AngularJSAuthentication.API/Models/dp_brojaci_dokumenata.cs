namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class dp_brojaci_dokumenata
    {
        public int ID { get; set; }

        public int REDNI_BROJ { get; set; }

        public int VRSTA_DOKUMENTA { get; set; }

        public int ORGANIZACIJA { get; set; }

        public int GODINA { get; set; }

        public virtual sp_organizacije sp_organizacije { get; set; }

        public virtual sp_vrste_dokumenata sp_vrste_dokumenata { get; set; }
    }
}
