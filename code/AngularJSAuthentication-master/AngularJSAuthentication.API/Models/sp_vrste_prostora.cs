namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class sp_vrste_prostora
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public sp_vrste_prostora()
        {
            sp_prostori = new HashSet<sp_prostori>();
        }

        public int ID { get; set; }

        [Required]
        [StringLength(45)]
        public string SIFRA { get; set; }

        [Required]
        [StringLength(150)]
        public string NAZIV { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<sp_prostori> sp_prostori { get; set; }
    }
}
