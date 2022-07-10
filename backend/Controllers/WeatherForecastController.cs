using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [EnableCors]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing",
            "Bracing",
            "Chilly",
            "Cool",
            "Mild",
            "Warm",
            "Balmy",
            "Hot",
            "Sweltering",
            "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        private static WeatherForecast[] data = Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
            .ToArray();

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet("WeatherForecasts")]
        public IEnumerable<WeatherForecast> Get()
        {
            return data;
        }

        [HttpGet("WeatherForecast/{id}")]
        public ActionResult<WeatherForecast> Get(int id)
        {
            if (id < 0 || id >= data.Length)
            {
                return NotFound();
            }
            return data[id];
        }
    }
}