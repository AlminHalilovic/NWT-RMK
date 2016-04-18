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
using System.Web.Http.Results;

namespace AngularJSAuthentication.API.Controllers
{
    [RoutePrefix("api/ProizvodiAPI")]
    
    public class ProizvodiAPIController : ApiController
    {
        private materijalno db = new materijalno();

        // GET: api/ProizvodiAPI
        public string Getsp_proizvodi()
        {
            var jsonResult = db.sp_proizvodi.Select(x => new { id = x.ID,
                                                               naziv = x.NAZIV,
                                                               sifra = x.SIFRA,
                                                               barcode = x.BARCODE,
                                                               sifra_jmjere = x.sp_jedinice_mjera.SIFRA,
                                                               id_jmjere = x.sp_jedinice_mjera.ID }).ToList();
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        public string Getsp_proizvodi(int id)
        {
            var jsonResult = db.sp_proizvodi.Select(x => new { id = x.ID,
                                                               naziv = x.NAZIV,
                                                               sifra = x.SIFRA,
                                                               barcode = x.BARCODE,
                                                               sifra_jmjere = x.sp_jedinice_mjera.SIFRA,
                                                               id_jmjere = x.sp_jedinice_mjera.ID}).Where(x => x.id == id).ToList();
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        // PUT: api/ProizvodiAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putsp_proizvodi(int id, sp_proizvodi sp_proizvodi)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sp_proizvodi.ID)
            {
                return BadRequest();
            }

            db.Entry(sp_proizvodi).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!sp_proizvodiExists(id))
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

        // POST: api/ProizvodiAPI
        [ResponseType(typeof(sp_proizvodi))]
        public IHttpActionResult Postsp_proizvodi(sp_proizvodi sp_proizvodi)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.sp_proizvodi.Add(sp_proizvodi);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = sp_proizvodi.ID }, sp_proizvodi);
        }

        // DELETE: api/ProizvodiAPI/5
        [ResponseType(typeof(sp_proizvodi))]
        public IHttpActionResult Deletesp_proizvodi(int id)
        {
            sp_proizvodi sp_proizvodi = db.sp_proizvodi.Find(id);
            if (sp_proizvodi == null)
            {
                return NotFound();
            }

            db.sp_proizvodi.Remove(sp_proizvodi);
            db.SaveChanges();

            return Ok(sp_proizvodi);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool sp_proizvodiExists(int id)
        {
            return db.sp_proizvodi.Count(e => e.ID == id) > 0;
        }
    }
}