namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class sp_organizacije
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public sp_organizacije()
        {
            dp_brojaci_dokumenata = new HashSet<dp_brojaci_dokumenata>();
            dp_izlazi = new HashSet<dp_izlazi>();
            dp_poslovni_periodi = new HashSet<dp_poslovni_periodi>();
            dp_ulazi = new HashSet<dp_ulazi>();
            dp_zalihe = new HashSet<dp_zalihe>();
        }

        public int ID { get; set; }

        public int SUBJEKT { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_brojaci_dokumenata> dp_brojaci_dokumenata { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_izlazi> dp_izlazi { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_poslovni_periodi> dp_poslovni_periodi { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_ulazi> dp_ulazi { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dp_zalihe> dp_zalihe { get; set; }

        public virtual sp_subjekti sp_subjekti { get; set; }
    }
}
