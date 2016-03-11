namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class dp_stavke_ulaza
    {
        public int ID { get; set; }

        public int REDNI_BROJ { get; set; }

        public int JEDINICA_MJERE { get; set; }

        public int PROIZVOD { get; set; }

        public double CIJENA { get; set; }

        public int ULAZ { get; set; }

        public int STANJE { get; set; }

        public int KOLICINA { get; set; }

        public virtual sp_jedinice_mjera sp_jedinice_mjera { get; set; }

        public virtual sp_proizvodi sp_proizvodi { get; set; }

        public virtual dp_ulazi dp_ulazi { get; set; }
    }
}
