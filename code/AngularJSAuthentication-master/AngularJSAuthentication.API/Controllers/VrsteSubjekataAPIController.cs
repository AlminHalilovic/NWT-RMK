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
    [RoutePrefix("api/VrsteSubjekataAPI")]
    [Authorize]
    public class VrsteSubjekataAPIController : ApiController
    {
        private materijalno db = new materijalno();

        // GET: api/VrsteSubjekataAPI
        public IQueryable<sp_vrste_subjekata> Getsp_vrste_subjekata()
        {
            return db.sp_vrste_subjekata;
        }

        // GET: api/VrsteSubjekataAPI/5
        [ResponseType(typeof(sp_vrste_subjekata))]
        public IHttpActionResult Getsp_vrste_subjekata(int id)
        {
            sp_vrste_subjekata sp_vrste_subjekata = db.sp_vrste_subjekata.Find(id);
            if (sp_vrste_subjekata == null)
            {
                return NotFound();
            }

            return Ok(sp_vrste_subjekata);
        }

        // PUT: api/VrsteSubjekataAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putsp_vrste_subjekata(int id, sp_vrste_subjekata sp_vrste_subjekata)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sp_vrste_subjekata.ID)
            {
                return BadRequest();
            }

            db.Entry(sp_vrste_subjekata).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!sp_vrste_subjekataExists(id))
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

        // POST: api/VrsteSubjekataAPI
        [ResponseType(typeof(sp_vrste_subjekata))]
        public IHttpActionResult Postsp_vrste_subjekata(sp_vrste_subjekata sp_vrste_subjekata)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.sp_vrste_subjekata.Add(sp_vrste_subjekata);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = sp_vrste_subjekata.ID }, sp_vrste_subjekata);
        }

        // DELETE: api/VrsteSubjekataAPI/5
        [ResponseType(typeof(sp_vrste_subjekata))]
        public IHttpActionResult Deletesp_vrste_subjekata(int id)
        {
            sp_vrste_subjekata sp_vrste_subjekata = db.sp_vrste_subjekata.Find(id);
            if (sp_vrste_subjekata == null)
            {
                return NotFound();
            }

            db.sp_vrste_subjekata.Remove(sp_vrste_subjekata);
            db.SaveChanges();

            return Ok(sp_vrste_subjekata);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool sp_vrste_subjekataExists(int id)
        {
            return db.sp_vrste_subjekata.Count(e => e.ID == id) > 0;
        }
    }
}