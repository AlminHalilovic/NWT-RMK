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
    [RoutePrefix("api/JediniceMjereAPI")]
    [Authorize(Roles = "Sifarnici,Administrator")]
    public class JediniceMjereAPIController : ApiController
    {
        private materijalno db = new materijalno();

        // GET: api/JediniceMjereAPI
        public string Getsp_jedinice_mjera()
        {
            var jsonResult = db.sp_jedinice_mjera.Select(x => new {
                id = x.ID,
                naziv = x.NAZIV,
                sifra = x.SIFRA
            }).ToList();
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        // GET: api/JediniceMjereAPI/5
        [ResponseType(typeof(sp_jedinice_mjera))]
        public IHttpActionResult Getsp_jedinice_mjera(int id)
        {
            sp_jedinice_mjera sp_jedinice_mjera = db.sp_jedinice_mjera.Find(id);
            if (sp_jedinice_mjera == null)
            {
                return NotFound();
            }

            return Ok(sp_jedinice_mjera);
        }

        // PUT: api/JediniceMjereAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putsp_jedinice_mjera(int id, sp_jedinice_mjera sp_jedinice_mjera)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sp_jedinice_mjera.ID)
            {
                return BadRequest();
            }

            db.Entry(sp_jedinice_mjera).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!sp_jedinice_mjeraExists(id))
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

        // POST: api/JediniceMjereAPI
        [ResponseType(typeof(sp_jedinice_mjera))]
        public IHttpActionResult Postsp_jedinice_mjera(sp_jedinice_mjera sp_jedinice_mjera)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.sp_jedinice_mjera.Add(sp_jedinice_mjera);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = sp_jedinice_mjera.ID }, sp_jedinice_mjera);
        }

        // DELETE: api/JediniceMjereAPI/5
        [ResponseType(typeof(sp_jedinice_mjera))]
        public IHttpActionResult Deletesp_jedinice_mjera(int id)
        {
            sp_jedinice_mjera sp_jedinice_mjera = db.sp_jedinice_mjera.Find(id);
            if (sp_jedinice_mjera == null)
            {
                return NotFound();
            }

            db.sp_jedinice_mjera.Remove(sp_jedinice_mjera);
            db.SaveChanges();

            return Ok(sp_jedinice_mjera);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool sp_jedinice_mjeraExists(int id)
        {
            return db.sp_jedinice_mjera.Count(e => e.ID == id) > 0;
        }
    }
}