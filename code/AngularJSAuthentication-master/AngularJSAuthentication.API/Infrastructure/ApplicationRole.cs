using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AngularJSAuthentication.API.Infrastructure
{
    public class ApplicationRole : IdentityRole
    {

        [Required]
        [MaxLength(100)]
        public string RoleName { get; set; }
        public ApplicationRole() : base() { }
        public ApplicationRole(string roleName) : base(roleName) { }
    }

}