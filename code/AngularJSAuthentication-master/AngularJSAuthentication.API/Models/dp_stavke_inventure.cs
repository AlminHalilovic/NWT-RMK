namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class dp_stavke_inventure
    {
        public int ID { get; set; }

        public int REDNI_BROJ { get; set; }

        public int ZADUZENO { get; set; }

        public int ZATECENO { get; set; }

        public double CIJENA { get; set; }

        public int JMJERE { get; set; }

        public int PROIZVOD { get; set; }

        public int INVENTURA { get; set; }

        public virtual dp_inventure dp_inventure { get; set; }

        public virtual sp_jedinice_mjera sp_jedinice_mjera { get; set; }

        public virtual sp_proizvodi sp_proizvodi { get; set; }
    }
}
