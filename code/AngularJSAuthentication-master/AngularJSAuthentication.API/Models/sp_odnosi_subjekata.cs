namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class sp_odnosi_subjekata
    {
        public int ID { get; set; }

        public int SUBJEKT { get; set; }

        public int KA_SUBJEKTU { get; set; }

        public int VRSTA_ODNOSA { get; set; }

        public virtual sp_vrste_odnosa_subjekata sp_vrste_odnosa_subjekata { get; set; }

        public virtual sp_subjekti sp_subjekti { get; set; }

        public virtual sp_subjekti sp_subjekti1 { get; set; }
    }
}
