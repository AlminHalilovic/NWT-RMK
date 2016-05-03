using AngularJSAuthentication.Models.API;
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


namespace AngularJSAuthentication.API.Controllers
{
    [RoutePrefix("api/KlaseDokumenataAPI")]
    [Authorize(Roles = "Sifarnici, Administrator")]
    public class KlaseDokumenataAPIController : ApiController
    {
        private materijalno db = new materijalno();

        // GET: api/KlaseDokumenataAPI
        public string Getsp_klase_dokumenata()
        {
            var jsonResult = db.sp_klase_dokumenata.Select(x => new {
                id = x.ID,
                naziv = x.NAZIV,
                sifra = x.SIFRA
            }).ToList();
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        // GET: api/KlaseDokumenataAPI/5
        public string Getsp_klase_dokumenata(int id)
        {
            var jsonResult = db.sp_klase_dokumenata.Select(x => new {
                id = x.ID,
                sifra = x.SIFRA,
                naziv = x.NAZIV
            }).Where(x => x.id == id).ToList();
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        // PUT: api/KlaseDokumenataAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putsp_klase_dokumenata(int id, sp_klase_dokumenata sp_klase_dokumenata)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sp_klase_dokumenata.ID)
            {
                return BadRequest();
            }

            db.Entry(sp_klase_dokumenata).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!sp_klase_dokumenataExists(id))
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

        // POST: api/KlaseDokumenataAPI
        [ResponseType(typeof(sp_klase_dokumenata))]
        public IHttpActionResult Postsp_klase_dokumenata(sp_klase_dokumenata sp_klase_dokumenata)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.sp_klase_dokumenata.Add(sp_klase_dokumenata);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = sp_klase_dokumenata.ID }, sp_klase_dokumenata);
        }

        // DELETE: api/KlaseDokumenataAPI/5
        [ResponseType(typeof(sp_klase_dokumenata))]
        public IHttpActionResult Deletesp_klase_dokumenata(int id)
        {
            sp_klase_dokumenata sp_klase_dokumenata = db.sp_klase_dokumenata.Find(id);
            if (sp_klase_dokumenata == null)
            {
                return NotFound();
            }

            db.sp_klase_dokumenata.Remove(sp_klase_dokumenata);
            db.SaveChanges();

            return Ok(sp_klase_dokumenata);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool sp_klase_dokumenataExists(int id)
        {
            return db.sp_klase_dokumenata.Count(e => e.ID == id) > 0;
        }
    }
}