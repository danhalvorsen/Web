using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    //[Authorize(Roles = "api://ad5f4924-a821-4e12-8580-8d42dab855e2/api.full.access")]
    //[RequiredScope("https://halvorsenorg.onmicrosoft.com/ad5f4924-a821-4e12-8580-8d42dab855e2/api.full.access")]
    public class WeatherForecastController : ControllerBase
    { 
    

        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }


        [Microsoft.AspNetCore.Mvc.HttpGet("Test")]
        //[HttpGet(Name = "Something")]
        [RequiredScope("api.full.access")]
        public ActionResult Something()
        {
            return Ok("returning something you want - you have the right scope");
        }

        [HttpGet(Name = "GetWeatherForecast")]
        [RequiredScope("read_access_to_api")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}