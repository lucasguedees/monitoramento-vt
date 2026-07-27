import { City } from '../types';

export const DEFAULT_CITIES: City[] = [
  {
    id: 'lajeado',
    name: 'Lajeado',
    riverName: 'Rio Taquari',
    thresholds: { atencao: 15.0, alerta: 17.0, inundacao: 19.0 },
    isDefault: true,
  },
  {
    id: 'arroio-do-meio',
    name: 'Arroio do Meio',
    riverName: 'Rio Taquari / Forqueta',
    thresholds: { atencao: 14.0, alerta: 16.0, inundacao: 18.0 },
    isDefault: true,
  },
  {
    id: 'encantado',
    name: 'Encantado',
    riverName: 'Rio Taquari',
    thresholds: { atencao: 11.0, alerta: 13.0, inundacao: 15.0 },
    isDefault: true,
  },
  {
    id: 'mucum',
    name: 'Muçum',
    riverName: 'Rio Taquari',
    thresholds: { atencao: 18.0, alerta: 20.0, inundacao: 22.0 },
    isDefault: true,
  },
  {
    id: 'roca-sales',
    name: 'Roca Sales',
    riverName: 'Rio Taquari',
    thresholds: { atencao: 9.0, alerta: 11.0, inundacao: 13.0 },
    isDefault: true,
  },
  {
    id: 'santa-tereza',
    name: 'Santa Tereza',
    riverName: 'Rio Taquari - Taquari/Das Antas',
    thresholds: { atencao: 10.0, alerta: 12.0, inundacao: 14.0 },
    isDefault: true,
  },
];


