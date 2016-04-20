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
    [RoutePrefix("api/KadroviAPI")]
    [Authorize(Roles = "Sifarnici,Administrator")]
    public class KadroviAPIController : ApiController
    {
        private materijalno db = new materijalno();

        // GET: api/KadroviAPI
        public string Getsp_kadrovi()
        {
            var jsonResult = db.sp_kadrovi.Select(x => new {
                id = x.ID,
                ime = x.IME,
                prezime = x.PREZIME,
                jmbg = x.JMBG,
                email = x.EMAIL,
                sifra_klase = x.sp_klase_kadrova.SIFRA
            }).ToList();
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        // GET: api/KadroviAPI/5
        public string Getsp_kadrovi(int id)
        {
            var jsonResult = db.sp_kadrovi.Select(x => new {
                id = x.ID,
                ime = x.IME,
                prezime = x.PREZIME,
                jmbg = x.JMBG,
                email = x.EMAIL,
                klasa = x.sp_klase_kadrova.ID
            }).Where(x => x.id == id).ToList();
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        // PUT: api/KadroviAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putsp_kadrovi(int id, sp_kadrovi sp_kadrovi)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sp_kadrovi.ID)
            {
                return BadRequest();
            }

            db.Entry(sp_kadrovi).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!sp_kadroviExists(id))
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

        // POST: api/KadroviAPI
        [ResponseType(typeof(sp_kadrovi))]
        public IHttpActionResult Postsp_kadrovi(sp_kadrovi sp_kadrovi)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.sp_kadrovi.Add(sp_kadrovi);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = sp_kadrovi.ID }, sp_kadrovi);
        }

        // DELETE: api/KadroviAPI/5
        [ResponseType(typeof(sp_kadrovi))]
        public IHttpActionResult Deletesp_kadrovi(int id)
        {
            sp_kadrovi sp_kadrovi = db.sp_kadrovi.Find(id);
            if (sp_kadrovi == null)
            {
                return NotFound();
            }

            db.sp_kadrovi.Remove(sp_kadrovi);
            db.SaveChanges();

            return Ok(sp_kadrovi);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool sp_kadroviExists(int id)
        {
            return db.sp_kadrovi.Count(e => e.ID == id) > 0;
        }
    }
}