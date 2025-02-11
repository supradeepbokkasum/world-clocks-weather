export default {
  async fetch(request) {
    const url = new URL(request.url);
    const city = url.searchParams.get("city") || "London"; // Default city
    const apiKey = "YOUR_WEATHERAPI_KEY"; // Replace with your actual key

    const weatherResponse = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );

    const weatherData = await weatherResponse.json();

    return new Response(JSON.stringify(weatherData), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
