namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class dp_poslovni_periodi
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public dp_poslovni_periodi()
        {
            dp_inventure = new HashSet<dp_inventure>();
            dp_izlazi = new HashSet<dp_izlazi>();
            dp_ulazi = new HashSet<dp_ulazi>();
        }

        public int ID { get; set; }

        [Column(TypeName = "date")]
        public DateTime OD_DATUMA { get; set; }

        [Column(TypeName = "date")]
        public DateTime DO_DATUMA { get; set; }

        public int ORGANIZACIJA { get; set; }

        public int GODINA { get; set; }

        public int METODA_KALKULACIJE { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_inventure> dp_inventure { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_izlazi> dp_izlazi { get; set; }

        public virtual dp_metode_kalkulacije dp_metode_kalkulacije { get; set; }

        public virtual sp_organizacije sp_organizacije { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_ulazi> dp_ulazi { get; set; }
    }
}
