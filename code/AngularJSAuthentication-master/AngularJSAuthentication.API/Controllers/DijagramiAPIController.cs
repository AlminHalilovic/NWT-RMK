using AngularJSAuthentication.API.Models;
using AngularJSAuthentication.Models.API;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AngularJSAuthentication.API.Controllers
{
    [RoutePrefix("api/DijagramiAPI")]
    [Authorize(Roles = "Administrator")]
    public class DijagramiAPIController : ApiController
    {
        private materijalno db = new materijalno();
      

        [HttpGet]
        public DijagramiViewModel GetPrimka(string startDate,string endDate)
        {
            DijagramiViewModel dvm = new DijagramiViewModel();
            DateTime startD = new DateTime();
            DateTime endD = new DateTime();
            try
            {
                startD = DateTime.Parse(startDate);
                endD = DateTime.Parse(endDate);
            }
            catch (Exception e){}
            var slog1 = db.dp_ulazi.Where(x =>x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA==1).ToList();
            if (slog1 != null && slog1.Count != 0)
                dvm.brojDokumenata = slog1.Count;

           var slog2 = db.dp_ulazi.Where(x => x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA==6).ToList();
            if (slog2 != null && slog2.Count != 0)
                dvm.brojDokumenata = slog2.Count;
            return dvm;
    }

        [HttpGet]
        public DijagramiViewModel GetIzdatnica(string startDate, string endDate)
        {
            DijagramiViewModel dvm = new DijagramiViewModel();
            DateTime startD = new DateTime();
            DateTime endD = new DateTime();
            try
            {
                startD = DateTime.Parse(startDate);
                endD = DateTime.Parse(endDate);
            }
            catch (Exception e) { }
            var slog1 = db.dp_ulazi.Where(x => x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA == 3).ToList();
            if (slog1 != null && slog1.Count != 0)
                dvm.brojDokumenata = slog1.Count;

            var slog2 = db.dp_ulazi.Where(x => x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA == 7).ToList();
            if (slog2 != null && slog2.Count != 0)
                dvm.brojDokumenata = slog2.Count;
            return dvm;
        }
    }
}
