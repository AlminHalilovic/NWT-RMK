namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class sp_kadrovi
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public sp_kadrovi()
        {
            dp_inventure = new HashSet<dp_inventure>();
            dp_izlazi = new HashSet<dp_izlazi>();
            dp_izlazi1 = new HashSet<dp_izlazi>();
            dp_ulazi = new HashSet<dp_ulazi>();
            dp_ulazi1 = new HashSet<dp_ulazi>();
        }

        public int ID { get; set; }

        [Required]
        [StringLength(13)]
        public string JMBG { get; set; }

        public int KLASA { get; set; }

        [Required]
        [StringLength(70)]
        public string IME { get; set; }

        [Required]
        [StringLength(70)]
        public string PREZIME { get; set; }

        [Column(TypeName = "date")]
        public DateTime? DATUM_RODJENJA { get; set; }

        public int? OPCINA_RODJENJA { get; set; }

        public int? DRZAVA_RODJENJA { get; set; }

        [StringLength(200)]
        public string EMAIL { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_inventure> dp_inventure { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_izlazi> dp_izlazi { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_izlazi> dp_izlazi1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_ulazi> dp_ulazi { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_ulazi> dp_ulazi1 { get; set; }

        public virtual sp_klase_kadrova sp_klase_kadrova { get; set; }
    }
}
