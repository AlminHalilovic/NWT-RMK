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

namespace AngularJSAuthentication.API.Controllers
{
    [RoutePrefix("api/GrupeProizvodaAPI")]
    [Authorize(Roles = "Sifarnici,Administrator")]
    public class GrupeProizvodaAPIController : ApiController
    {
        private materijalno db = new materijalno();

        // GET: api/GrupeProizvodaAPI
        public string Getsp_grupe_proizvoda()
        {
            var jsonResult = db.sp_grupe_proizvoda.Select(x => new {
                id = x.ID,
                naziv = x.NAZIV,
                sifra = x.SIFRA
            }).ToList();
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        // GET: api/GrupeProizvodaAPI/5
        [ResponseType(typeof(sp_grupe_proizvoda))]
        public IHttpActionResult Getsp_grupe_proizvoda(int id)
        {
            sp_grupe_proizvoda sp_grupe_proizvoda = db.sp_grupe_proizvoda.Find(id);
            if (sp_grupe_proizvoda == null)
            {
                return NotFound();
            }

            return Ok(sp_grupe_proizvoda);
        }

        // PUT: api/GrupeProizvodaAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putsp_grupe_proizvoda(int id, sp_grupe_proizvoda sp_grupe_proizvoda)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sp_grupe_proizvoda.ID)
            {
                return BadRequest();
            }

            db.Entry(sp_grupe_proizvoda).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!sp_grupe_proizvodaExists(id))
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

        // POST: api/GrupeProizvodaAPI
        [ResponseType(typeof(sp_grupe_proizvoda))]
        public IHttpActionResult Postsp_grupe_proizvoda(sp_grupe_proizvoda sp_grupe_proizvoda)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.sp_grupe_proizvoda.Add(sp_grupe_proizvoda);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = sp_grupe_proizvoda.ID }, sp_grupe_proizvoda);
        }

        // DELETE: api/GrupeProizvodaAPI/5
        [ResponseType(typeof(sp_grupe_proizvoda))]
        public IHttpActionResult Deletesp_grupe_proizvoda(int id)
        {
            sp_grupe_proizvoda sp_grupe_proizvoda = db.sp_grupe_proizvoda.Find(id);
            if (sp_grupe_proizvoda == null)
            {
                return NotFound();
            }

            db.sp_grupe_proizvoda.Remove(sp_grupe_proizvoda);
            db.SaveChanges();

            return Ok(sp_grupe_proizvoda);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool sp_grupe_proizvodaExists(int id)
        {
            return db.sp_grupe_proizvoda.Count(e => e.ID == id) > 0;
        }
    }
}