import { Shelter, ShelterReading } from '../types';

export const DEFAULT_SHELTERS: Shelter[] = [
  {
    id: 'shelter-lajeado-1',
    name: 'Parque do Imigrante - Pavilhão 2',
    cityId: 'lajeado',
    cityName: 'Lajeado',
    address: 'Bairro Alto do Parque, Lajeado - RS',
    contact: '(51) 3982-1000 / Defesa Civil Lajeado',
    status: 'ativo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'shelter-lajeado-2',
    name: 'Ginásio do CEM São Cristóvão',
    cityId: 'lajeado',
    cityName: 'Lajeado',
    address: 'Rua Visconde de Tamandaré, Bairro São Cristóvão',
    contact: '(51) 3982-1020',
    status: 'ativo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'shelter-estrela-1',
    name: 'Ginásio Municipal Itaqui',
    cityId: 'estrela',
    cityName: 'Estrela',
    address: 'Bairro Itaqui, Estrela - RS',
    contact: '(51) 3981-1000 / Defesa Civil Estrela',
    status: 'ativo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'shelter-estrela-2',
    name: 'Salão Comunitário Cristo Rei',
    cityId: 'estrela',
    cityName: 'Estrela',
    address: 'Bairro Cristo Rei, Estrela - RS',
    contact: '(51) 3981-1020',
    status: 'ativo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'shelter-arroio-1',
    name: 'Ginásio Municipal de Esportes Arroio do Meio',
    cityId: 'arroio-do-meio',
    cityName: 'Arroio do Meio',
    address: 'Centro, Arroio do Meio - RS',
    contact: '(51) 3716-1166',
    status: 'ativo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'shelter-cruzeiro-1',
    name: 'Salão Paroquial de Cruzeiro do Sul',
    cityId: 'cruzeiro-do-sul',
    cityName: 'Cruzeiro do Sul',
    address: 'Centro, Cruzeiro do Sul - RS',
    contact: '(51) 3764-1122',
    status: 'ativo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'shelter-taquari-1',
    name: 'Ginásio da Escola Passos',
    cityId: 'taquari',
    cityName: 'Taquari',
    address: 'Bairro Praia, Taquari - RS',
    contact: '(51) 3653-6200',
    status: 'ativo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'shelter-teutonia-1',
    name: 'Comunidade Evangélica Languiru',
    cityId: 'teutonia',
    cityName: 'Teutônia',
    address: 'Bairro Languiru, Teutônia - RS',
    contact: '(51) 3762-7700',
    status: 'preparacao',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'shelter-mucum-1',
    name: 'Salão Paroquial Nossa Senhora da Purificação',
    cityId: 'mucum',
    cityName: 'Muçum',
    address: 'Centro, Muçum - RS',
    contact: '(51) 3755-1122 / Ação Social',
    status: 'ativo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'shelter-rocasales-1',
    name: 'Ginásio Municipal de Esportes de Roca Sales',
    cityId: 'roca-sales',
    cityName: 'Roca Sales',
    address: 'Rua General Osório, Centro, Roca Sales',
    contact: '(51) 3753-2100',
    status: 'ativo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'shelter-encantado-1',
    name: 'Comunidade Laranjeiras',
    cityId: 'encantado',
    cityName: 'Encantado',
    address: 'Bairro Laranjeiras, Encantado - RS',
    contact: '(51) 3751-0100',
    status: 'ativo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'shelter-santatereza-1',
    name: 'Salão Comunitário de Santa Tereza',
    cityId: 'santa-tereza',
    cityName: 'Santa Tereza',
    address: 'Centro, Santa Tereza - RS',
    contact: '(54) 3456-1100',
    status: 'preparacao',
    createdAt: new Date().toISOString(),
  }
];

export const DEFAULT_DATA_SOURCES: string[] = [
  'Defesa Civil Municipal',
  'Assistência Social (CRAS/CREAS)',
  'Cruz Vermelha Brasileira',
  'Exército / Brigada Militar',
  'Corpo de Bombeiros Militar',
  'Coordenação Voluntária do Abrigo',
  'Prefeitura Municipal',
  'Comitê Comunitário de Emergência'
];

export const DEFAULT_DEMOGRAPHIC_CATEGORIES: string[] = [
  'Idosos',
  'Adolescentes',
  'Crianças',
  'Bebês',
  'PCDs',
  'Gestantes',
  'Pets'
];

export function generateInitialShelterReadings(): ShelterReading[] {
  const readings: ShelterReading[] = [];
  const now = new Date();

  const getTimestamp = (hoursAgo: number) => {
    const d = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
    const dateStr = d.toISOString().split('T')[0];
    const timeStr = d.toTimeString().split(' ')[0].substring(0, 5);
    return {
      timestamp: `${dateStr}T${timeStr}`,
      dateStr,
      timeStr,
    };
  };

  const historyConfigs = [
    {
      shelterId: 'shelter-lajeado-1',
      progression: [
        { hoursAgo: 48, people: 85, families: 28, demo: { 'Idosos': 12, 'Adolescentes': 15, 'Crianças': 24, 'Bebês': 5, 'PCDs': 2, 'Pets': 6 }, source: 'Defesa Civil Municipal', notes: 'Abertura do abrigo emergencial.' },
        { hoursAgo: 36, people: 160, families: 52, demo: { 'Idosos': 22, 'Adolescentes': 30, 'Crianças': 45, 'Bebês': 10, 'PCDs': 4, 'Pets': 11 }, source: 'Assistência Social (CRAS/CREAS)', notes: 'Chegada de novos desabrigados do Bairro Conservas.' },
        { hoursAgo: 24, people: 275, families: 89, demo: { 'Idosos': 40, 'Adolescentes': 55, 'Crianças': 78, 'Bebês': 18, 'PCDs': 7, 'Pets': 18 }, source: 'Cruz Vermelha Brasileira', notes: 'Triagem de famílias e distribuição de colchões.' },
        { hoursAgo: 12, people: 380, families: 122, demo: { 'Idosos': 58, 'Adolescentes': 72, 'Crianças': 110, 'Bebês': 25, 'PCDs': 10, 'Pets': 24 }, source: 'Defesa Civil Municipal', notes: 'Recebimento de doações e marmitas.' },
        { hoursAgo: 2, people: 412, families: 135, demo: { 'Idosos': 64, 'Adolescentes': 80, 'Crianças': 122, 'Bebês': 28, 'PCDs': 11, 'Pets': 29 }, source: 'Coordenação Voluntária do Abrigo', notes: 'Atendimento contínuo.' }
      ]
    },
    {
      shelterId: 'shelter-lajeado-2',
      progression: [
        { hoursAgo: 36, people: 45, families: 14, demo: { 'Idosos': 8, 'Adolescentes': 10, 'Crianças': 14, 'PCDs': 1, 'Pets': 4 }, source: 'Assistência Social (CRAS/CREAS)', notes: 'Abertura do ginásio.' },
        { hoursAgo: 20, people: 110, families: 36, demo: { 'Idosos': 18, 'Adolescentes': 22, 'Crianças': 34, 'Bebês': 6, 'PCDs': 3, 'Pets': 8 }, source: 'Defesa Civil Municipal', notes: 'Pessoas do Bairro Praia abrigadas.' },
        { hoursAgo: 4, people: 185, families: 60, demo: { 'Idosos': 29, 'Adolescentes': 38, 'Crianças': 56, 'Bebês': 11, 'PCDs': 5, 'Pets': 14 }, source: 'Prefeitura Municipal', notes: 'Suprimentos entregues com sucesso.' }
      ]
    },
    {
      shelterId: 'shelter-estrela-1',
      progression: [
        { hoursAgo: 36, people: 110, families: 35, demo: { 'Idosos': 18, 'Adolescentes': 20, 'Crianças': 32, 'Bebês': 8, 'Pets': 10 }, source: 'Defesa Civil Municipal', notes: 'Atendimento e acolhimento Bairro Itaqui.' },
        { hoursAgo: 6, people: 240, families: 78, demo: { 'Idosos': 38, 'Adolescentes': 45, 'Crianças': 72, 'Bebês': 16, 'Pets': 22 }, source: 'Assistência Social (CRAS/CREAS)', notes: 'Acomodação de famílias desabrigadas.' }
      ]
    },
    {
      shelterId: 'shelter-estrela-2',
      progression: [
        { hoursAgo: 24, people: 65, families: 21, demo: { 'Idosos': 10, 'Adolescentes': 12, 'Crianças': 19, 'Pets': 5 }, source: 'Coordenação Voluntária do Abrigo', notes: 'Abertura para Bairro Cristo Rei.' }
      ]
    },
    {
      shelterId: 'shelter-arroio-1',
      progression: [
        { hoursAgo: 30, people: 145, families: 46, demo: { 'Idosos': 24, 'Adolescentes': 28, 'Crianças': 42, 'Bebês': 9, 'Pets': 12 }, source: 'Defesa Civil Municipal', notes: 'Abrigo municipal em funcionamento.' }
      ]
    },
    {
      shelterId: 'shelter-cruzeiro-1',
      progression: [
        { hoursAgo: 28, people: 125, families: 40, demo: { 'Idosos': 22, 'Adolescentes': 25, 'Crianças': 38, 'Bebês': 7, 'Pets': 14 }, source: 'Prefeitura Municipal', notes: 'Atendimento à população afetada pelo Rio Taquari.' }
      ]
    },
    {
      shelterId: 'shelter-taquari-1',
      progression: [
        { hoursAgo: 18, people: 88, families: 29, demo: { 'Idosos': 15, 'Adolescentes': 16, 'Crianças': 26, 'Bebês': 5, 'Pets': 8 }, source: 'Defesa Civil Municipal', notes: 'Acolhimento no Bairro Praia.' }
      ]
    },
    {
      shelterId: 'shelter-teutonia-1',
      progression: [
        { hoursAgo: 12, people: 32, families: 10, demo: { 'Idosos': 6, 'Adolescentes': 5, 'Crianças': 9, 'Pets': 3 }, source: 'Ação Social', notes: 'Local em prontidão e suporte preventivo.' }
      ]
    },
    {
      shelterId: 'shelter-mucum-1',
      progression: [
        { hoursAgo: 48, people: 120, families: 38, demo: { 'Idosos': 25, 'Adolescentes': 22, 'Crianças': 36, 'PCDs': 4, 'Pets': 9 }, source: 'Defesa Civil Municipal', notes: 'Atendimento inicial pós elevação do rio.' },
        { hoursAgo: 24, people: 230, families: 74, demo: { 'Idosos': 45, 'Adolescentes': 42, 'Crianças': 68, 'Bebês': 12, 'PCDs': 8, 'Pets': 16 }, source: 'Exército / Brigada Militar', notes: 'Resgate de áreas rurais isoladas.' },
        { hoursAgo: 1, people: 278, families: 91, demo: { 'Idosos': 52, 'Adolescentes': 50, 'Crianças': 82, 'Bebês': 15, 'PCDs': 9, 'Pets': 20 }, source: 'Coordenação Voluntária do Abrigo', notes: 'Necessita de água potável e itens de higiene.' }
      ]
    },
    {
      shelterId: 'shelter-rocasales-1',
      progression: [
        { hoursAgo: 40, people: 90, families: 30, demo: { 'Idosos': 15, 'Adolescentes': 18, 'Crianças': 28, 'Pets': 7 }, source: 'Defesa Civil Municipal', notes: 'Abertura do ginásio de esportes.' },
        { hoursAgo: 18, people: 195, families: 63, demo: { 'Idosos': 32, 'Adolescentes': 38, 'Crianças': 60, 'PCDs': 5, 'Pets': 15 }, source: 'Assistência Social (CRAS/CREAS)', notes: 'Acolhimento da população ribeirinha.' },
        { hoursAgo: 3, people: 260, families: 84, demo: { 'Idosos': 42, 'Adolescentes': 52, 'Crianças': 79, 'Bebês': 14, 'PCDs': 7, 'Pets': 19 }, source: 'Corpo de Bombeiros Militar', notes: 'Situação sob controle, recebendo mantimentos.' }
      ]
    },
    {
      shelterId: 'shelter-encantado-1',
      progression: [
        { hoursAgo: 30, people: 50, families: 16, demo: { 'Idosos': 9, 'Adolescentes': 10, 'Crianças': 15, 'Pets': 3 }, source: 'Comitê Comunitário de Emergência', notes: 'Início do acolhimento.' },
        { hoursAgo: 10, people: 115, families: 38, demo: { 'Idosos': 20, 'Adolescentes': 24, 'Crianças': 38, 'Bebês': 7, 'PCDs': 3, 'Pets': 8 }, source: 'Defesa Civil Municipal', notes: 'Famílias com crianças atendidas.' }
      ]
    },
    {
      shelterId: 'shelter-santatereza-1',
      progression: [
        { hoursAgo: 12, people: 25, families: 8, demo: { 'Idosos': 5, 'Adolescentes': 4, 'Crianças': 7, 'Pets': 2 }, source: 'Prefeitura Municipal', notes: 'Preparação do salão e primeiras recepções.' }
      ]
    }
  ];

  historyConfigs.forEach(cfg => {
    cfg.progression.forEach((step, idx) => {
      const { timestamp, dateStr, timeStr } = getTimestamp(step.hoursAgo);
      readings.push({
        id: `shelter-reading-${cfg.shelterId}-${idx}`,
        shelterId: cfg.shelterId,
        timestamp,
        dateStr,
        timeStr,
        peopleCount: step.people,
        familiesCount: step.families,
        demographics: step.demo,
        dataSource: step.source,
        notes: step.notes,
        createdAt: new Date(now.getTime() - step.hoursAgo * 3600000).toISOString(),
      });
    });
  });

  return readings;
}
