namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class dp_inventure
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public dp_inventure()
        {
            dp_stavke_inventure = new HashSet<dp_stavke_inventure>();
        }

        public int ID { get; set; }

        public int REDNI_BROJ { get; set; }

        [StringLength(200)]
        public string OPIS { get; set; }

        [StringLength(200)]
        public string BROJ_INVENTURE { get; set; }

        [Column(TypeName = "date")]
        public DateTime DATUM { get; set; }

        [Column(TypeName = "date")]
        public DateTime DATUM_UNOSA { get; set; }

        [Required]
        [StringLength(1)]
        public string STATUS { get; set; }

        public int? PREGLEDAO { get; set; }

        public int VRSTA_DOKUMENTA { get; set; }

        public int ORGANIZACIJA { get; set; }

        public int POSLOVNI_PERIOD { get; set; }

        public virtual dp_poslovni_periodi dp_poslovni_periodi { get; set; }

        public virtual sp_subjekti sp_subjekti { get; set; }

        public virtual sp_kadrovi sp_kadrovi { get; set; }

        public virtual sp_vrste_dokumenata sp_vrste_dokumenata { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_stavke_inventure> dp_stavke_inventure { get; set; }
    }
}
