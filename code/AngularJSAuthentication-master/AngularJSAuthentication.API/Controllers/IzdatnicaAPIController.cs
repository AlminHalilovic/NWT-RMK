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
    [RoutePrefix("api/IzdatnicaAPI")]
    [Authorize(Roles = "Dokumenti,Administrator")]
    public class IzdatnicaAPIController : ApiController
    {
        private materijalno db = new materijalno();

        // GET: api/PrimkaAPI
        public string Getdp_izlazi()
        {
            var jsonResult = db.dp_izlazi.Where(y => y.VRSTA_DOKUMENTA == 3).Select(x => new {
                id = x.ID,
                broj_primke = x.BROJ_PRIMKE,
                redni_broj = x.REDNI_BROJ,
                datum = x.DATUM,
                datum_unosa = x.DATUM_UNOSA,
                opis = x.OPIS,
                isStavkaShown = false
            }).ToList();
            string json = JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        // GET: api/PrimkaAPI/5
        public string Getdp_izlazi(int id)
        {
            var jsonResult = db.dp_izlazi.Select(x => new {
                id = x.ID,
                broj_primke = x.BROJ_PRIMKE,
                redni_broj = x.REDNI_BROJ,
                datum = x.DATUM,
                datum_unosa = x.DATUM_UNOSA,
                opis = x.OPIS,
                skladiste = x.OD_SUBJEKTA,
                skladisteNaziv = db.sp_subjekti.Where(z => z.ID == x.OD_SUBJEKTA).FirstOrDefault().NAZIV,
                dobavljac = x.ZA_SUBJEKTA,
                dobavljacNaziv = x.sp_subjekti1.NAZIV
            }).Where(y => y.id == id).FirstOrDefault();
            string json = JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        public string Getdp_izlazi(int id, string model)
        {
            var jsonResult = db.dp_stavke_izlaza.Where(y => y.IZLAZ == id).Select(x => new {
                id = x.ID,
                redni_broj = x.REDNI_BROJ,
                proizvod = x.sp_proizvodi.NAZIV,
                kolicina = x.KOLICINA,
                jedinica_mjere = x.sp_jedinice_mjera.ID,
                cijena = Math.Round(x.CIJENA, 3)
            }).ToList();
            string json = JsonConvert.SerializeObject(jsonResult);
            return json;
        }
        public string Getdp_ulazi(int dummy1, int dummy2, int dummy3)
        {
            var jsonResult = db.dp_izlazi.Where(x => (x.VRSTA_DOKUMENTA == 3 &&
                                                 x.POVRAT == null &&
                                                 !(db.dp_izlazi.Where(y => y.POVRAT != null).Select(y => y.POVRAT)).ToList().Contains(x.ID))).
                                                 Select(z => new { id = z.ID, broj_povrata = z.BROJ_PRIMKE })
                                                 .ToList();
            string json = JsonConvert.SerializeObject(jsonResult);
            return json;
        }


        // PUT: api/PrimkaAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putdp_izlazi(int id, dp_izlazi dp_izlazi)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != dp_izlazi.ID)
            {
                return BadRequest();
            }

            db.Entry(dp_izlazi).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!dp_izlaziExists(id))
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
        public string Postdp_izlazi()
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

                dp_izlazi izlaz = new dp_izlazi();
                izlaz.BROJ_PRIMKE = master["broj_primke"].ToString();
                izlaz.ZA_SUBJEKTA = Convert.ToInt32(master["dobavljac"]);
                izlaz.MJESTO_TROSKA = izlaz.ZA_SUBJEKTA;
                izlaz.OD_SUBJEKTA = Convert.ToInt32(master["skladiste"]);
                izlaz.OPIS = master["opis"].ToString();
                izlaz.DATUM = Convert.ToDateTime(master["datum"]);
                izlaz.VRSTA_DOKUMENTA = 3;
                izlaz.POSLOVNI_PERIOD = 2;
                izlaz.DATUM_UNOSA = DateTime.Now;
                izlaz.STATUS = "D";

                var brojac_dokumenata = db.dp_brojaci_dokumenata
                                          .Where(x => (x.VRSTA_DOKUMENTA == izlaz.VRSTA_DOKUMENTA && x.ORGANIZACIJA == izlaz.OD_SUBJEKTA))
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
                    brojac_dokumenata.ORGANIZACIJA = izlaz.OD_SUBJEKTA;
                    brojac_dokumenata.REDNI_BROJ = redniBroj;
                    brojac_dokumenata.GODINA = godina;
                    brojac_dokumenata.VRSTA_DOKUMENTA = 3;
                    db.dp_brojaci_dokumenata.Add(brojac_dokumenata);
                }

                izlaz.REDNI_BROJ = redniBroj;

                try
                {
                    db.dp_izlazi.Add(izlaz);
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    response = JsonConvert.SerializeObject(new
                    {
                        ok = false,
                        message = "Desila se greška pri unosu zaglavlja:" + e.Message.ToString() + " " +  (e.InnerException != null ? e.InnerException.Message.ToString() : "")
                    });
                    return response;
                }
                List<int> ids = new List<int>();
                for (int i = 0; i < details.Length; i++)
                {
                    Dictionary<string, object> stavka = (Dictionary<string, object>)details[i];
                    dp_stavke_izlaza stavka_izlaza = new dp_stavke_izlaza();
                    stavka_izlaza.IZLAZ = izlaz.ID;
                    stavka_izlaza.JEDINICA_MJERE = Convert.ToInt32(stavka["jedinica_mjere"]);
                    stavka_izlaza.KOLICINA = Convert.ToInt32(stavka["kolicina"]);
                    stavka_izlaza.CIJENA = Convert.ToDouble(stavka["cijena"]);
                    stavka_izlaza.PROIZVOD = Convert.ToInt32(stavka["proizvod"]);
                    stavka_izlaza.STANJE = !stavka.ContainsKey("stanje") ? 0 : Convert.ToInt32(stavka["stanje"]);
                    stavka_izlaza.REDNI_BROJ = Convert.ToInt32(stavka["redni_broj"]);

                    try
                    {
                        db.dp_stavke_izlaza.Add(stavka_izlaza);
                        db.SaveChanges();
                        ids.Add(stavka_izlaza.ID);
                    }
                    catch (Exception e)
                    {
                        for (int j = 0; j < ids.Count; j++)
                        {
                            dp_stavke_izlaza stavka_greska = db.dp_stavke_izlaza.Find(ids[j]);
                            db.dp_stavke_izlaza.Remove(stavka_greska);
                        }
                        db.dp_izlazi.Remove(izlaz);
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
        [ResponseType(typeof(dp_izlazi))]
        public IHttpActionResult Deletedp_izlazi(int id)
        {
            dp_izlazi dp_izlazi = db.dp_izlazi.Find(id);
            if (dp_izlazi == null)
            {
                return NotFound();
            }

            db.dp_izlazi.Remove(dp_izlazi);
            db.SaveChanges();

            return Ok(dp_izlazi);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool dp_izlaziExists(int id)
        {
            return db.dp_izlazi.Count(e => e.ID == id) > 0;
        }
    }
}