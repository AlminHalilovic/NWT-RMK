namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class sp_grupe_proizvoda
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public sp_grupe_proizvoda()
        {
            sp_grupe_proizvoda1 = new HashSet<sp_grupe_proizvoda>();
            sp_proizvodi = new HashSet<sp_proizvodi>();
        }

        public int ID { get; set; }

        [Required]
        [StringLength(25)]
        public string SIFRA { get; set; }

        [Required]
        [StringLength(100)]
        public string NAZIV { get; set; }

        public int? NADGRUPA { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<sp_grupe_proizvoda> sp_grupe_proizvoda1 { get; set; }

        public virtual sp_grupe_proizvoda sp_grupe_proizvoda2 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<sp_proizvodi> sp_proizvodi { get; set; }
    }
}
