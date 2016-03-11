namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class sp_klase_kadrova
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public sp_klase_kadrova()
        {
            sp_kadrovi = new HashSet<sp_kadrovi>();
            sp_klase_kadrova1 = new HashSet<sp_klase_kadrova>();
        }

        public int ID { get; set; }

        [Required]
        [StringLength(25)]
        public string SIFRA { get; set; }

        [Required]
        [StringLength(100)]
        public string NAZIV { get; set; }

        public int? NADKLASA { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<sp_kadrovi> sp_kadrovi { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<sp_klase_kadrova> sp_klase_kadrova1 { get; set; }

        public virtual sp_klase_kadrova sp_klase_kadrova2 { get; set; }
    }
}
