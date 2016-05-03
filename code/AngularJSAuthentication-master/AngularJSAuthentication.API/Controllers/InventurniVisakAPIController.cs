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
    [RoutePrefix("api/InventurniVisakAPI")]
    [Authorize(Roles = "Dokumenti, Administrator")]
    public class InventurniVisakAPIController : ApiController
    {
        private materijalno db = new materijalno();
        private VrsteDokumenataAPIController vrsteController = new VrsteDokumenataAPIController();

        // GET: api/PrimkaAPI
        public string Getdp_ulazi()
        {
            int vrsta = vrsteController.getIdBySifra("INVV");
            var jsonResult = db.dp_ulazi.Where(y => y.VRSTA_DOKUMENTA == vrsta).Select(x => new {
                id = x.ID,
                broj_primke = x.BROJ_PRIMKE,
                redni_broj = x.REDNI_BROJ,
                datum = x.DATUM,
                datum_unosa = x.DATUM_UNOSA,
                opis = x.OPIS,
                dostavnica = x.DOSTAVNICA,
                skladiste = x.sp_subjekti.NAZIV,
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
                proizvod = x.sp_proizvodi.NAZIV,
                kolicina = x.KOLICINA,
                cijena = Math.Round(x.CIJENA, 3)
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