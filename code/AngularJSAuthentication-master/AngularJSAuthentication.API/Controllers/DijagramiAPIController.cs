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
        private VrsteDokumenataAPIController vrsteController = new VrsteDokumenataAPIController();

        [HttpGet]
        public DijagramiViewModel GetPrimka(string startDate,string endDate)
        {
            DijagramiViewModel dvm = new DijagramiViewModel();
            DateTime startD = new DateTime();
            DateTime endD = new DateTime();
            int vrstaPrimka = vrsteController.getIdBySifra("PR");
            int vrstaStornoPrimka = vrsteController.getIdBySifra("SPR");
            try
            {
                startD = DateTime.ParseExact(startDate, "d/M/yyyy", CultureInfo.InvariantCulture);
                endD = DateTime.ParseExact(endDate, "d/M/yyyy", CultureInfo.InvariantCulture);
            }
            catch (Exception e){}
            var datumi = db.dp_ulazi.Select(x => x.DATUM_UNOSA).ToList();
            var slog1 = db.dp_ulazi.Where(x => x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA == vrstaPrimka).ToList();
            if (slog1 != null && slog1.Count != 0)
                dvm.brojDokumenata = slog1.Count;

           var slog2 = db.dp_ulazi.Where(x => x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA == vrstaStornoPrimka).ToList();
            if (slog2 != null && slog2.Count != 0)
                dvm.brojDokumenata = slog2.Count;
            return dvm;
    }

        [HttpGet]
        public DijagramiViewModel GetIzdatnica(string startDate, string endDate, int dummy)
        {
            DijagramiViewModel dvm = new DijagramiViewModel();
            DateTime startD = new DateTime();
            DateTime endD = new DateTime();
            int vrstaIzdatnica = vrsteController.getIdBySifra("IZD");
            int vrstaStornoIzdatnica = vrsteController.getIdBySifra("SIZD");
            try
            {
                startD = DateTime.ParseExact(startDate, "d/M/yyyy", CultureInfo.InvariantCulture);
                endD = DateTime.ParseExact(endDate, "d/M/yyyy", CultureInfo.InvariantCulture);
            }
            catch (Exception e) { }
            var slog1 = db.dp_ulazi.Where(x => x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA == vrstaIzdatnica).ToList();
            if (slog1 != null && slog1.Count != 0)
                dvm.brojDokumenata = slog1.Count;

            var slog2 = db.dp_ulazi.Where(x => x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA == vrstaStornoIzdatnica).ToList();
            if (slog2 != null && slog2.Count != 0)
                dvm.brojDokumenata = slog2.Count;
            return dvm;
        }
    }
}
