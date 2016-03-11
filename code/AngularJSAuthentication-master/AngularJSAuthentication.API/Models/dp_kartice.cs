namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class dp_kartice
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int PERIOD { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ORGANIZACIJA { get; set; }

        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int PROIZVOD { get; set; }

        [Key]
        [Column(Order = 3)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int VRSTA { get; set; }

        [Key]
        [Column(Order = 4, TypeName = "date")]
        public DateTime DATUM { get; set; }

        public int? UL_KOLICINA { get; set; }

        public int? IZ_KOLICINA { get; set; }

        [Key]
        [Column(Order = 5)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int JMJERE { get; set; }

        [Key]
        [Column(Order = 6)]
        public double CIJENA { get; set; }

        [Key]
        [Column(Order = 7)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        [StringLength(200)]
        public string OPIS { get; set; }

        [Key]
        [Column(Order = 8)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int RBR { get; set; }

        [Key]
        [Column(Order = 9)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int DOKUMENT { get; set; }

        [Key]
        [Column(Order = 10, TypeName = "date")]
        public DateTime DATUMUNOSA { get; set; }

        public int? MJESTOTROSKA { get; set; }

        public double? UL_VRIJEDNOST { get; set; }

        public double? IZ_VRIJEDNOST { get; set; }
    }
}
