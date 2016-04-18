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
    [RoutePrefix("api/InventurniManjakAPI")]
    [Authorize]
    public class InventurniManjakAPIController : ApiController
    {
        private materijalno db = new materijalno();

        // GET: api/PrimkaAPI
        public string Getdp_izlazi()
        {
            var jsonResult = db.dp_izlazi.Where(y => y.VRSTA_DOKUMENTA == 9).Select(x => new {
                id = x.ID,
                broj_primke = x.BROJ_PRIMKE,
                redni_broj = x.REDNI_BROJ,
                datum = x.DATUM,
                datum_unosa = x.DATUM_UNOSA,
                opis = x.OPIS,
                skladiste = x.sp_subjekti.NAZIV,
                isStavkaShown = false
            }).ToList();
            string json = JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        // GET: api/PrimkaAPI/5
        [ResponseType(typeof(dp_izlazi))]
        public IHttpActionResult Getdp_izlazi(int id)
        {
            dp_izlazi dp_izlazi = db.dp_izlazi.Find(id);
            if (dp_izlazi == null)
            {
                return NotFound();
            }

            return Ok(dp_izlazi);
        }

        public string Getdp_izlazi(int id, string model)
        {
            var jsonResult = db.dp_stavke_izlaza.Where(y => y.IZLAZ == id).Select(x => new {
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
        public IHttpActionResult Putdp_ulazi(int id, dp_izlazi dp_izlazi)
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
            return db.dp_ulazi.Count(e => e.ID == id) > 0;
        }
    }
}