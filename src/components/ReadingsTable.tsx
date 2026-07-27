import React, { useState, useMemo } from 'react';
import { CalculatedReading, City, AlertStatus } from '../types';
import { getStatusBadgeStyle, getStatusLabel, formatDateTimeBR } from '../utils/riverUtils';
import { Table, Search, Filter, Trash2, Edit3, Download, TrendingUp, TrendingDown, Minus, FileSpreadsheet, RefreshCw, Globe, ChevronDown, ChevronUp } from 'lucide-react';

interface ReadingsTableProps {
  readings: CalculatedReading[];
  cities: City[];
  onEditReading: (reading: CalculatedReading) => void;
  onDeleteReading: (readingId: string) => void;
  onExportCSV: () => void;
  onSyncAutomatedReadings?: () => void;
  isSyncing?: boolean;
  isAdminAuthorized?: boolean;
}

const ReadingsTableComponent: React.FC<ReadingsTableProps> = ({
  readings,
  cities,
  onEditReading,
  onDeleteReading,
  onExportCSV,
  onSyncAutomatedReadings,
  isSyncing = false,
  isAdminAuthorized = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');

  const filteredReadings = useMemo(() => {
    return readings.filter(r => {
      // City filter
      if (selectedCityFilter !== 'all' && r.cityId !== selectedCityFilter) {
        return false;
      }
      // Status filter
      if (selectedStatusFilter !== 'all' && r.status !== selectedStatusFilter) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchCity = r.cityName.toLowerCase().includes(term);
        const matchDate = r.dateStr.includes(term) || r.timeStr.includes(term);
        const matchNote = r.notes?.toLowerCase().includes(term) || false;
        if (!matchCity && !matchDate && !matchNote) return false;
      }
      return true;
    });
  }, [readings, selectedCityFilter, selectedStatusFilter, searchTerm]);

  return (
    <div id="readings-table-card" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-5 space-y-4">
      
      {/* Header (Clickable to Toggle Expansion) */}
      <div 
        onClick={() => setIsExpanded(prev => !prev)}
        className="flex items-center justify-between gap-4 cursor-pointer select-none group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 rounded-xl border border-cyan-100 dark:border-cyan-800/50">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 group-hover:text-cyan-500 transition-colors">
              Histórico de Registros de Nível do Rio
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                {readings.length}
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isExpanded 
                ? `${filteredReadings.length} medições encontradas no histórico` 
                : 'Clique aqui para expandir e visualizar a tabela completa com todas as medições'}
            </p>
          </div>
        </div>

        {/* Toggle Expand/Collapse Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(prev => !prev);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
        >
          <span>{isExpanded ? 'Recolher Painel' : 'Expandir Painel'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4 text-cyan-500" /> : <ChevronDown className="w-4 h-4 text-cyan-500" />}
        </button>
      </div>

      {/* Expanded Content: Filters and Table */}
      {isExpanded && (
        <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800 animate-fadeIn">
          {/* Controls & Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
            <div className="flex flex-wrap items-center gap-2">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  id="input-table-search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar cidade, data ou nota..."
                  className="pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 w-48 sm:w-56"
                />
              </div>

              {/* City Filter Dropdown */}
              <select
                id="select-table-city-filter"
                value={selectedCityFilter}
                onChange={(e) => setSelectedCityFilter(e.target.value)}
                className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="all">Todas as Cidades</option>
                {cities.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              {/* Status Filter Dropdown */}
              <select
                id="select-table-status-filter"
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="all">Todos os Status</option>
                <option value="normal">Normal</option>
                <option value="atencao">Cota de Atenção</option>
                <option value="alerta">Cota de Alerta</option>
                <option value="inundacao">Cota de Inundação</option>
              </select>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={onExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 dark:bg-cyan-950/60 hover:bg-cyan-100 dark:hover:bg-cyan-900 text-cyan-700 dark:text-cyan-300 text-xs font-semibold rounded-lg border border-cyan-200 dark:border-cyan-800 transition-colors cursor-pointer"
                title="Exportar tabela para CSV"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                CSV
              </button>

              {onSyncAutomatedReadings && (
                <button
                  onClick={onSyncAutomatedReadings}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  title="Buscar medição automática via estação de telemetria SACE/Defesa Civil"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar Telemetria'}</span>
                </button>
              )}
            </div>
          </div>

      {/* Table Area */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-3">Cidade</th>
              <th className="p-3">Data e Horário</th>
              <th className="p-3">Nível do Rio</th>
              <th className="p-3">Classificação</th>
              <th className="p-3">Variação (m/h)</th>
              <th className="p-3">Observações</th>
              <th className="p-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
            {filteredReadings.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500 dark:text-slate-400">
                  Nenhuma leitura encontrada com os filtros selecionados.
                </td>
              </tr>
            ) : (
              filteredReadings.map((reading) => {
                const badgeStyle = getStatusBadgeStyle(reading.status);
                const variation = reading.variationMeterPerHour;

                return (
                  <tr
                    key={reading.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* City */}
                    <td className="p-3 font-bold text-slate-900 dark:text-white">
                      {reading.cityName}
                    </td>

                    {/* Date & Standard Time */}
                    <td className="p-3 font-medium text-slate-700 dark:text-slate-300">
                      {formatDateTimeBR(reading.timestamp)}
                    </td>

                    {/* Gauge Measurement */}
                    <td className="p-3 font-mono font-extrabold text-sm text-cyan-600 dark:text-cyan-400">
                      {reading.levelMeters.toFixed(2)} m
                    </td>

                    {/* Alert Badge */}
                    <td className="p-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot}`} />
                        {getStatusLabel(reading.status)}
                      </span>
                    </td>

                    {/* Variation Speed */}
                    <td className="p-3 font-mono">
                      {variation !== null ? (
                        <span className={`inline-flex items-center gap-1 font-semibold ${
                          variation > 0.02
                            ? 'text-red-600 dark:text-red-400'
                            : variation < -0.02
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-500'
                        }`}>
                          {variation > 0.02 ? (
                            <>
                              <TrendingUp className="w-3.5 h-3.5" />
                              +{(variation * 100).toFixed(0)} cm/h
                            </>
                          ) : variation < -0.02 ? (
                            <>
                              <TrendingDown className="w-3.5 h-3.5" />
                              {(variation * 100).toFixed(0)} cm/h
                            </>
                          ) : (
                            <>
                              <Minus className="w-3.5 h-3.5" />
                              Estável
                            </>
                          )}
                        </span>
                      ) : (
                        <span className="text-slate-400">--</span>
                      )}
                    </td>

                    {/* Notes */}
                    <td className="p-3 text-slate-600 dark:text-slate-400 italic max-w-xs truncate">
                      {reading.notes || '-'}
                    </td>

                    {/* Action buttons */}
                    <td className="p-3 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => onEditReading(reading)}
                        className="p-1 text-slate-400 hover:text-cyan-600 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Editar Leitura de Cota"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteReading(reading.id)}
                        className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Excluir Leitura"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )}

</div>
  );
};

export const ReadingsTable = React.memo(ReadingsTableComponent);
