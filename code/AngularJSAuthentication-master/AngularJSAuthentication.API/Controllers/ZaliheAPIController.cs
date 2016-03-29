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
    public class ZaliheAPIController : ApiController
    {
        private materijalno db = new materijalno();

        // GET: api/ZaliheAPI
        public IQueryable<dp_zalihe> Getdp_zalihe()
        {
            return db.dp_zalihe;
        }

        // GET: api/ZaliheAPI/5
        [ResponseType(typeof(dp_zalihe))]
        public IHttpActionResult Getdp_zalihe(int id)
        {
            dp_zalihe dp_zalihe = db.dp_zalihe.Find(id);
            if (dp_zalihe == null)
            {
                return NotFound();
            }

            return Ok(dp_zalihe);
        }
        public string Getdp_zalihe(int proizvodId, int organizacija)
        {
            var jsonResult = db.dp_zalihe.Select(x => new {
                                                         proizvod = x.PROIZVOD,
                                                         organizacija = x.ORGANIZACIJA,
                                                         cijena = Math.Round(x.CIJENA, 3),
                                                         stanje = x.STANJE
                                                      }).Where(x => x.organizacija == organizacija && x.proizvod == proizvodId);
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        // PUT: api/ZaliheAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putdp_zalihe(int id, dp_zalihe dp_zalihe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != dp_zalihe.ID)
            {
                return BadRequest();
            }

            db.Entry(dp_zalihe).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!dp_zaliheExists(id))
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

        // POST: api/ZaliheAPI
        [ResponseType(typeof(dp_zalihe))]
        public IHttpActionResult Postdp_zalihe(dp_zalihe dp_zalihe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.dp_zalihe.Add(dp_zalihe);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = dp_zalihe.ID }, dp_zalihe);
        }

        // DELETE: api/ZaliheAPI/5
        [ResponseType(typeof(dp_zalihe))]
        public IHttpActionResult Deletedp_zalihe(int id)
        {
            dp_zalihe dp_zalihe = db.dp_zalihe.Find(id);
            if (dp_zalihe == null)
            {
                return NotFound();
            }

            db.dp_zalihe.Remove(dp_zalihe);
            db.SaveChanges();

            return Ok(dp_zalihe);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool dp_zaliheExists(int id)
        {
            return db.dp_zalihe.Count(e => e.ID == id) > 0;
        }
    }
}