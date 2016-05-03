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
    [RoutePrefix("api/SubjektiAPI")]
    [Authorize(Roles = "Sifarnici, Administrator")]
    public class SubjektiAPIController : ApiController
    {
        private materijalno db = new materijalno();

        // GET: api/SubjektiAPI
        public string Getsp_subjekti()
        {
            var jsonResult = db.sp_subjekti.Select(x => new {
                id = x.ID,
                naziv = x.NAZIV,
                sifra = x.SIFRA,
                pdv_broj = x.PDV_BROJ,
                sifra_subjekta = x.sp_vrste_subjekata.SIFRA,
                email = x.EMAIL,
                fax = x.FAX,
                kontakt_osoba = x.KONTAKT_OSOBA,
                poreski_broj = x.PORESKI_BROJ,
                telefon = x.TELEFON,
                adresa = x.ADRESA
            }).ToList();
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        // GET: api/SubjektiAPI/5
        public string Getsp_subjekti(int id)
        {
            var jsonResult = db.sp_subjekti.Select(x => new {
                id = x.ID,
                pdv_broj = x.PDV_BROJ,
                poreski_broj = x.PORESKI_BROJ,
                sifra = x.SIFRA,
                naziv = x.NAZIV,
                adresa = x.ADRESA,
                kontakt_osoba = x.KONTAKT_OSOBA,
                email = x.EMAIL,
                telefon = x.TELEFON,
                fax = x.FAX,
                vrsta_subjekta = x.sp_vrste_subjekata.ID
            }).Where(x => x.id == id).ToList();
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        // PUT: api/SubjektiAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putsp_subjekti(int id, sp_subjekti sp_subjekti)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sp_subjekti.ID)
            {
                return BadRequest();
            }

            db.Entry(sp_subjekti).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!sp_subjektiExists(id))
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

        // POST: api/SubjektiAPI
        [ResponseType(typeof(sp_subjekti))]
        public IHttpActionResult Postsp_subjekti(sp_subjekti sp_subjekti)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.sp_subjekti.Add(sp_subjekti);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = sp_subjekti.ID }, sp_subjekti);
        }

        // DELETE: api/SubjektiAPI/5
        [ResponseType(typeof(sp_subjekti))]
        public IHttpActionResult Deletesp_subjekti(int id)
        {
            sp_subjekti sp_subjekti = db.sp_subjekti.Find(id);
            if (sp_subjekti == null)
            {
                return NotFound();
            }

            db.sp_subjekti.Remove(sp_subjekti);
            db.SaveChanges();

            return Ok(sp_subjekti);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool sp_subjektiExists(int id)
        {
            return db.sp_subjekti.Count(e => e.ID == id) > 0;
        }
    }
}