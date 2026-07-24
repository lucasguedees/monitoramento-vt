import { AlertStatus, CityThresholds, RiverReading, CalculatedReading, City } from '../types';

/**
 * Generates array of standard 15-minute time intervals for a 24h day
 * e.g., ["00:00", "00:15", "00:30", "00:45", ..., "23:45"]
 */
export function generateStandardTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 0; h < 24; h++) {
    const hh = String(h).padStart(2, '0');
    slots.push(`${hh}:00`);
    slots.push(`${hh}:15`);
    slots.push(`${hh}:30`);
    slots.push(`${hh}:45`);
  }
  return slots;
}

/**
 * Determines alert status based on river level and city threshold limits
 */
export function getAlertStatus(level: number, thresholds: CityThresholds): AlertStatus {
  if (level >= thresholds.inundacao) return 'inundacao';
  if (level >= thresholds.alerta) return 'alerta';
  if (level >= thresholds.atencao) return 'atencao';
  return 'normal';
}

/**
 * Get readable label in Portuguese for alert status
 */
export function getStatusLabel(status: AlertStatus): string {
  switch (status) {
    case 'inundacao': return 'Cota de Inundação';
    case 'alerta': return 'Cota de Alerta';
    case 'atencao': return 'Cota de Atenção';
    case 'normal': return 'Nível Normal';
  }
}

/**
 * Return badge style styling classes
 */
export function getStatusBadgeStyle(status: AlertStatus): { bg: string; text: string; border: string; dot: string } {
  switch (status) {
    case 'inundacao':
      return {
        bg: 'bg-red-50 dark:bg-red-950/40',
        text: 'text-red-700 dark:text-red-400',
        border: 'border-red-200 dark:border-red-800',
        dot: 'bg-red-500 animate-pulse',
      };
    case 'alerta':
      return {
        bg: 'bg-orange-50 dark:bg-orange-950/40',
        text: 'text-orange-700 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800',
        dot: 'bg-orange-500',
      };
    case 'atencao':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/40',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800',
        dot: 'bg-amber-500',
      };
    case 'normal':
    default:
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        text: 'text-emerald-700 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-800',
        dot: 'bg-emerald-500',
      };
  }
}

/**
 * Calculates rate of variation (in meters per hour) for sorted readings
 */
export function calculateCalculatedReadings(readings: RiverReading[], cities: City[]): CalculatedReading[] {
  const cityMap = new Map(cities.map(c => [c.id, c]));
  
  // Group readings by city
  const byCity = new Map<string, RiverReading[]>();
  readings.forEach(r => {
    if (!byCity.has(r.cityId)) byCity.set(r.cityId, []);
    byCity.get(r.cityId)!.push(r);
  });

  const result: CalculatedReading[] = [];

  byCity.forEach((cityReadings, cityId) => {
    const city = cityMap.get(cityId);
    const cityName = city ? city.name : 'Cidade Desconhecida';
    const thresholds = city ? city.thresholds : { atencao: 15, alerta: 17, inundacao: 19 };

    // Sort chronologically ascending
    const sorted = [...cityReadings].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    for (let i = 0; i < sorted.length; i++) {
      const current = sorted[i];
      let rate: number | null = null;

      if (i > 0) {
        const prev = sorted[i - 1];
        const prevTime = new Date(prev.timestamp).getTime();
        const currTime = new Date(current.timestamp).getTime();
        const diffHours = (currTime - prevTime) / (1000 * 60 * 60);

        if (diffHours > 0) {
          const diffMeters = current.levelMeters - prev.levelMeters;
          rate = diffMeters / diffHours; // m/h
        }
      }

      result.push({
        ...current,
        cityName,
        status: getAlertStatus(current.levelMeters, thresholds),
        variationMeterPerHour: rate,
      });
    }
  });

  // Return sorted descending by timestamp for list/table views
  return result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function formatDateTimeBR(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  } catch {
    return isoString;
  }
}

export function formatDateShort(dateStr: string): string {
  // input YYYY-MM-DD
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}`;
  }
  return dateStr;
}

export function getTodayDateStr(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getCurrentTimeNearest15(): string {
  const now = new Date();
  let minutes = now.getMinutes();
  let hours = now.getHours();

  if (minutes < 8) {
    minutes = 0;
  } else if (minutes < 23) {
    minutes = 15;
  } else if (minutes < 38) {
    minutes = 30;
  } else if (minutes < 53) {
    minutes = 45;
  } else {
    minutes = 0;
    hours = (hours + 1) % 24;
  }

  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');
  return `${hh}:${mm}`;
}

export function getCurrentTimeNearest30(): string {
  return getCurrentTimeNearest15();
}
