namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class dp_metode_kalkulacije
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public dp_metode_kalkulacije()
        {
            dp_poslovni_periodi = new HashSet<dp_poslovni_periodi>();
        }

        public int ID { get; set; }

        [Required]
        [StringLength(45)]
        public string SIFRA { get; set; }

        [Required]
        [StringLength(100)]
        public string NAZIV { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_poslovni_periodi> dp_poslovni_periodi { get; set; }
    }
}
