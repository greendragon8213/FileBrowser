using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using FileBrowsing.App_Start;

namespace FileBrowsing
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            UnityConfig.RegisterComponents(config);
            // Web API configuration and services
            var corsAttr = new EnableCorsAttribute("http://localhost:65242", "*", "*");
            config.EnableCors(corsAttr);
            //config.EnableCors();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
