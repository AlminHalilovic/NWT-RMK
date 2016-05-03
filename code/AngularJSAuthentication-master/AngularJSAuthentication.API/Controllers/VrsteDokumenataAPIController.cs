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
    [RoutePrefix("api/VrsteDokumenataAPI")]
    [Authorize(Roles = "Sifarnici, Administrator")]
    public class VrsteDokumenataAPIController : ApiController
    {
        private materijalno db = new materijalno();

        // GET: api/VrsteDokumenataAPI
        public string Getsp_vrste_dokumenata()
        {
            var jsonResult = db.sp_vrste_dokumenata.Select(x => new {
                id = x.ID,
                naziv = x.NAZIV,
                sifra = x.SIFRA,
                sifra_klase = x.sp_klase_dokumenata.SIFRA
            }).ToList();
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        // GET: api/VrsteDokumenataAPI/5
        public string Getsp_vrste_dokumenata(int id)
        {
            var jsonResult = db.sp_vrste_dokumenata.Select(x => new {
                id = x.ID,
                sifra = x.SIFRA,
                naziv = x.NAZIV,
                klasa = x.sp_klase_dokumenata.ID
            }).Where(x => x.id == id).ToList();
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        public int getIdBySifra(string sifra)
        {
            return db.sp_vrste_dokumenata.Where(x => x.SIFRA == sifra).First().ID;
        }

        // PUT: api/VrsteDokumenataAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putsp_vrste_dokumenata(int id, sp_vrste_dokumenata sp_vrste_dokumenata)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sp_vrste_dokumenata.ID)
            {
                return BadRequest();
            }

            db.Entry(sp_vrste_dokumenata).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!sp_vrste_dokumenataExists(id))
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

        // POST: api/VrsteDokumenataAPI
        [ResponseType(typeof(sp_vrste_dokumenata))]
        public IHttpActionResult Postsp_vrste_dokumenata(sp_vrste_dokumenata sp_vrste_dokumenata)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.sp_vrste_dokumenata.Add(sp_vrste_dokumenata);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = sp_vrste_dokumenata.ID }, sp_vrste_dokumenata);
        }

        // DELETE: api/VrsteDokumenataAPI/5
        [ResponseType(typeof(sp_vrste_dokumenata))]
        public IHttpActionResult Deletesp_vrste_dokumenata(int id)
        {
            sp_vrste_dokumenata sp_vrste_dokumenata = db.sp_vrste_dokumenata.Find(id);
            if (sp_vrste_dokumenata == null)
            {
                return NotFound();
            }

            db.sp_vrste_dokumenata.Remove(sp_vrste_dokumenata);
            db.SaveChanges();

            return Ok(sp_vrste_dokumenata);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool sp_vrste_dokumenataExists(int id)
        {
            return db.sp_vrste_dokumenata.Count(e => e.ID == id) > 0;
        }
    }
}