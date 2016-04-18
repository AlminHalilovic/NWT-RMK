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
using Newtonsoft.Json;


namespace AngularJSAuthentication.API.Controllers
{
    [RoutePrefix("api/PrimkaAPI")]
    [Authorize]
    public class PrimkaAPIController : ApiController
    {
        private materijalno db = new materijalno();

        // GET: api/PrimkaAPI
        public IQueryable<dp_ulazi> Getdp_ulazi()
        {
            return db.dp_ulazi;
        }

        // GET: api/PrimkaAPI/5
        [ResponseType(typeof(dp_ulazi))]
        public IHttpActionResult Getdp_ulazi(int id)
        {
            dp_ulazi dp_ulazi = db.dp_ulazi.Find(id);
            if (dp_ulazi == null)
            {
                return NotFound();
            }

            return Ok(dp_ulazi);
        }


        // PUT: api/PrimkaAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putdp_ulazi(int id, dp_ulazi dp_ulazi)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != dp_ulazi.ID)
            {
                return BadRequest();
            }

            db.Entry(dp_ulazi).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!dp_ulaziExists(id))
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

        // POST: api/PrimkaAPI
        [ResponseType(typeof(dp_ulazi))]
        public IHttpActionResult Postdp_ulazi(dp_ulazi dp_ulazi)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.dp_ulazi.Add(dp_ulazi);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = dp_ulazi.ID }, dp_ulazi);
        }

        // DELETE: api/PrimkaAPI/5
        [ResponseType(typeof(dp_ulazi))]
        public IHttpActionResult Deletedp_ulazi(int id)
        {
            dp_ulazi dp_ulazi = db.dp_ulazi.Find(id);
            if (dp_ulazi == null)
            {
                return NotFound();
            }

            db.dp_ulazi.Remove(dp_ulazi);
            db.SaveChanges();

            return Ok(dp_ulazi);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool dp_ulaziExists(int id)
        {
            return db.dp_ulazi.Count(e => e.ID == id) > 0;
        }
    }
}