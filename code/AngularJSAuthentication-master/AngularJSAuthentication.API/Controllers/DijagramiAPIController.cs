﻿using AngularJSAuthentication.API.Models;
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
                dvm.brojStornihDokumenata = slog2.Count;
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
            var slog1 = db.dp_izlazi.Where(x => x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA == vrstaIzdatnica).ToList();
            if (slog1 != null && slog1.Count != 0)
                dvm.brojDokumenata = slog1.Count;

            var slog2 = db.dp_izlazi.Where(x => x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA == vrstaStornoIzdatnica).ToList();
            if (slog2 != null && slog2.Count != 0)
                dvm.brojStornihDokumenata = slog2.Count;
            return dvm;
        }

        [HttpGet]
        [Route("GetPocetnoStanje")]
        public DijagramiViewModel GetPocetnoStanje(string startDate, string endDate, int dummy)
        {
            DijagramiViewModel dvm = new DijagramiViewModel();
            DateTime startD = new DateTime();
            DateTime endD = new DateTime();
            int vrstaPocetnoStanje = vrsteController.getIdBySifra("PS");
            int vrstaStornoPocetnoStanje = vrsteController.getIdBySifra("SPS");
            try
            {
                startD = DateTime.ParseExact(startDate, "d/M/yyyy", CultureInfo.InvariantCulture);
                endD = DateTime.ParseExact(endDate, "d/M/yyyy", CultureInfo.InvariantCulture);
            }
            catch (Exception e) { }
            var slog1 = db.dp_ulazi.Where(x => x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA == vrstaPocetnoStanje).ToList();
            if (slog1 != null && slog1.Count != 0)
                dvm.brojDokumenata = slog1.Count;

            var slog2 = db.dp_ulazi.Where(x => x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA == vrstaStornoPocetnoStanje).ToList();
            if (slog2 != null && slog2.Count != 0)
                dvm.brojStornihDokumenata = slog2.Count;
            return dvm;
        }

        [HttpGet]
        [Route("GetInventurniManjak")]
        public DijagramiViewModel GetInventurniManjak(string startDate, string endDate, int dummy)
        {
            DijagramiViewModel dvm = new DijagramiViewModel();
            DateTime startD = new DateTime();
            DateTime endD = new DateTime();
            int vrstaInventura = vrsteController.getIdBySifra("INV");
            int vrstaInventurniManjak = vrsteController.getIdBySifra("INVM");
            try
            {
                startD = DateTime.ParseExact(startDate, "d/M/yyyy", CultureInfo.InvariantCulture);
                endD = DateTime.ParseExact(endDate, "d/M/yyyy", CultureInfo.InvariantCulture);
            }
            catch (Exception e) { }
            var slog1 = db.dp_inventure.Where(x => x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA == vrstaInventura).ToList();
            if (slog1 != null && slog1.Count != 0)
                dvm.brojDokumenata = slog1.Count;

            var slog2 = db.dp_izlazi.Where(x => x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA == vrstaInventurniManjak).ToList();
            if (slog2 != null && slog2.Count != 0)
                dvm.brojStornihDokumenata = slog2.Count;
            return dvm;
        }

        [HttpGet]
        [Route("GetInventurniVisak")]
        public DijagramiViewModel GetInventurniVisak(string startDate, string endDate, int dummy)
        {
            DijagramiViewModel dvm = new DijagramiViewModel();
            DateTime startD = new DateTime();
            DateTime endD = new DateTime();
            int vrstaInventura = vrsteController.getIdBySifra("INV");
            int vrstaInventurniVisak = vrsteController.getIdBySifra("INVV");
            try
            {
                startD = DateTime.ParseExact(startDate, "d/M/yyyy", CultureInfo.InvariantCulture);
                endD = DateTime.ParseExact(endDate, "d/M/yyyy", CultureInfo.InvariantCulture);
            }
            catch (Exception e) { }
            var slog1 = db.dp_inventure.Where(x => x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA == vrstaInventura).ToList();
            if (slog1 != null && slog1.Count != 0)
                dvm.brojDokumenata = slog1.Count;

            var slog2 = db.dp_ulazi.Where(x => x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA == vrstaInventurniVisak).ToList();
            if (slog2 != null && slog2.Count != 0)
                dvm.brojStornihDokumenata = slog2.Count;
            return dvm;
        }

        [HttpGet]
        [Route("GetInventurniVisakManjak")]
        public DijagramiViewModel GetInventurniVisakManjak(string startDate, string endDate, int dummy)
        {
            DijagramiViewModel dvm = new DijagramiViewModel();
            DateTime startD = new DateTime();
            DateTime endD = new DateTime();
            int vrstaInventurniVisak = vrsteController.getIdBySifra("INVV");
            int vrstaInventurniManjak = vrsteController.getIdBySifra("INVM");
            try
            {
                startD = DateTime.ParseExact(startDate, "d/M/yyyy", CultureInfo.InvariantCulture);
                endD = DateTime.ParseExact(endDate, "d/M/yyyy", CultureInfo.InvariantCulture);
            }
            catch (Exception e) { }
            var slog1 = db.dp_ulazi.Where(x => x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA == vrstaInventurniVisak).ToList();
            if (slog1 != null && slog1.Count != 0)
                dvm.brojDokumenata = slog1.Count;

            var slog2 = db.dp_izlazi.Where(x => x.DATUM_UNOSA >= startD && x.DATUM_UNOSA <= endD && x.VRSTA_DOKUMENTA == vrstaInventurniManjak).ToList();
            if (slog2 != null && slog2.Count != 0)
                dvm.brojStornihDokumenata = slog2.Count;
            return dvm;
        }

    }
}
