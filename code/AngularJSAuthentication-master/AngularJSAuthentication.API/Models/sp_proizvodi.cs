namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class sp_proizvodi
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public sp_proizvodi()
        {
            dp_stavke_inventure = new HashSet<dp_stavke_inventure>();
            dp_stavke_izlaza = new HashSet<dp_stavke_izlaza>();
            dp_stavke_ulaza = new HashSet<dp_stavke_ulaza>();
            dp_zalihe = new HashSet<dp_zalihe>();
        }

        public int ID { get; set; }

        [Required]
        [StringLength(25)]
        public string SIFRA { get; set; }

        [Required]
        [StringLength(100)]
        public string NAZIV { get; set; }

        public int JEDINICA_MJERE { get; set; }

        public int GRUPA_PROIZVODA { get; set; }

        [Required]
        [StringLength(20)]
        public string BARCODE { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_stavke_inventure> dp_stavke_inventure { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_stavke_izlaza> dp_stavke_izlaza { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_stavke_ulaza> dp_stavke_ulaza { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_zalihe> dp_zalihe { get; set; }

        public virtual sp_grupe_proizvoda sp_grupe_proizvoda { get; set; }

        public virtual sp_jedinice_mjera sp_jedinice_mjera { get; set; }
    }
}
