namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class sp_subjekti
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public sp_subjekti()
        {
            dp_inventure = new HashSet<dp_inventure>();
            dp_izlazi = new HashSet<dp_izlazi>();
            dp_izlazi1 = new HashSet<dp_izlazi>();
            dp_ulazi = new HashSet<dp_ulazi>();
            sp_odnosi_subjekata = new HashSet<sp_odnosi_subjekata>();
            sp_odnosi_subjekata1 = new HashSet<sp_odnosi_subjekata>();
            sp_organizacije = new HashSet<sp_organizacije>();
        }

        public int ID { get; set; }

        [Required]
        [StringLength(25)]
        public string SIFRA { get; set; }

        [Required]
        [StringLength(200)]
        public string NAZIV { get; set; }

        [Required]
        [StringLength(12)]
        public string PDV_BROJ { get; set; }

        [Required]
        [StringLength(45)]
        public string PORESKI_BROJ { get; set; }

        [StringLength(200)]
        public string ADRESA { get; set; }

        public int? MJESTO { get; set; }

        [StringLength(200)]
        public string KONTAKT_OSOBA { get; set; }

        [StringLength(200)]
        public string EMAIL { get; set; }

        [StringLength(20)]
        public string TELEFON { get; set; }

        [StringLength(25)]
        public string FAX { get; set; }

        public int? OPCINA { get; set; }

        public int? DRZAVA { get; set; }

        public int VRSTA_SUBJEKTA { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_inventure> dp_inventure { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_izlazi> dp_izlazi { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_izlazi> dp_izlazi1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_ulazi> dp_ulazi { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<sp_odnosi_subjekata> sp_odnosi_subjekata { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<sp_odnosi_subjekata> sp_odnosi_subjekata1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<sp_organizacije> sp_organizacije { get; set; }

        public virtual sp_prostori sp_prostori { get; set; }

        public virtual sp_prostori sp_prostori1 { get; set; }

        public virtual sp_vrste_subjekata sp_vrste_subjekata { get; set; }
    }
}
