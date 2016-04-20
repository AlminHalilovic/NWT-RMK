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
    [RoutePrefix("api/KlaseKadrovaAPI")]
    [Authorize(Roles = "Sifarnici,Administrator")]
    public class KlaseKadrovaAPIController : ApiController
    {
        private materijalno db = new materijalno();

        // GET: api/KlaseKadrovaAPI
        public string Getsp_klase_kadrova()
        {
            var jsonResult = db.sp_klase_kadrova.Select(x => new {
                id = x.ID,
                naziv = x.NAZIV,
                sifra = x.SIFRA
            }).ToList();
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        // GET: api/KlaseKadrovaAPI/5
        [ResponseType(typeof(sp_klase_kadrova))]
        public IHttpActionResult Getsp_klase_kadrova(int id)
        {
            sp_klase_kadrova sp_klase_kadrova = db.sp_klase_kadrova.Find(id);
            if (sp_klase_kadrova == null)
            {
                return NotFound();
            }

            return Ok(sp_klase_kadrova);
        }

        // PUT: api/KlaseKadrovaAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putsp_klase_kadrova(int id, sp_klase_kadrova sp_klase_kadrova)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sp_klase_kadrova.ID)
            {
                return BadRequest();
            }

            db.Entry(sp_klase_kadrova).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!sp_klase_kadrovaExists(id))
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

        // POST: api/KlaseKadrovaAPI
        [ResponseType(typeof(sp_klase_kadrova))]
        public IHttpActionResult Postsp_klase_kadrova(sp_klase_kadrova sp_klase_kadrova)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.sp_klase_kadrova.Add(sp_klase_kadrova);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = sp_klase_kadrova.ID }, sp_klase_kadrova);
        }

        // DELETE: api/KlaseKadrovaAPI/5
        [ResponseType(typeof(sp_klase_kadrova))]
        public IHttpActionResult Deletesp_klase_kadrova(int id)
        {
            sp_klase_kadrova sp_klase_kadrova = db.sp_klase_kadrova.Find(id);
            if (sp_klase_kadrova == null)
            {
                return NotFound();
            }

            db.sp_klase_kadrova.Remove(sp_klase_kadrova);
            db.SaveChanges();

            return Ok(sp_klase_kadrova);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool sp_klase_kadrovaExists(int id)
        {
            return db.sp_klase_kadrova.Count(e => e.ID == id) > 0;
        }
    }
}