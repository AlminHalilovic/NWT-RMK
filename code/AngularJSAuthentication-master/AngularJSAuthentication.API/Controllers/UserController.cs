using AngularJSAuthentication.API.Infrastructure;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace AngularJSAuthentication.API.Controllers
{
    [RoutePrefix("api/UserAPI")]
    [Authorize(Roles = "Administrator")]
    public class UserController : BaseApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Role
        [Route("Index")]
        public string GetUsers()
        {


            var jsonResult = db.Users.Select(x => new { ID = x.Id, UserName = x.UserName, Email = x.Email,isBanned=!x.IsEnabled }).ToList();
            string json = JsonConvert.SerializeObject(jsonResult);
            return json;
        }
        [Route("Show/{userId}")]
        public string GetUser(string userId)
        {
            var jsonResult = db.Users.Where(x => x.Id == userId).Select(x => new { ID = x.Id, UserName = x.UserName, id = x.Id, Roles = x.Roles.ToList(), Email = x.Email}).ToList();
            string json = JsonConvert.SerializeObject(jsonResult);
            return json;
        }


        [Route("Delete/{id}")]
        public void DeleteUser(string id)
        {
            ApplicationUser user = db.Users.Find(id);
            db.Users.Remove(user);
            db.SaveChanges();
        }

        [HttpPost]
        [Route("Save")]
        public string PostUser()
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
                    message = "Desila se greška pri unosu korisnika!",
                });
            }
            else
            {
                Dictionary<string, object> obj = (Dictionary<string, object>)serializer.DeserializeObject(input);
                ApplicationUser user = new ApplicationUser();
                user.UserName = obj["userName"].ToString();
                user.Email = obj["email"].ToString();
                user.EmailConfirmed = true;
                user.FirstName = "FirstName";
                user.LastName = "LastName";
                try
                {
                    IdentityResult addUserResult = this.AppUserManager.Create(user, obj["password"].ToString());
                    if (addUserResult.Succeeded)
                    {
                        response = JsonConvert.SerializeObject(new
                        {
                            ok = true,
                            message = "Uspješno ste unijeli novu rolu!"
                        });
                    }
                    else
                    {
                        string errors = "";
                        foreach(string s in addUserResult.Errors)
                        {
                            errors += s + Environment.NewLine;
                        }
                        response = JsonConvert.SerializeObject(new
                        {
                            ok = false,
                            error = errors
                        });
                    }
                    
                    return response;
                }
                catch (Exception e)
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
                ApplicationUser user = this.AppUserManager.FindById(id);
                user.UserName = obj["userName"].ToString();
                user.Email = obj["email"].ToString();
                user.EmailConfirmed = true;
                try
                {

                    IdentityResult result = this.AppUserManager.ChangePassword(id, obj["currentPassword"].ToString(), obj["password"].ToString());
                    if (result.Succeeded)
                    {
                        this.AppUserManager.Update<ApplicationUser, string>(user);
                        response = JsonConvert.SerializeObject(new
                        {
                            ok = true,
                            message = "Uspješno ste ažurirali korisnika!"
                        });
                    }
                    else
                    {
                        string errors = "";
                        foreach (string s in result.Errors)
                        {
                            errors += s + Environment.NewLine;
                        }
                        response = JsonConvert.SerializeObject(new
                        {
                            ok = false,
                            error = errors
                        });
                    }
                    
                    return response;
                }
                catch (Exception e)
                {
                    response = JsonConvert.SerializeObject(new
                    {
                        ok = false,
                        message = "Desila se greška pri ažuriranju korisnika!"
                    });
                    return response;
                }
            }
            return "";
        }


        [HttpPut]
        [Route("BanUser/{id}")]
        public string BanUser(string id)
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
                    message = "Desila se greška pri akciji!",
                });
            }
            else
            {
                Dictionary<string, object> obj = (Dictionary<string, object>)serializer.DeserializeObject(input);
                ApplicationUser user = this.AppUserManager.FindById(id);
                user.IsEnabled = !(bool)obj["isBanned"];
                
                try
                {


                      this.AppUserManager.Update<ApplicationUser, string>(user);
                   // db.Set<ApplicationUser>().AddOrUpdate(user);
                        
                        response = JsonConvert.SerializeObject(new
                        {
                            ok = true,
                            message = "Uspjeh pri akciji!"
                        });
                    
                   

                    return response;
                }
                catch (Exception e)
                {
                    response = JsonConvert.SerializeObject(new
                    {
                        ok = false,
                        message = "Desila se greška pri akciji!"
                    });
                    return response;
                }
            }
            return "";
        }

    }
}
