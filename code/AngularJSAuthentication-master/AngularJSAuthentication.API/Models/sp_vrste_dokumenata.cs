namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class sp_vrste_dokumenata
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public sp_vrste_dokumenata()
        {
            dp_brojaci_dokumenata = new HashSet<dp_brojaci_dokumenata>();
            dp_inventure = new HashSet<dp_inventure>();
            dp_izlazi = new HashSet<dp_izlazi>();
            dp_ulazi = new HashSet<dp_ulazi>();
        }

        public int ID { get; set; }

        [Required]
        [StringLength(45)]
        public string SIFRA { get; set; }

        [Required]
        [StringLength(150)]
        public string NAZIV { get; set; }

        public int KLASA { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_brojaci_dokumenata> dp_brojaci_dokumenata { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_inventure> dp_inventure { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_izlazi> dp_izlazi { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_ulazi> dp_ulazi { get; set; }

        public virtual sp_klase_dokumenata sp_klase_dokumenata { get; set; }
    }
}
