import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Form';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import {
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Droplets,
  MapPin,
  Clock,
  CloudFog,
  CloudSnow,
  CloudLightning,
  ChevronRight,
  Search
} from 'lucide-react';
import { weatherService, getWeatherDescription } from '../../services/weatherService';
import { cn } from '../../lib/utils';
import { toast } from 'react-hot-toast';

const WeatherIcon = ({ code, className }) => {
  // Simple mapping based on icon string from service or code
  const iconMap = {
    'sun': Sun,
    'cloud': Cloud,
    'rain': CloudRain,
    'drizzle': CloudRain,
    'drizzle-rain': CloudRain,
    'fog': CloudFog,
    'snow': CloudSnow,
    'storm': CloudLightning
  };

  const IconComponent = iconMap[code] || Cloud;
  return <IconComponent className={className} />;
};

export function WeatherCard({ weatherData, loading, onLocationChange }) {
  const [showHourly, setShowHourly] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // If loading or no data
  if (loading || !weatherData) {
    return (
      <Card className="p-6 flex flex-col justify-center items-center gap-4 border-none shadow-lg bg-white/50 animate-pulse h-[200px]">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </Card>
    );
  }

  const { current, daily, location, hourly, updatedAt } = weatherData;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!locationSearch.trim()) return;

    setSearching(true);
    try {
      const results = await weatherService.searchLocation(locationSearch);
      setSearchResults(results);
    } catch (err) {
      toast.error('Erro ao buscar cidade');
    } finally {
      setSearching(false);
    }
  };

  return (
    <>
      <Card className="p-6 flex flex-col justify-between bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white border-none shadow-lg shadow-blue-900/10 relative overflow-hidden h-full min-h-[180px]">
        {/* Decorative Background Icons */}
        <Cloud className="absolute -top-4 -right-4 w-32 h-32 text-white/10 rotate-12" />

        <div className="flex justify-between items-start z-10">
          <div>
            <div className="flex items-center gap-2 mb-1 cursor-pointer hover:bg-white/10 p-1 rounded transition-colors -ml-1" onClick={() => setShowLocation(true)}>
              <MapPin className="w-3 h-3 text-blue-100" />
              <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider truncate max-w-[150px]">
                {location}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <h3 className="text-4xl font-bold mt-1">{current.temp}°</h3>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-blue-100">{current.condition}</span>
                <span className="text-xs text-blue-200">H: {daily.max}° L: {daily.min}°</span>
              </div>
            </div>
          </div>
          <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm shadow-inner border border-white/10">
            <WeatherIcon code={current.icon_code} className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 z-10">
          <div className="bg-black/10 rounded-lg p-2 flex flex-col items-center justify-center backdrop-blur-sm">
            <Droplets className="w-4 h-4 text-blue-200 mb-1" />
            <span className="text-xs font-bold">{current.humidity}%</span>
            <span className="text-[10px] text-blue-200">Umidade</span>
          </div>
          <div className="bg-black/10 rounded-lg p-2 flex flex-col items-center justify-center backdrop-blur-sm">
            <Wind className="w-4 h-4 text-blue-200 mb-1" />
            <span className="text-xs font-bold">{current.wind_speed}km/h</span>
            <span className="text-[10px] text-blue-200">Vento</span>
          </div>
          <div className="bg-black/10 rounded-lg p-2 flex flex-col items-center justify-center backdrop-blur-sm">
            <CloudRain className="w-4 h-4 text-blue-200 mb-1" />
            <span className="text-xs font-bold">{daily.rain_prob}%</span>
            <span className="text-[10px] text-blue-200">Chuva</span>
          </div>
        </div>

        <div className="absolute bottom-2 right-3 z-10 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHourly(true)}
            className="text-[10px] h-6 px-2 text-blue-100 hover:bg-white/10 hover:text-white"
          >
            Ver horas
          </Button>
        </div>
      </Card>

      {/* Hourly Forecast Modal */}
      <Modal
        isOpen={showHourly}
        onClose={() => setShowHourly(false)}
        title={`Previsão por Hora - ${location}`}
      >
        <div className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-hide">
          {hourly && hourly.map((hour, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[60px] p-3 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                {new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <WeatherIcon code={getWeatherDescription(hour.code).icon} className="w-6 h-6 my-2 text-blue-500" />
              <span className="text-sm font-bold text-gray-900">{Math.round(hour.temp)}°</span>
              <div className="flex items-center gap-1 mt-1">
                <Droplets className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] text-blue-600 font-bold">{hour.precip_prob}%</span>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Location Search Modal */}
      <Modal
        isOpen={showLocation}
        onClose={() => setShowLocation(false)}
        title="Alterar Localização"
      >
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Digite cidade..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              autoFocus
            />
          </div>
          <Button type="submit" disabled={searching} className="bg-blue-600 text-white">
            {searching ? '...' : 'Buscar'}
          </Button>
        </form>

        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {searchResults.map((city) => (
            <button
              key={city.id}
              onClick={() => {
                onLocationChange(city);
                setShowLocation(false);
                setSearchResults([]);
                setLocationSearch('');
              }}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all flex justify-between items-center group"
            >
              <div>
                <p className="font-medium text-gray-900">{city.name}</p>
                <p className="text-xs text-gray-500">{city.admin1} - {city.country}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500" />
            </button>
          ))}
          {searchResults.length === 0 && locationSearch && !searching && (
            <p className="text-center text-sm text-gray-500 py-4">Nenhuma cidade encontrada.</p>
          )}
        </div>
      </Modal>
    </>
  );
}
