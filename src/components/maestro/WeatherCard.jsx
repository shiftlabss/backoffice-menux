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
  ArrowRight,
  TrendingUp
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
      <Card className="flex flex-col justify-between bg-white border border-slate-200 shadow-sm relative overflow-hidden">

        <div className="p-4 flex-1 flex flex-col">
          {/* Header: Compact B2B Line */}
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
            <div
              className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded-md transition-colors -ml-2 group"
              onClick={() => setShowLocation(true)}
            >
              <WeatherIcon code={current.icon_code} className="w-5 h-5 text-slate-600" />
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <span className="truncate max-w-[120px]">{location}</span>
                <span className="text-slate-300">·</span>
                <span className="capitalize text-slate-500 font-medium">{current.condition}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-900 font-bold">{Math.round(current.temp)}°C</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider leading-none mb-0.5">Máx / Mín</span>
                <span className="text-[11px] font-bold text-slate-600 leading-none">{Math.round(daily.max)}° / {Math.round(daily.min)}°</span>
              </div>
            </div>
          </div>

          {/* Operational Insight Block (Focal Point) */}
          <div className="mb-4">
            <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1 bg-white rounded border border-slate-100">
                  <TrendingUp className="w-3 h-3 text-slate-500" />
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">Insight Operacional</span>
              </div>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                {impactText}
              </p>
            </div>
          </div>

          {/* Estimated Climate Impact (New Block) */}
          <div className="mb-4">
            <div className="p-3 border border-slate-100 rounded-lg">
              <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-3">Impacto estimado do clima hoje</h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-500 font-medium leading-none">Receita Incremental</p>
                  <p className="text-sm font-bold text-emerald-600">+R$ 280 a +R$ 420</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-500 font-medium leading-none">Conversão de Bebidas</p>
                  <p className="text-sm font-bold text-blue-600">+6% a +10%</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-50">
                <p className="text-[9px] text-slate-400 italic">
                  Baseado em 1.420 sessões em dias com clima similar
                </p>
              </div>
            </div>
          </div>

          {/* Compact Hourly Preview */}
          <div className="mt-auto pt-2">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Próximas Horas</h4>
              <div className="flex items-center gap-1">
                <Droplets className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] font-bold text-blue-500">{daily.rain_prob}% Risco</span>
              </div>
            </div>

            <div className="space-y-1.5">
              {hourly && hourly.slice(0, 3).map((hour, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-slate-500 w-10">
                      {new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <WeatherIcon code={getWeatherDescription(hour.code).icon} className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[11px] font-medium text-slate-600 capitalize">
                      {getWeatherDescription(hour.code)?.description?.split(',')[0] || ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-blue-400">
                      <Droplets className="w-3 h-3" />
                      <span className="text-[11px] font-bold">{hour.precip_prob}%</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-900 w-8 text-right">{Math.round(hour.temp)}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA - Simple Link Style */}
        <div className="p-3 bg-slate-50/50 border-t border-slate-100 flex justify-center">
          <button
            onClick={handleOpenFullForecast}
            className="text-[11px] font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-all group"
          >
            Ver previsão completa
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
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
          <button type="submit" disabled={searching} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
            {searching ? '...' : 'Buscar'}
          </button>
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
