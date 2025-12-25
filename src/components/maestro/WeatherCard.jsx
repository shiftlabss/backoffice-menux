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
  Search,
  ArrowRight
} from 'lucide-react';
import { weatherService, getWeatherDescription } from '../../services/weatherService';
import { cn } from '../../lib/utils';
import { toast } from 'react-hot-toast';
import { useAudit } from '../../hooks/useAudit';

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
  const { log } = useAudit();

  // If loading or no data
  if (loading || !weatherData) {
    return (
      <Card className="p-6 flex flex-col justify-center items-center gap-4 border-none shadow-lg bg-white/50 animate-pulse h-full min-h-[220px]">
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

  const handleOpenFullForecast = () => {
    log('dashboard.weather.open_full_forecast');
    setShowHourly(true);
  };

  // Helper for impact text (mock logic based on condition)
  const getImpactToConsumption = (temp, condition) => {
    const cond = condition.toLowerCase();
    if (cond.includes('chuv') || cond.includes('rain')) {
      return "Chuva tende a aumentar pedidos de delivery (+20%) e reduzir salão.";
    }
    if (temp > 28) {
      return "Calor intenso: Destaque bebidas geladas e sobremesas.";
    }
    if (temp < 18) {
      return "Clima frio: Ideal para promover caldos e vinhos.";
    }
    return "Clima agradável: Bom equilíbrio entre salão e delivery.";
  };

  const impactText = getImpactToConsumption(current.temp, current.condition);

  return (
    <>
      <Card className="flex flex-col justify-between bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white border-none shadow-lg shadow-blue-900/10 relative overflow-hidden h-full">
        {/* Decorative Background Icons */}
        <Cloud className="absolute -top-4 -right-4 w-32 h-32 text-white/10 rotate-12 pointer-events-none" />

        <div className="p-5 flex-1 flex flex-col">
          {/* Header: Location & Current Status */}
          <div className="flex justify-between items-start z-10 mb-4">
            <div>
              <div
                className="flex items-center gap-2 mb-1 cursor-pointer hover:bg-white/10 p-1 rounded transition-colors -ml-1 group"
                onClick={() => setShowLocation(true)}
              >
                <MapPin className="w-3 h-3 text-blue-100 group-hover:text-white" />
                <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider truncate max-w-[150px] group-hover:text-white">
                  {location}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <h3 className="text-4xl font-bold tracking-tight">{Math.round(current.temp)}°</h3>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-blue-50 leading-tight">{current.condition}</span>
                  <span className="text-[10px] text-blue-200">H: {Math.round(daily.max)}° L: {Math.round(daily.min)}°</span>
                </div>
              </div>
            </div>
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm shadow-inner border border-white/10">
              <WeatherIcon code={current.icon_code} className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Operational Impact Text */}
          <div className="mb-4 z-10">
            <p className="text-xs text-blue-100 bg-blue-600/30 p-2 rounded-lg border border-blue-500/30 leading-relaxed">
              {impactText}
            </p>
          </div>

          {/* Inline Hourly Preview */}
          <div className="z-10 mt-auto">
            <h4 className="text-[10px] uppercase font-bold text-blue-200 mb-2">Próximas 3 Horas</h4>
            <div className="grid grid-cols-3 gap-2">
              {hourly && hourly.slice(0, 3).map((hour, idx) => (
                <div key={idx} className="bg-white/10 rounded-lg p-2 flex flex-col items-center justify-center backdrop-blur-sm border border-white/5">
                  <span className="text-[10px] font-medium text-blue-100 mb-1">
                    {new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <WeatherIcon code={getWeatherDescription(hour.code).icon} className="w-4 h-4 mb-1 text-white" />
                  <span className="text-xs font-bold">{Math.round(hour.temp)}°</span>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <Droplets className="w-2 h-2 text-blue-300" />
                    <span className="text-[9px] text-blue-200">{hour.precip_prob}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-3 bg-black/10 backdrop-blur-md border-t border-white/10 flex justify-center z-20">
          <button
            onClick={handleOpenFullForecast}
            className="text-xs font-medium text-blue-100 hover:text-white flex items-center gap-2 transition-colors w-full justify-center"
          >
            Ver previsão completa <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </Card>

      {/* Hourly Forecast Modal (Full) */}
      <Modal
        isOpen={showHourly}
        onClose={() => setShowHourly(false)}
        title={`Previsão Detalhada - ${location}`}
        className="max-w-2xl"
      >
        <div className="p-2 overflow-x-auto">
          <div className="flex gap-4 min-w-max pb-4">
            {hourly && hourly.map((hour, idx) => (
              <div key={idx} className="flex flex-col items-center w-[80px] p-4 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                <span className="text-xs text-slate-500 font-semibold mb-2">
                  {new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <WeatherIcon code={getWeatherDescription(hour.code).icon} className="w-8 h-8 mb-2 text-slate-700" />
                <span className="text-lg font-bold text-slate-900 mb-1">{Math.round(hour.temp)}°</span>
                <div className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full">
                  <Droplets className="w-3 h-3 text-blue-500" />
                  <span className="text-[10px] text-blue-700 font-bold">{hour.precip_prob}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
            <CloudLightning className="w-4 h-4" /> Insight Operacional
          </h4>
          <p className="text-sm text-blue-800">
            Baseado na previsão, recomenda-se ajustar o quadro de entregadores para o período da noite (20h-23h) devido à alta probabilidade de chuva.
          </p>
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
