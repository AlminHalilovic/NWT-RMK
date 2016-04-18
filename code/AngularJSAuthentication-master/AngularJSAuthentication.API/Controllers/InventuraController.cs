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
    [RoutePrefix("api/InventuraAPI")]
    [Authorize]
    public class InventuraAPIController : ApiController
    {
        private materijalno db = new materijalno();

        // GET: api/PrimkaAPI
        public string Getdp_inventure()
        {
            var jsonResult = db.dp_inventure.Where(y => y.VRSTA_DOKUMENTA == 8).Select(x => new {
                id = x.ID,
                redni_broj = x.REDNI_BROJ,
                datum = x.DATUM,
                datum_unosa = x.DATUM_UNOSA,
                opis = x.OPIS,
                skladiste = x.sp_subjekti.NAZIV,
                broj_inventure = x.BROJ_INVENTURE
            }).ToList();
            string json = JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        // GET: api/PrimkaAPI/5
        [ResponseType(typeof(dp_inventure))]
        public IHttpActionResult Getdp_inventure(int id)
        {
            dp_inventure dp_inventure = db.dp_inventure.Find(id);
            if (dp_inventure == null)
            {
                return NotFound();
            }

            return Ok(dp_inventure);
        }


        // PUT: api/PrimkaAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putdp_inventure(int id, dp_inventure dp_inventure)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != dp_inventure.ID)
            {
                return BadRequest();
            }

            db.Entry(dp_inventure).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!dp_inventureExists(id))
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

        public int getBrojac(int vrstaDokumenta, int skladiste, int godina)
        {
            var brojac = db.dp_brojaci_dokumenata.Where(x => (x.VRSTA_DOKUMENTA == vrstaDokumenta &&
                                                                        x.ORGANIZACIJA == skladiste)).FirstOrDefault();
            var redniBroj = 1;
            if (brojac != null)
            {
                redniBroj = brojac.REDNI_BROJ + 1;
                brojac.REDNI_BROJ = redniBroj;
            }
            else
            {
                brojac = new dp_brojaci_dokumenata();
                brojac.ORGANIZACIJA = skladiste;
                brojac.REDNI_BROJ = redniBroj;
                brojac.GODINA = godina;
                brojac.VRSTA_DOKUMENTA = vrstaDokumenta;
                db.dp_brojaci_dokumenata.Add(brojac);
            }
            return redniBroj;
        }

        private int SubmitVisak(dp_inventure inventura, List<dp_stavke_inventure> stavkeViska)
        {
            int godina = DateTime.Now.Year;
            dp_ulazi ulaz = new dp_ulazi();
            ulaz.BROJ_PRIMKE = inventura.BROJ_INVENTURE;
            ulaz.DATUM = inventura.DATUM;
            ulaz.DATUM_UNOSA = DateTime.Now.Date;
            ulaz.IZNOS = 0;
            ulaz.ZA_SUBJEKTA = inventura.ORGANIZACIJA;
            ulaz.OD_SUBJEKTA = inventura.ORGANIZACIJA;
            ulaz.OPIS = inventura.OPIS;
            ulaz.VRSTA_DOKUMENTA = 10;
            int rb = getBrojac(10, inventura.ORGANIZACIJA, godina);
            ulaz.STATUS = "D";
            ulaz.POSLOVNI_PERIOD = 2;
            ulaz.REDNI_BROJ = rb;

            db.dp_ulazi.Add(ulaz);
            db.SaveChanges();

            int ulazId = ulaz.ID;

            foreach (dp_stavke_inventure s in stavkeViska)
            {
                dp_stavke_ulaza stavka = new dp_stavke_ulaza();
                stavka.ULAZ = ulazId;
                stavka.JEDINICA_MJERE = s.JMJERE;
                stavka.KOLICINA = s.ZATECENO - s.ZADUZENO;
                stavka.STANJE = s.ZATECENO - s.ZADUZENO;
                stavka.PROIZVOD = s.PROIZVOD;
                stavka.CIJENA = s.CIJENA;
                stavka.REDNI_BROJ = s.REDNI_BROJ;
                db.dp_stavke_ulaza.Add(stavka);
            }
            db.SaveChanges();
            return rb;
        }

        private int SubmitManjak(dp_inventure inventura, List<dp_stavke_inventure> stavkeManjka)
        {
            int godina = DateTime.Now.Year;
            dp_izlazi izlaz = new dp_izlazi();
            izlaz.BROJ_PRIMKE = inventura.BROJ_INVENTURE;
            izlaz.DATUM = inventura.DATUM;
            izlaz.DATUM_UNOSA = DateTime.Now.Date;
            izlaz.IZNOS = 0;
            izlaz.ZA_SUBJEKTA = inventura.ORGANIZACIJA;
            izlaz.OD_SUBJEKTA = inventura.ORGANIZACIJA;
            izlaz.MJESTO_TROSKA = inventura.ORGANIZACIJA;
            izlaz.OPIS = inventura.OPIS;
            izlaz.VRSTA_DOKUMENTA = 9;
            int rb = getBrojac(9, inventura.ORGANIZACIJA, godina);
            izlaz.STATUS = "D";
            izlaz.POSLOVNI_PERIOD = 2;
            izlaz.REDNI_BROJ = rb;

            db.dp_izlazi.Add(izlaz);
            db.SaveChanges();

            int izlazId = izlaz.ID;

            foreach (dp_stavke_inventure s in stavkeManjka)
            {
                dp_stavke_izlaza stavka = new dp_stavke_izlaza();
                stavka.IZLAZ = izlazId;
                stavka.JEDINICA_MJERE = s.JMJERE;
                stavka.KOLICINA = s.ZADUZENO - s.ZATECENO;
                stavka.STANJE = s.ZADUZENO - s.ZATECENO;
                stavka.PROIZVOD = s.PROIZVOD;
                stavka.CIJENA = s.CIJENA;
                stavka.REDNI_BROJ = s.REDNI_BROJ;
                db.dp_stavke_izlaza.Add(stavka);
            }
            db.SaveChanges();
            return rb;
        }

        // POST: api/PrimkaAPI
        public string Postdp_inventure()
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

                dp_inventure inventura = new dp_inventure();
                inventura.ORGANIZACIJA = Convert.ToInt32(master["skladiste"]);
                inventura.OPIS = master["opis"].ToString();
                inventura.DATUM = Convert.ToDateTime(master["datum"]);
                inventura.VRSTA_DOKUMENTA = 8;
                inventura.POSLOVNI_PERIOD = 2;
                inventura.DATUM_UNOSA = DateTime.Now;
                inventura.STATUS = "D";

                int godina = DateTime.Now.Year;
                int redniBroj = getBrojac(8, inventura.ORGANIZACIJA, godina);

                inventura.REDNI_BROJ = redniBroj;

                try
                {
                    db.dp_inventure.Add(inventura);
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
                List<dp_stavke_inventure> stavkeViska = new List<dp_stavke_inventure>();
                List<dp_stavke_inventure> stavkeManjka = new List<dp_stavke_inventure>();
                for (int i = 0; i < details.Length; i++)
                {
                    Dictionary<string, object> stavka = (Dictionary<string, object>)details[i];
                    dp_stavke_inventure stavka_inventure = new dp_stavke_inventure();
                    stavka_inventure.INVENTURA = inventura.ID;
                    stavka_inventure.JMJERE = Convert.ToInt32(stavka["jedinica_mjere"]);
                    stavka_inventure.ZATECENO = Convert.ToInt32(stavka["kolicina"]);
                    stavka_inventure.ZADUZENO = !stavka.ContainsKey("stanje") ? 0 : Convert.ToInt32(stavka["stanje"]);
                    stavka_inventure.CIJENA = Convert.ToDouble(stavka["cijena"]);
                    stavka_inventure.PROIZVOD = Convert.ToInt32(stavka["proizvod"]);
                    stavka_inventure.REDNI_BROJ = Convert.ToInt32(stavka["redni_broj"]);

                    if (stavka_inventure.ZADUZENO < stavka_inventure.ZATECENO) stavkeViska.Add(stavka_inventure);
                    else if (stavka_inventure.ZADUZENO > stavka_inventure.ZATECENO) stavkeManjka.Add(stavka_inventure);

                    try
                    {
                        db.dp_stavke_inventure.Add(stavka_inventure);
                        db.SaveChanges();
                        ids.Add(stavka_inventure.ID);
                    }
                    catch (Exception e)
                    {
                        for (int j = 0; j < ids.Count; j++)
                        {
                            dp_stavke_inventure stavka_greska = db.dp_stavke_inventure.Find(ids[j]);
                            db.dp_stavke_inventure.Remove(stavka_greska);
                        }
                        db.dp_inventure.Remove(inventura);
                        db.SaveChanges();
                        response = JsonConvert.SerializeObject(new
                        {
                            ok = false,
                            message = "Desila se greška pri unosu stavki!"
                        });
                        return response;
                    }
                }

                bool hasVisak = stavkeViska.Count > 0;
                bool hasManjak = stavkeManjka.Count > 0;
                string rbManjka = "";
                string rbViska = "";
                string manjakVisak = "";
                if (hasVisak)
                {
                    rbViska = SubmitVisak(inventura, stavkeViska).ToString();
                    manjakVisak += "te inventurni višak pod rednim brojem " + godina + '/' + rbViska;
                }
                if (hasManjak)
                {
                    rbManjka = SubmitManjak(inventura, stavkeManjka).ToString();
                    manjakVisak += " i inventurni manjak pod rednim brojem " + godina + "/" + rbManjka;
                }
               
                response = JsonConvert.SerializeObject(new
                {
                    ok = true,
                    message = "Uspješno ste unijeli dokument pod rednim brojem " + godina.ToString() + "/" + redniBroj + " " + manjakVisak + "!",
                    request = details
                });
            }
            return response;
        }

        // DELETE: api/PrimkaAPI/5
        [ResponseType(typeof(dp_ulazi))]
        public IHttpActionResult Deletedp_inventure(int id)
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

        private bool dp_inventureExists(int id)
        {
            return db.dp_ulazi.Count(e => e.ID == id) > 0;
        }
    }
}