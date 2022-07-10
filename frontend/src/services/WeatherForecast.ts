type WeatherForecast =
    {
        date: Date,
        temperatureC: Number,
        temperatureF: Number,
        summary: string
    };
export type { WeatherForecast };

export default {
    async getAll(): Promise<WeatherForecast[]> {
        const fetchResult = await fetch('https://localhost:5001' + '/WeatherForecast/WeatherForecasts');
        const data = (await fetchResult.json()) as WeatherForecast[];
        return data;
    },
    async getById(id: Number): Promise<WeatherForecast | null | Error> {
        const fetchResult = await fetch('https://localhost:5001' + `/WeatherForecast/WeatherForecast/${id}`);
        if (fetchResult.status == 404) return null;
        if (!fetchResult.ok) return Error(fetchResult.statusText);

        const data = (await fetchResult.json()) as WeatherForecast;
        return data;
    }
}