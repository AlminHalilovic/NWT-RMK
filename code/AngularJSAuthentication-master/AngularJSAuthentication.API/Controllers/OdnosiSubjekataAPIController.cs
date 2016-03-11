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
    [RoutePrefix("api/OdnosiSubjekataAPI")]
    [Authorize]
    public class OdnosiSubjekataAPIController : ApiController
    {
        private materijalno db = new materijalno();

        // GET: api/OdnosiSubjekataAPI
        public IQueryable<sp_odnosi_subjekata> Getsp_odnosi_subjekata()
        {
            return db.sp_odnosi_subjekata;
        }

        // GET: api/OdnosiSubjekataAPI/5
        [ResponseType(typeof(sp_odnosi_subjekata))]
        public IHttpActionResult Getsp_odnosi_subjekata(int id)
        {
            sp_odnosi_subjekata sp_odnosi_subjekata = db.sp_odnosi_subjekata.Find(id);
            if (sp_odnosi_subjekata == null)
            {
                return NotFound();
            }

            return Ok(sp_odnosi_subjekata);
        }

        // PUT: api/OdnosiSubjekataAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putsp_odnosi_subjekata(int id, sp_odnosi_subjekata sp_odnosi_subjekata)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sp_odnosi_subjekata.ID)
            {
                return BadRequest();
            }

            db.Entry(sp_odnosi_subjekata).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!sp_odnosi_subjekataExists(id))
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

        // POST: api/OdnosiSubjekataAPI
        [ResponseType(typeof(sp_odnosi_subjekata))]
        public IHttpActionResult Postsp_odnosi_subjekata(sp_odnosi_subjekata sp_odnosi_subjekata)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.sp_odnosi_subjekata.Add(sp_odnosi_subjekata);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = sp_odnosi_subjekata.ID }, sp_odnosi_subjekata);
        }

        // DELETE: api/OdnosiSubjekataAPI/5
        [ResponseType(typeof(sp_odnosi_subjekata))]
        public IHttpActionResult Deletesp_odnosi_subjekata(int id)
        {
            sp_odnosi_subjekata sp_odnosi_subjekata = db.sp_odnosi_subjekata.Find(id);
            if (sp_odnosi_subjekata == null)
            {
                return NotFound();
            }

            db.sp_odnosi_subjekata.Remove(sp_odnosi_subjekata);
            db.SaveChanges();

            return Ok(sp_odnosi_subjekata);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool sp_odnosi_subjekataExists(int id)
        {
            return db.sp_odnosi_subjekata.Count(e => e.ID == id) > 0;
        }
    }
}