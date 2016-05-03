using AngularJSAuthentication.API.Infrastructure;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace AngularJSAuthentication.API.Controllers
{
    [RoutePrefix("api/RoleAPI")]
    [Authorize(Roles = "Administrator")]
    public class RoleController : BaseApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Role
        [Route("Index")]
        public string Get_roles()
        {


            var jsonResult = db.Roles.Where(y => y.Id != null).Select(x => new { ID = x.Id, RoleName = x.Name}).ToList();
            string json = JsonConvert.SerializeObject(jsonResult);
            return json;
        }
        [Route("Show/{roleId}")]
        public string Get_roles(string roleId)
        {
            var jsonResult = db.Roles.Where(x => x.Id == roleId).Select(x => new { ID = x.Id, RoleName = x.Name, id = x.Id }).ToList();
            string json = JsonConvert.SerializeObject(jsonResult);
            return json;
        }

        [Route("GetRolesForUser/{userId}")]
        public string GetRolesForUser(string userId) {

            var userRoles = this.AppUserManager.GetRoles(userId);
            var roles = db.Roles.Where(x => userRoles.Contains(x.Name)).Select(y => new {
                    RoleName = y.Name,
                    ID = y.Id
            });
            string json = JsonConvert.SerializeObject(roles);
            return json;
        }

        [Route("GetRolesForUserByName/{userName}")]
        public string GetRolesForUserByName(string userName)
        {
            var user = db.Users.Where(x => x.UserName == userName).First();
            var userRoles = this.AppUserManager.GetRoles(user.Id);
            var roles = db.Roles.Where(x => userRoles.Contains(x.Name)).Select(y => new {
                RoleName = y.Name,
                ID = y.Id
            });
            string json = JsonConvert.SerializeObject(roles);
            return json;
        }

        [Route("Delete/{id}")]
        public void Deleterole(string id)
        {
            IdentityRole role = db.Roles.Find(id);

            db.Roles.Remove(role);
            db.SaveChanges();
        }

        [HttpPost]
        [Route("Save")]
        public string Postrole()
        {
            string response = "";
            string input = "";
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            using (var reader = new StreamReader(HttpContext.Current.Request.InputStream))
            {
                input = reader.ReadToEnd();
            }
            if (input == "")
            {
                response = JsonConvert.SerializeObject(new
                {
                    ok = false,
                    message = "Desila se greška pri unosu role!",
                });
            }
            else
            {
                Dictionary<string, object> obj = (Dictionary<string, object>)serializer.DeserializeObject(input);
                IdentityRole role = new IdentityRole();
                role.Name = obj["roleName"].ToString();
                try
                {
                    db.Roles.Add(role);
                    db.SaveChanges();
                    response = JsonConvert.SerializeObject(new
                    {
                        ok = true,
                        message = "Uspješno ste unijeli novu rolu!"
                    });
                    return response;
                }
                catch(Exception e)
                {
                    response = JsonConvert.SerializeObject(new
                    {
                        ok = false,
                        message = "Desila se greška pri unosu rola!"
                    });
                    return response;
                }
            }
            return "";
        }

        [HttpPut]
        [Route("Edit/{id}")]
        public string EditRole(string id)
        {
            string response = "";
            string input = "";
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            using (var reader = new StreamReader(HttpContext.Current.Request.InputStream))
            {
                input = reader.ReadToEnd();
            }
            if (input == "")
            {
                response = JsonConvert.SerializeObject(new
                {
                    ok = false,
                    message = "Desila se greška pri ažuriranju role!",
                });
            }
            else
            {
                Dictionary<string, object> obj = (Dictionary<string, object>)serializer.DeserializeObject(input);
                IdentityRole role = db.Roles.Find(id);
                role.Name = obj["roleName"].ToString();
                try
                {

                    db.SaveChanges();
                    response = JsonConvert.SerializeObject(new
                    {
                        ok = true,
                        message = "Uspješno ste ažurirali rolu!"
                    });
                    return response;
                }
                catch (Exception e)
                {
                    response = JsonConvert.SerializeObject(new
                    {
                        ok = false,
                        message = "Desila se greška pri ažuriranju rola!"
                    });
                    return response;
                }
            }
            return "";
        }

        public void refreshRoles(ApplicationUser user)
        {
            var authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
            authenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
            var identity = this.AppUserManager.CreateIdentity(user, DefaultAuthenticationTypes.ApplicationCookie);
            authenticationManager.SignIn(new AuthenticationProperties { IsPersistent = false }, identity);
        }

        [Route("SaveRoles")]
        public string SaveRoles()
        {
            string response = "";
            string input = "";
            JavaScriptSerializer serializer = new JavaScriptSerializer();
;
            using (var reader = new StreamReader(HttpContext.Current.Request.InputStream))
            {
                input = reader.ReadToEnd();
            }
            if (input == "")
            {
                response = JsonConvert.SerializeObject(new
                {
                    ok = false,
                    message = "Desila se greška pri ažuriranju role!",
                });
            }
            else
            {
                Dictionary<string, object> obj = (Dictionary<string, object>)serializer.DeserializeObject(input);
                object[] roles = (object[])serializer.DeserializeObject(obj["roles"].ToString());
                for(int i = 0; i < roles.Length; i++)
                {
                    Dictionary<string, object> role = (Dictionary<string, object>)roles[i];

                    if (Convert.ToBoolean(role["status"])) {
                        this.AppUserManager.AddToRole(obj["userId"].ToString(), role["roleName"].ToString());
                    }
                    else
                    {
                        this.AppUserManager.RemoveFromRole(obj["userId"].ToString(), role["roleName"].ToString());
                    }
                }
                var user = db.Users.Find(obj["userId"].ToString());
                refreshRoles(user);
                response = JsonConvert.SerializeObject(new
                {
                    ok = true,
                    message = "Uspjeh!",
                });
            }
            return response;
        }
    }
}
