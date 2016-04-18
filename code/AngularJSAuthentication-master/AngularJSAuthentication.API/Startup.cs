using AngularJSAuthentication.API.Infrastructure;
using AngularJSAuthentication.API.Providers;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.Facebook;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using Owin;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;


[assembly: OwinStartup(typeof(AngularJSAuthentication.API.Startup))]

namespace AngularJSAuthentication.API
{
    //public class Startup
    //{
    //    public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }
    //    public static GoogleOAuth2AuthenticationOptions googleAuthOptions { get; private set; }
    //    public static FacebookAuthenticationOptions facebookAuthOptions { get; private set; }

    //    public void Configuration(IAppBuilder app)
    //    {
    //        HttpConfiguration config = new HttpConfiguration();

    //        ConfigureOAuth(app);

    //        WebApiConfig.Register(config);
    //        app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
    //        app.UseWebApi(config);
    //        Database.SetInitializer(new MigrateDatabaseToLatestVersion<AuthContext, AngularJSAuthentication.API.Migrations.Configuration>());

    //    }

    //    public void ConfigureOAuth(IAppBuilder app)
    //    {
    //        //use a cookie to temporarily store information about a user logging in with a third party login provider
    //        app.UseExternalSignInCookie(Microsoft.AspNet.Identity.DefaultAuthenticationTypes.ExternalCookie);
    //        OAuthBearerOptions = new OAuthBearerAuthenticationOptions();

    //        OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
    //        {

    //            AllowInsecureHttp = true,
    //            TokenEndpointPath = new PathString("/token"),
    //            AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(30),
    //            Provider = new SimpleAuthorizationServerProvider(),
    //            RefreshTokenProvider = new SimpleRefreshTokenProvider()
    //        };

    //        // Token Generation
    //        app.UseOAuthAuthorizationServer(OAuthServerOptions);
    //        app.UseOAuthBearerAuthentication(OAuthBearerOptions);

    //        //Configure Google External Login
    //        googleAuthOptions = new GoogleOAuth2AuthenticationOptions()
    //        {
    //            ClientId = "xxxxxx",
    //            ClientSecret = "xxxxxx",
    //            Provider = new GoogleAuthProvider()
    //        };
    //        app.UseGoogleAuthentication(googleAuthOptions);

    //        //Configure Facebook External Login
    //        facebookAuthOptions = new FacebookAuthenticationOptions()
    //        {
    //            AppId = "xxxxxx",
    //            AppSecret = "xxxxxx",
    //            Provider = new FacebookAuthProvider()
    //        };
    //        app.UseFacebookAuthentication(facebookAuthOptions);

    //    }
    //}
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration httpConfig = new HttpConfiguration();

            ConfigureOAuthTokenGeneration(app);

            ConfigureOAuthTokenConsumption(app);

            ConfigureWebApi(httpConfig);

            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            app.UseWebApi(httpConfig);

        }

        private void ConfigureOAuthTokenGeneration(IAppBuilder app)
        {
            // Configure the db context and user manager to use a single instance per request
            app.CreatePerOwinContext(ApplicationDbContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            app.CreatePerOwinContext<ApplicationRoleManager>(ApplicationRoleManager.Create);

            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                //For Dev enviroment only (on production should be AllowInsecureHttp = false)
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/oauth/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new CustomOAuthProvider(),
                AccessTokenFormat = new CustomJwtFormat("http://localhost:26264")
            };

            // OAuth 2.0 Bearer Access Token Generation
            app.UseOAuthAuthorizationServer(OAuthServerOptions);
        }

        private void ConfigureOAuthTokenConsumption(IAppBuilder app)
        {

            var issuer = "http://localhost:26264";
            string audienceId = ConfigurationManager.AppSettings["as:AudienceId"];
            byte[] audienceSecret = TextEncodings.Base64Url.Decode(ConfigurationManager.AppSettings["as:AudienceSecret"]);

            // Api controllers with an [Authorize] attribute will be validated with JWT
            app.UseJwtBearerAuthentication(
                new JwtBearerAuthenticationOptions
                {
                    AuthenticationMode = AuthenticationMode.Active,
                    AllowedAudiences = new[] { audienceId },
                    IssuerSecurityTokenProviders = new IIssuerSecurityTokenProvider[]
                    {
                        new SymmetricKeyIssuerSecurityTokenProvider(issuer, audienceSecret)
                    }
                });
        }

        private void ConfigureWebApi(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }

}