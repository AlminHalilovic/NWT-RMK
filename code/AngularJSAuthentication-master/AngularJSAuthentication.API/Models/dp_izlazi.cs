namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class dp_izlazi
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public dp_izlazi()
        {
            dp_stavke_izlaza = new HashSet<dp_stavke_izlaza>();
        }

        public int ID { get; set; }

        public int REDNI_BROJ { get; set; }

        [StringLength(100)]
        public string BROJ_PRIMKE { get; set; }

        [Column(TypeName = "date")]
        public DateTime DATUM { get; set; }

        [Column(TypeName = "date")]
        public DateTime DATUM_UNOSA { get; set; }

        [StringLength(200)]
        public string OPIS { get; set; }

        public double? IZNOS { get; set; }

        [Required]
        [StringLength(1)]
        public string STATUS { get; set; }

        public int? PREDAO { get; set; }

        public int? PRIMIO { get; set; }

        public int OD_SUBJEKTA { get; set; }

        public int ZA_SUBJEKTA { get; set; }

        public int MJESTO_TROSKA { get; set; }

        public int? POVRAT { get; set; }

        public int VRSTA_DOKUMENTA { get; set; }

        public int POSLOVNI_PERIOD { get; set; }

        public virtual sp_subjekti sp_subjekti { get; set; }

        public virtual sp_organizacije sp_organizacije { get; set; }

        public virtual dp_poslovni_periodi dp_poslovni_periodi { get; set; }

        public virtual sp_kadrovi sp_kadrovi { get; set; }

        public virtual sp_kadrovi sp_kadrovi1 { get; set; }

        public virtual sp_vrste_dokumenata sp_vrste_dokumenata { get; set; }

        public virtual sp_subjekti sp_subjekti1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_stavke_izlaza> dp_stavke_izlaza { get; set; }
    }
}
