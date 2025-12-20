import axios from 'axios';

// Cache keys
const WEATHER_CACHE_KEY = 'menux_weather_cache';
const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutes

/**
 * Weather codes interpretation from Open-Meteo WMO codes
 */
export const getWeatherDescription = (code) => {
  if (code === 0) return { label: 'Limpo', icon: 'sun' };
  if (code >= 1 && code <= 3) return { label: 'Nublado', icon: 'cloud' };
  if (code >= 45 && code <= 48) return { label: 'Nevoeiro', icon: 'fog' };
  if (code >= 51 && code <= 55) return { label: 'Garoa', icon: 'drizzle' };
  if (code >= 56 && code <= 57) return { label: 'Garoa Gelada', icon: 'drizzle-rain' };
  if (code >= 61 && code <= 65) return { label: 'Chuva', icon: 'rain' };
  if (code >= 66 && code <= 67) return { label: 'Chuva Congelante', icon: 'rain' };
  if (code >= 71 && code <= 77) return { label: 'Neve', icon: 'snow' };
  if (code >= 80 && code <= 82) return { label: 'Pancadas de Chuva', icon: 'rain' };
  if (code >= 85 && code <= 86) return { label: 'Pancadas de Neve', icon: 'snow' };
  if (code >= 95) return { label: 'Tempestade', icon: 'storm' };
  if (code >= 96 && code <= 99) return { label: 'Tempestade com Granizo', icon: 'storm' };
  return { label: 'Desconhecido', icon: 'cloud' };
};

export const weatherService = {
  /**
   * Fetch weather data for a given location.
   * Uses Open-Meteo API (free, no key).
   * @param {number} lat Latitude
   * @param {number} lon Longitude
   * @param {string} locationName Optional location name to store
   */
  async getWeather(lat = -23.5505, lon = -46.6333, locationName = 'São Paulo, SP') {
    // Check cache
    const cached = localStorage.getItem(WEATHER_CACHE_KEY);
    if (cached) {
      const { data, timestamp, coords } = JSON.parse(cached);
      const isSameLocation = Math.abs(coords.lat - lat) < 0.01 && Math.abs(coords.lon - lon) < 0.01;

      if (isSameLocation && (Date.now() - timestamp < CACHE_DURATION_MS)) {
        console.log('Using cached weather data');
        return data;
      }
    }

    try {
      // Fetch from Open-Meteo
      // Params:
      // current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m
      // hourly=temperature_2m,weather_code (for future forecast graph if needed)
      // forecast_days=1

      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: lat,
          longitude: lon,
          current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation',
          hourly: 'temperature_2m,weather_code,precipitation_probability',
          daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max',
          timezone: 'auto',
          forecast_days: 1
        }
      });

      const current = response.data.current;
      const daily = response.data.daily;
      const hourly = response.data.hourly;

      const weatherInfo = getWeatherDescription(current.weather_code);

      const processedData = {
        location: locationName,
        current: {
          temp: Math.round(current.temperature_2m),
          feels_like: Math.round(current.apparent_temperature),
          humidity: current.relative_humidity_2m,
          wind_speed: current.wind_speed_10m,
          condition: weatherInfo.label,
          icon_code: weatherInfo.icon,
          is_day: current.is_day, // 1 or 0
        },
        daily: {
          max: Math.round(daily.temperature_2m_max[0]),
          min: Math.round(daily.temperature_2m_min[0]),
          rain_prob: daily.precipitation_probability_max[0] || 0,
        },
        hourly: hourly.time.slice(0, 12).map((t, i) => ({
          time: t,
          temp: hourly.temperature_2m[i],
          precip_prob: hourly.precipitation_probability[i],
          code: hourly.weather_code[i]
        })),
        updatedAt: new Date().toISOString()
      };

      // Save to cache
      localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify({
        data: processedData,
        timestamp: Date.now(),
        coords: { lat, lon }
      }));

      return processedData;

    } catch (error) {
      console.error('Error fetching weather:', error);
      // Return fallback or previously cached if available (even if expired, better than nothing?)
      // For now, let's throw so UI handles error state or return partial mock
      throw error;
    }
  },

  /**
   * Geocoding to get lat/lon from city name
   * Uses Open-Meteo Geocoding API
   */
  async searchLocation(query) {
    try {
      const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
        params: {
          name: query,
          count: 5,
          language: 'pt',
          format: 'json'
        }
      });

      if (!response.data.results) return [];

      return response.data.results.map(item => ({
        id: item.id,
        name: item.name,
        admin1: item.admin1, // State/Region
        country: item.country,
        lat: item.latitude,
        lon: item.longitude
      }));
    } catch (error) {
      console.error('Geocoding error:', error);
      return [];
    }
  },

  /**
   * Generate Maestro Insights based on weather data
   */
  generateInsights(weatherData) {
    if (!weatherData) return [];

    const { current, daily } = weatherData;
    const temp = current.temp;
    const isRaining = current.condition.toLowerCase().includes('chuva') ||
      current.condition.toLowerCase().includes('garoa') ||
      daily.rain_prob > 60;

    let scenario = 'AGRADAVEL'; // Default
    if (isRaining) scenario = 'CHUVOSO';
    else if (temp >= 28) scenario = 'QUENTE';
    else if (temp <= 18) scenario = 'FRIO';

    // Insights Logic
    const insights = [];

    switch (scenario) {
      case 'QUENTE':
        insights.push({
          id: 'w-hot-1',
          title: 'Refresque seus clientes',
          reason: `Dia quente (${temp}°C). Entradas refrescantes e saladas vendem mais.`,
          suggestion: ['Saladas Especiais', 'Ceviches', 'Carpaccios'],
          type: 'cardapio',
          action: 'Destacar no Cardápio'
        });
        insights.push({
          id: 'w-hot-2',
          title: 'Aposte em Bebidas Geladas',
          reason: 'A sensação térmica pede hidratação e frescor.',
          suggestion: ['Sucos Naturais', 'Cervejas Artesanais', 'Drinks com Gin'],
          type: 'upsell',
          action: 'Criar Upsell de Bebidas'
        });
        insights.push({
          id: 'w-hot-3',
          title: 'Sobremesas leves',
          reason: 'Sorvetes e frutas são a preferência hoje.',
          suggestion: ['Sorvetes', 'Salada de Frutas', 'Mousses'],
          type: 'cardapio',
          action: 'Destacar Sobremesas'
        });
        break;

      case 'FRIO':
        insights.push({
          id: 'w-cold-1',
          title: 'Aqueça as vendas',
          reason: `Dia frio (${temp}°C). Pratos quentes e caldos são ideais.`,
          suggestion: ['Caldos e Sopas', 'Massas Gratinadas', 'Risotos'],
          type: 'cardapio',
          action: 'Destacar no Cardápio'
        });
        insights.push({
          id: 'w-cold-2',
          title: 'Bebidas que abraçam',
          reason: 'Vinhos e bebidas quentes aumentam o ticket.',
          suggestion: ['Vinhos Tintos', 'Cafés Especiais', 'Chás'],
          type: 'upsell',
          action: 'Sugerir Harmonização'
        });
        insights.push({
          id: 'w-cold-3',
          title: 'Sobremesas Quentes',
          reason: 'Petit gateau e brownies quentes convertem bem no frio.',
          suggestion: ['Petit Gateau', 'Brownie com Calda', 'Fondue'],
          type: 'cardapio',
          action: 'Destacar'
        });
        break;

      case 'CHUVOSO':
        insights.push({
          id: 'w-rain-1',
          title: 'Conforto para chuva',
          reason: 'Chuva pede pratos de conforto e maior permanência.',
          suggestion: ['Pratos para Compartilhar', 'Feijoada/Cozidos', 'Parmegianas'],
          type: 'cardapio',
          action: 'Destacar Família'
        });
        insights.push({
          id: 'w-rain-2',
          title: 'Delivery em Alta',
          reason: 'Se tiver delivery, reforce a operação. No salão, foque em ticket médio.',
          suggestion: ['Combos Família', 'Ofertas para 2 pessoas'],
          type: 'upsell',
          action: 'Criar Combos'
        });
        break;

      default: // AGRADAVEL
        insights.push({
          id: 'w-nice-1',
          title: 'Clima Agradável',
          reason: 'Tempo bom para explorar a área externa e drinks.',
          suggestion: ['Happy Hour', 'Porções', 'Drinks Autorais'],
          type: 'cardapio',
          action: 'Ativar Modo Happy Hour'
        });
        insights.push({
          id: 'w-nice-2',
          title: 'Foque nos Mais Rentáveis',
          reason: 'Sem extremos climáticos, o cliente está aberto a sugestões do chef.',
          suggestion: ['Pratos do Chef', 'Lançamentos', 'Steaks'],
          type: 'upsell',
          action: 'Destacar Premium'
        });
        break;
    }

    return {
      scenario,
      label: scenario === 'QUENTE' ? 'Dia Quente' :
        scenario === 'FRIO' ? 'Dia Frio' :
          scenario === 'CHUVOSO' ? 'Dia Chuvoso' : 'Clima Agradável',
      insights
    };
  }
};
