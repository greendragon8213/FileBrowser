using System.Web.Http;
using AutoMapper;
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.WebApi;

namespace FileBrowsing.App_Start
{
    public class UnityConfig
    {
        public static void RegisterComponents(HttpConfiguration config)
        {
            var container = new UnityContainer();
            
            container.RegisterType<IMapper>(new InjectionFactory(_ => AutoMapperConfig.ServiceMapper()));

            //log4net
            //container.RegisterInstance<ILog>(LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType));

            config.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}