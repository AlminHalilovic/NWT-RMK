namespace AngularJSAuthentication.Models.API
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using AngularJSAuthentication.API.Models;
    public partial class materijalno : DbContext
    {
        public materijalno()
            : base("name=materijalno")
        {
        }

        public virtual DbSet<dp_brojaci_dokumenata> dp_brojaci_dokumenata { get; set; }
        public virtual DbSet<dp_inventure> dp_inventure { get; set; }
        public virtual DbSet<dp_izlazi> dp_izlazi { get; set; }
        public virtual DbSet<dp_metode_kalkulacije> dp_metode_kalkulacije { get; set; }
        public virtual DbSet<dp_poslovni_periodi> dp_poslovni_periodi { get; set; }
        public virtual DbSet<dp_stavke_inventure> dp_stavke_inventure { get; set; }
        public virtual DbSet<dp_stavke_izlaza> dp_stavke_izlaza { get; set; }
        public virtual DbSet<dp_stavke_ulaza> dp_stavke_ulaza { get; set; }
        public virtual DbSet<dp_ulazi> dp_ulazi { get; set; }
        public virtual DbSet<dp_zalihe> dp_zalihe { get; set; }
        public virtual DbSet<sp_grupe_proizvoda> sp_grupe_proizvoda { get; set; }
        public virtual DbSet<sp_jedinice_mjera> sp_jedinice_mjera { get; set; }
        public virtual DbSet<sp_kadrovi> sp_kadrovi { get; set; }
        public virtual DbSet<sp_klase_dokumenata> sp_klase_dokumenata { get; set; }
        public virtual DbSet<sp_klase_kadrova> sp_klase_kadrova { get; set; }
        public virtual DbSet<sp_odnosi_subjekata> sp_odnosi_subjekata { get; set; }
        public virtual DbSet<sp_organizacije> sp_organizacije { get; set; }
        public virtual DbSet<sp_proizvodi> sp_proizvodi { get; set; }
        public virtual DbSet<sp_prostori> sp_prostori { get; set; }
        public virtual DbSet<sp_subjekti> sp_subjekti { get; set; }
        public virtual DbSet<sp_vrste_dokumenata> sp_vrste_dokumenata { get; set; }
        public virtual DbSet<sp_vrste_odnosa_subjekata> sp_vrste_odnosa_subjekata { get; set; }
        public virtual DbSet<sp_vrste_prostora> sp_vrste_prostora { get; set; }
        public virtual DbSet<sp_vrste_subjekata> sp_vrste_subjekata { get; set; }
        public virtual DbSet<dp_kartice> dp_kartice { get; set; }
        public virtual DbSet<sp_user_files> sp_user_files { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<dp_inventure>()
                .HasMany(e => e.dp_stavke_inventure)
                .WithRequired(e => e.dp_inventure)
                .HasForeignKey(e => e.INVENTURA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<dp_izlazi>()
                .HasMany(e => e.dp_stavke_izlaza)
                .WithRequired(e => e.dp_izlazi)
                .HasForeignKey(e => e.IZLAZ)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<dp_metode_kalkulacije>()
                .HasMany(e => e.dp_poslovni_periodi)
                .WithRequired(e => e.dp_metode_kalkulacije)
                .HasForeignKey(e => e.METODA_KALKULACIJE)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<dp_poslovni_periodi>()
                .HasMany(e => e.dp_inventure)
                .WithRequired(e => e.dp_poslovni_periodi)
                .HasForeignKey(e => e.POSLOVNI_PERIOD)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<dp_poslovni_periodi>()
                .HasMany(e => e.dp_izlazi)
                .WithRequired(e => e.dp_poslovni_periodi)
                .HasForeignKey(e => e.POSLOVNI_PERIOD)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<dp_poslovni_periodi>()
                .HasMany(e => e.dp_ulazi)
                .WithRequired(e => e.dp_poslovni_periodi)
                .HasForeignKey(e => e.POSLOVNI_PERIOD)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<dp_ulazi>()
                .HasMany(e => e.dp_stavke_ulaza)
                .WithRequired(e => e.dp_ulazi)
                .HasForeignKey(e => e.ULAZ)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_grupe_proizvoda>()
                .HasMany(e => e.sp_grupe_proizvoda1)
                .WithOptional(e => e.sp_grupe_proizvoda2)
                .HasForeignKey(e => e.NADGRUPA);

            modelBuilder.Entity<sp_grupe_proizvoda>()
                .HasMany(e => e.sp_proizvodi)
                .WithRequired(e => e.sp_grupe_proizvoda)
                .HasForeignKey(e => e.GRUPA_PROIZVODA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_jedinice_mjera>()
                .HasMany(e => e.dp_stavke_inventure)
                .WithRequired(e => e.sp_jedinice_mjera)
                .HasForeignKey(e => e.JMJERE)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_jedinice_mjera>()
                .HasMany(e => e.dp_stavke_izlaza)
                .WithRequired(e => e.sp_jedinice_mjera)
                .HasForeignKey(e => e.JEDINICA_MJERE)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_jedinice_mjera>()
                .HasMany(e => e.dp_stavke_ulaza)
                .WithRequired(e => e.sp_jedinice_mjera)
                .HasForeignKey(e => e.JEDINICA_MJERE)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_jedinice_mjera>()
                .HasMany(e => e.dp_zalihe)
                .WithRequired(e => e.sp_jedinice_mjera)
                .HasForeignKey(e => e.JEDINICA_MJERE)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_jedinice_mjera>()
                .HasMany(e => e.sp_proizvodi)
                .WithRequired(e => e.sp_jedinice_mjera)
                .HasForeignKey(e => e.JEDINICA_MJERE)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_kadrovi>()
                .HasMany(e => e.dp_inventure)
                .WithOptional(e => e.sp_kadrovi)
                .HasForeignKey(e => e.PREGLEDAO);

            modelBuilder.Entity<sp_kadrovi>()
                .HasMany(e => e.dp_izlazi)
                .WithOptional(e => e.sp_kadrovi)
                .HasForeignKey(e => e.PREDAO);

            modelBuilder.Entity<sp_kadrovi>()
                .HasMany(e => e.dp_izlazi1)
                .WithOptional(e => e.sp_kadrovi1)
                .HasForeignKey(e => e.PRIMIO);

            modelBuilder.Entity<sp_kadrovi>()
                .HasMany(e => e.dp_ulazi)
                .WithOptional(e => e.sp_kadrovi)
                .HasForeignKey(e => e.PREDAO);

            modelBuilder.Entity<sp_kadrovi>()
                .HasMany(e => e.dp_ulazi1)
                .WithOptional(e => e.sp_kadrovi1)
                .HasForeignKey(e => e.PRIMIO);

            modelBuilder.Entity<sp_klase_dokumenata>()
                .HasMany(e => e.sp_vrste_dokumenata)
                .WithRequired(e => e.sp_klase_dokumenata)
                .HasForeignKey(e => e.KLASA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_klase_kadrova>()
                .HasMany(e => e.sp_kadrovi)
                .WithRequired(e => e.sp_klase_kadrova)
                .HasForeignKey(e => e.KLASA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_klase_kadrova>()
                .HasMany(e => e.sp_klase_kadrova1)
                .WithOptional(e => e.sp_klase_kadrova2)
                .HasForeignKey(e => e.NADKLASA);

            modelBuilder.Entity<sp_organizacije>()
                .HasMany(e => e.dp_brojaci_dokumenata)
                .WithRequired(e => e.sp_organizacije)
                .HasForeignKey(e => e.ORGANIZACIJA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_organizacije>()
                .HasMany(e => e.dp_izlazi)
                .WithRequired(e => e.sp_organizacije)
                .HasForeignKey(e => e.OD_SUBJEKTA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_organizacije>()
                .HasMany(e => e.dp_poslovni_periodi)
                .WithRequired(e => e.sp_organizacije)
                .HasForeignKey(e => e.ORGANIZACIJA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_organizacije>()
                .HasMany(e => e.dp_ulazi)
                .WithRequired(e => e.sp_organizacije)
                .HasForeignKey(e => e.ZA_SUBJEKTA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_organizacije>()
                .HasMany(e => e.dp_zalihe)
                .WithRequired(e => e.sp_organizacije)
                .HasForeignKey(e => e.ORGANIZACIJA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_proizvodi>()
                .HasMany(e => e.dp_stavke_inventure)
                .WithRequired(e => e.sp_proizvodi)
                .HasForeignKey(e => e.PROIZVOD)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_proizvodi>()
                .HasMany(e => e.dp_stavke_izlaza)
                .WithRequired(e => e.sp_proizvodi)
                .HasForeignKey(e => e.PROIZVOD)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_proizvodi>()
                .HasMany(e => e.dp_stavke_ulaza)
                .WithRequired(e => e.sp_proizvodi)
                .HasForeignKey(e => e.PROIZVOD)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_proizvodi>()
                .HasMany(e => e.dp_zalihe)
                .WithRequired(e => e.sp_proizvodi)
                .HasForeignKey(e => e.PROIZVOD)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_prostori>()
                .HasMany(e => e.sp_subjekti)
                .WithOptional(e => e.sp_prostori)
                .HasForeignKey(e => e.DRZAVA);

            modelBuilder.Entity<sp_prostori>()
                .HasMany(e => e.sp_subjekti1)
                .WithOptional(e => e.sp_prostori1)
                .HasForeignKey(e => e.OPCINA);

            modelBuilder.Entity<sp_subjekti>()
                .HasMany(e => e.dp_inventure)
                .WithRequired(e => e.sp_subjekti)
                .HasForeignKey(e => e.ORGANIZACIJA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_subjekti>()
                .HasMany(e => e.dp_izlazi)
                .WithRequired(e => e.sp_subjekti)
                .HasForeignKey(e => e.MJESTO_TROSKA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_subjekti>()
                .HasMany(e => e.dp_izlazi1)
                .WithRequired(e => e.sp_subjekti1)
                .HasForeignKey(e => e.ZA_SUBJEKTA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_subjekti>()
                .HasMany(e => e.dp_ulazi)
                .WithRequired(e => e.sp_subjekti)
                .HasForeignKey(e => e.OD_SUBJEKTA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_subjekti>()
                .HasMany(e => e.sp_odnosi_subjekata)
                .WithRequired(e => e.sp_subjekti)
                .HasForeignKey(e => e.KA_SUBJEKTU)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_subjekti>()
                .HasMany(e => e.sp_odnosi_subjekata1)
                .WithRequired(e => e.sp_subjekti1)
                .HasForeignKey(e => e.SUBJEKT)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_subjekti>()
                .HasMany(e => e.sp_organizacije)
                .WithRequired(e => e.sp_subjekti)
                .HasForeignKey(e => e.SUBJEKT)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_vrste_dokumenata>()
                .HasMany(e => e.dp_brojaci_dokumenata)
                .WithRequired(e => e.sp_vrste_dokumenata)
                .HasForeignKey(e => e.VRSTA_DOKUMENTA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_vrste_dokumenata>()
                .HasMany(e => e.dp_inventure)
                .WithRequired(e => e.sp_vrste_dokumenata)
                .HasForeignKey(e => e.VRSTA_DOKUMENTA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_vrste_dokumenata>()
                .HasMany(e => e.dp_izlazi)
                .WithRequired(e => e.sp_vrste_dokumenata)
                .HasForeignKey(e => e.VRSTA_DOKUMENTA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_vrste_dokumenata>()
                .HasMany(e => e.dp_ulazi)
                .WithRequired(e => e.sp_vrste_dokumenata)
                .HasForeignKey(e => e.VRSTA_DOKUMENTA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_vrste_odnosa_subjekata>()
                .HasMany(e => e.sp_odnosi_subjekata)
                .WithRequired(e => e.sp_vrste_odnosa_subjekata)
                .HasForeignKey(e => e.VRSTA_ODNOSA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_vrste_prostora>()
                .HasMany(e => e.sp_prostori)
                .WithRequired(e => e.sp_vrste_prostora)
                .HasForeignKey(e => e.VRSTA_PROSTORA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_vrste_subjekata>()
                .HasMany(e => e.sp_subjekti)
                .WithRequired(e => e.sp_vrste_subjekata)
                .HasForeignKey(e => e.VRSTA_SUBJEKTA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<sp_user_files>();
                 
        }
    }
}
