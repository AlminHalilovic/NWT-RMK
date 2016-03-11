namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class dp_zalihe
    {
        public int ID { get; set; }

        public int? UKUPAN_ULAZ { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ZADNJI_ULAZ { get; set; }

        public int? UKUPAN_IZLAZ { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ZADNJI_IZLAZ { get; set; }

        public int STANJE { get; set; }

        public double CIJENA { get; set; }

        public int PROIZVOD { get; set; }

        public int ORGANIZACIJA { get; set; }

        public int JEDINICA_MJERE { get; set; }

        public virtual sp_jedinice_mjera sp_jedinice_mjera { get; set; }

        public virtual sp_organizacije sp_organizacije { get; set; }

        public virtual sp_proizvodi sp_proizvodi { get; set; }
    }
}
