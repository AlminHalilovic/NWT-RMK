using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AngularJSAuthentication.Models.API;
using Newtonsoft.Json;
using System.Web;
using System.IO;
using System.Web.Script.Serialization;

namespace AngularJSAuthentication.API.Controllers
{
    [RoutePrefix("api/StornoPocetnoStanjeAPI")]
    //[Authorize]
    public class StornoPocetnoStanjeAPIController : ApiController
    {
        private materijalno db = new materijalno();

        // GET: api/PrimkaAPI
        public string Getdp_ulazi()
        {
            var jsonResult = db.dp_ulazi.Where(y => y.VRSTA_DOKUMENTA == 4).Select(x => new {
                id = x.ID,
                povrat = x.POVRAT,
                broj_primke = x.BROJ_PRIMKE,
                redni_broj = x.REDNI_BROJ,
                datum = x.DATUM,
                datum_unosa = x.DATUM_UNOSA,
                opis = x.OPIS,
                dostavnica = x.DOSTAVNICA,
                isStavkaShown = false
            }).ToList();
            string json = JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        // GET: api/PrimkaAPI/5
        [ResponseType(typeof(dp_ulazi))]
        public IHttpActionResult Getdp_ulazi(int id)
        {
            dp_ulazi dp_ulazi = db.dp_ulazi.Find(id);
            if (dp_ulazi == null)
            {
                return NotFound();
            }

            return Ok(dp_ulazi);
        }

        public string Getdp_ulazi(int id, string model)
        {
            var jsonResult = db.dp_stavke_ulaza.Where(y => y.ULAZ == id).Select(x => new {
                id = x.ID,
                redni_broj = x.REDNI_BROJ,
                proizvodNaziv = x.sp_proizvodi.NAZIV,
                proizvod = x.PROIZVOD,
                kolicina = x.KOLICINA,
                cijena = Math.Round(x.CIJENA, 3),
                sifra_jmjere = x.sp_jedinice_mjera.SIFRA,
                jedinica_mjere = x.JEDINICA_MJERE
            }).ToList();
            string json = JsonConvert.SerializeObject(jsonResult);
            return json;
        }


        // PUT: api/PrimkaAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putdp_ulazi(int id, dp_ulazi dp_ulazi)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != dp_ulazi.ID)
            {
                return BadRequest();
            }

            db.Entry(dp_ulazi).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!dp_ulaziExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/PrimkaAPI
        public string Postdp_ulazi()
        {
            string response = "";
            string input = "";
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            using (var reader = new StreamReader(HttpContext.Current.Request.InputStream))
            {
                input = reader.ReadToEnd();
            }
            if (input == "")
            {
                response = JsonConvert.SerializeObject(new
                {
                    ok = false,
                    message = "Desila se greška pri unosu dokumenta!",
                });
            }
            else
            {
                Dictionary<string, object> obj = (Dictionary<string, object>)serializer.DeserializeObject(input);
                Dictionary<string, object> master = (Dictionary<string, object>)obj["master"];
                object[] details = (object[])obj["detail"];

                dp_ulazi ulaz = new dp_ulazi();
                ulaz.BROJ_PRIMKE = master["broj_primke"].ToString();
                ulaz.DOSTAVNICA = master["dostavnica"].ToString();
                ulaz.ZA_SUBJEKTA = Convert.ToInt32(master["skladiste"]);
                ulaz.OD_SUBJEKTA = Convert.ToInt32(master["dobavljac"]);
                ulaz.OPIS = master["opis"].ToString();
                ulaz.DATUM = Convert.ToDateTime(master["datum"]);
                ulaz.POVRAT = Convert.ToInt32(master["povrat"]);
                ulaz.VRSTA_DOKUMENTA = 4;
                ulaz.POSLOVNI_PERIOD = 2;
                ulaz.DATUM_UNOSA = DateTime.Now;
                ulaz.STATUS = "D";

                var brojac_dokumenata = db.dp_brojaci_dokumenata
                                          .Where(x => (x.VRSTA_DOKUMENTA == ulaz.VRSTA_DOKUMENTA && x.ORGANIZACIJA == ulaz.ZA_SUBJEKTA))
                                          .FirstOrDefault();

                var redniBroj = 1;
                var godina = DateTime.Now.Year;
                if (brojac_dokumenata != null)
                {
                    redniBroj = brojac_dokumenata.REDNI_BROJ + 1;
                    brojac_dokumenata.REDNI_BROJ = redniBroj;
                }
                else
                {
                    brojac_dokumenata = new dp_brojaci_dokumenata();
                    brojac_dokumenata.ORGANIZACIJA = ulaz.ZA_SUBJEKTA;
                    brojac_dokumenata.REDNI_BROJ = redniBroj;
                    brojac_dokumenata.GODINA = godina;
                    brojac_dokumenata.VRSTA_DOKUMENTA = 4;
                    db.dp_brojaci_dokumenata.Add(brojac_dokumenata);
                }

                ulaz.REDNI_BROJ = redniBroj;

                try
                {
                    db.dp_ulazi.Add(ulaz);
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    response = JsonConvert.SerializeObject(new
                    {
                        ok = false,
                        message = "Desila se greška pri unosu zaglavlja!"
                    });
                    return response;
                }
                List<int> ids = new List<int>();
                for (int i = 0; i < details.Length; i++)
                {
                    Dictionary<string, object> stavka = (Dictionary<string, object>)details[i];
                    dp_stavke_ulaza stavka_ulaza = new dp_stavke_ulaza();
                    stavka_ulaza.ULAZ = ulaz.ID;
                    stavka_ulaza.JEDINICA_MJERE = Convert.ToInt32(stavka["jedinica_mjere"]);
                    stavka_ulaza.KOLICINA = Convert.ToInt32(stavka["kolicina"]);
                    stavka_ulaza.CIJENA = Convert.ToDouble(stavka["cijena"]);
                    stavka_ulaza.PROIZVOD = Convert.ToInt32(stavka["proizvod"]);
                    stavka_ulaza.STANJE = !stavka.ContainsKey("stanje") ? 0 : Convert.ToInt32(stavka["stanje"]);
                    stavka_ulaza.REDNI_BROJ = Convert.ToInt32(stavka["redni_broj"]);

                    try
                    {
                        db.dp_stavke_ulaza.Add(stavka_ulaza);
                        ids.Add(stavka_ulaza.ID);
                        db.SaveChanges();
                    }
                    catch (Exception e)
                    {
                        for (int j = 0; j < ids.Count; j++)
                        {
                            dp_stavke_ulaza stavka_greska = db.dp_stavke_ulaza.Find(ids[j]);
                            db.dp_stavke_ulaza.Remove(stavka_greska);
                        }
                        db.dp_ulazi.Remove(ulaz);
                        db.SaveChanges();
                        response = JsonConvert.SerializeObject(new
                        {
                            ok = false,
                            message = "Desila se greška pri unosu stavki!"
                        });
                        return response;
                    }
                }

                response = JsonConvert.SerializeObject(new
                {
                    ok = true,
                    message = "Uspješno ste unijeli dokument pod rednim brojem " + godina.ToString() + "/" + redniBroj + "!",
                    request = details
                });
            }
            return response;
        }

        // DELETE: api/PrimkaAPI/5
        [ResponseType(typeof(dp_ulazi))]
        public IHttpActionResult Deletedp_ulazi(int id)
        {
            dp_ulazi dp_ulazi = db.dp_ulazi.Find(id);
            if (dp_ulazi == null)
            {
                return NotFound();
            }

            db.dp_ulazi.Remove(dp_ulazi);
            db.SaveChanges();

            return Ok(dp_ulazi);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool dp_ulaziExists(int id)
        {
            return db.dp_ulazi.Count(e => e.ID == id) > 0;
        }
    }
}