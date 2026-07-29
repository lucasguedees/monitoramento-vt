import { YouTubeVideo } from '../types';

export const DEFAULT_VIDEOS: YouTubeVideo[] = [
  {
    id: 'video-1-afgjqyfbojw',
    title: 'Monitoramento & Cobertura Guaíba / Rio Taquari',
    youtubeUrl: 'https://www.youtube.com/watch?v=AfgJqYFBOjw',
    youtubeId: 'AfgJqYFBOjw',
    category: 'Lajeado / Estrela',
    description: 'Acompanhamento em tempo real, réguas de medição e boletim informativo da situação dos rios no Rio Grande do Sul.',
    author: 'Voluntários do RS',
    createdAt: new Date().toISOString(),
    isFeatured: true
  },
  {
    id: 'video-2-taquari-live',
    title: 'Nível Guaíba - Transmissão e Câmera ao Vivo',
    youtubeUrl: 'https://www.youtube.com/watch?v=uT9J8D5iGv8',
    youtubeId: 'uT9J8D5iGv8',
    category: 'Taquari',
    description: 'Câmera ao vivo acompanhando o avanço da água e régua de medição oficial do Guaíba e bacia do Taquari.',
    author: 'Câmeras RS',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    isFeatured: true
  },
  {
    id: 'video-3-defesa-civil',
    title: 'Orientações de Segurança e Evacuação em Áreas de Risco',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    youtubeId: 'ScMzIvxBSi4',
    category: 'Lajeado / Estrela',
    description: 'Informações cruciais da Defesa Civil sobre rotas de fuga, cadastramento em abrigos comunitários e cuidados com a água.',
    author: 'Defesa Civil RS',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    isFeatured: false
  },
  {
    id: 'video-4-lajeado-estrela',
    title: 'Situação das Pontes entre Lajeado e Estrela no Rio Taquari',
    youtubeUrl: 'https://www.youtube.com/watch?v=5W_E32zL3aM',
    youtubeId: '5W_E32zL3aM',
    category: 'Lajeado / Estrela',
    description: 'Inspeção visual e monitoramento do fluxo do Rio Taquari na travessia Lajeado/Estrela (BR-386).',
    author: 'Defesa Civil Lajeado',
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    isFeatured: true
  },
  {
    id: 'video-5-mucum-roca-sales',
    title: 'Boletim Integrado: Calha do Rio Taquari em Muçum e Roca Sales',
    youtubeUrl: 'https://www.youtube.com/watch?v=3g8uE1pW9aI',
    youtubeId: '3g8uE1pW9aI',
    category: 'Muçum',
    description: 'Leitura das cotas de inundação e monitoramento da calha superior do Rio Taquari.',
    author: 'Monitoramento Vale do Taquari',
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    isFeatured: false
  },
  {
    id: 'video-6-encantado-arroio',
    title: 'Medição do Nível em Encantado e Arroio do Meio',
    youtubeUrl: 'https://www.youtube.com/watch?v=9X0Lw_yYxMo',
    youtubeId: '9X0Lw_yYxMo',
    category: 'Encantado',
    description: 'Informações sobre subida e estabilização do nível do rio nos municípios do curso médio do Taquari.',
    author: 'Comitê Taquari-Antas',
    createdAt: new Date(Date.now() - 18000000).toISOString(),
    isFeatured: false
  },
  {
    id: 'video-7-bom-retiro-taquari',
    title: 'Monitoramento Jusante: Bom Retiro do Sul e Taquari',
    youtubeUrl: 'https://www.youtube.com/watch?v=L_4e_R7v2S4',
    youtubeId: 'L_4e_R7v2S4',
    category: 'Bom Retiro do Sul',
    description: 'Comportamento da barragem de Bom Retiro do Sul e níveis de cota na cidade de Taquari.',
    author: 'Rede Hidrometeorológica SGB',
    createdAt: new Date(Date.now() - 21600000).toISOString(),
    isFeatured: false
  },
  {
    id: 'video-8-previsao-tempo-rs',
    title: 'Boletim Meteorológico: Previsão de Chuvas para o Vale do Taquari',
    youtubeUrl: 'https://www.youtube.com/watch?v=Z8m1QvK3Kx0',
    youtubeId: 'Z8m1QvK3Kx0',
    category: 'Lajeado / Estrela',
    description: 'Análise meteorológica detalhada sobre acumulados de chuva e frentes frias no Estado.',
    author: 'MetSul Meteorologia',
    createdAt: new Date(Date.now() - 25200000).toISOString(),
    isFeatured: true
  },
  {
    id: 'video-9-camera-lajeado-live',
    title: 'Transmissão Ao Vivo - Ponte de Ferro Lajeado / Arroio do Meio',
    youtubeUrl: 'https://www.youtube.com/watch?v=7X8yM3N0z_Y',
    youtubeId: '7X8yM3N0z_Y',
    category: 'Arroio do Meio',
    description: 'Câmera de segurança e monitoramento contínuo da elevação da água na travessia regional.',
    author: 'Câmeras Vale do Taquari',
    createdAt: new Date(Date.now() - 28800000).toISOString(),
    isFeatured: false
  },
  {
    id: 'video-10-abrigos-doacoes',
    title: 'Guia de Voluntariado e Doações nos Abrigos Temporários',
    youtubeUrl: 'https://www.youtube.com/watch?v=W3aL4_sO9p0',
    youtubeId: 'W3aL4_sO9p0',
    category: 'Lajeado / Estrela',
    description: 'Como doar alimentos, agasalhos e insumos médicos com segurança para os afetados pelas cheias.',
    author: 'Rede de Apoio Humanitário RS',
    createdAt: new Date(Date.now() - 32400000).toISOString(),
    isFeatured: false
  },
  {
    id: 'video-11-guaiba-cais-maua',
    title: 'Nível no Cais Mauá e Ilhas de Porto Alegre',
    youtubeUrl: 'https://www.youtube.com/watch?v=R6nQ4L7w5tY',
    youtubeId: 'R6nQ4L7w5tY',
    category: 'Taquari',
    description: 'Atualização do nível do Lago Guaíba no Cais Mauá e nas comportas do sistema de proteção.',
    author: 'DMLU & Defesa Civil POA',
    createdAt: new Date(Date.now() - 36000000).toISOString(),
    isFeatured: false
  },
  {
    id: 'video-12-sace-sgb-explicativo',
    title: 'Como Interpretar as Cotas do Sistema SACE SGB',
    youtubeUrl: 'https://www.youtube.com/watch?v=P2k_E8L0mZg',
    youtubeId: 'P2k_E8L0mZg',
    category: 'Roca Sales',
    description: 'Tutorial sobre cotas de atenção, alerta e inundação emitidas pelo Serviço Geológico do Brasil.',
    author: 'SGB / CPRM',
    createdAt: new Date(Date.now() - 39600000).toISOString(),
    isFeatured: false
  },
  {
    id: 'video-13-radar-meteorologico',
    title: 'Imagens de Radar e Alertas de Tempestade Severa',
    youtubeUrl: 'https://www.youtube.com/watch?v=K1m_8xN3aL0',
    youtubeId: 'K1m_8xN3aL0',
    category: 'Muçum',
    description: 'Acompanhamento de núcleos de tempestade na Serra Gaúcha e Bacia do Taquari-Antas.',
    author: 'Climatempo RS',
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    isFeatured: false
  },
  {
    id: 'video-14-camera-ao-vivo-poa',
    title: 'Câmera Ao Vivo - Orla do Guaíba e Usina do Gasômetro',
    youtubeUrl: 'https://www.youtube.com/watch?v=D9k_7yM8z_X',
    youtubeId: 'D9k_7yM8z_X',
    category: 'Taquari',
    description: 'Transmissão 24h acompanhando a variação da cota do Guaíba na Orla Central.',
    author: 'Câmeras Porto Alegre',
    createdAt: new Date(Date.now() - 46800000).toISOString(),
    isFeatured: false
  },
  {
    id: 'video-15-resgate-aereo-defesa',
    title: 'Protocolo de Resgates e Socorro do Corpo de Bombeiros',
    youtubeUrl: 'https://www.youtube.com/watch?v=V4m_9xN2bK0',
    youtubeId: 'V4m_9xN2bK0',
    category: 'Encantado',
    description: 'Instruções de sinalização para helicópteros e embarcações em áreas isoladas.',
    author: 'Corpo de Bombeiros Militar RS',
    createdAt: new Date(Date.now() - 50400000).toISOString(),
    isFeatured: false
  },
  {
    id: 'video-16-boletim-hidrologico-1',
    title: 'Boletim Hidrológico Integrado - Bacia do Taquari-Antas',
    youtubeUrl: 'https://www.youtube.com/watch?v=H7m_9xL4cN0',
    youtubeId: 'H7m_9xL4cN0',
    category: 'Lajeado / Estrela',
    description: 'Análise do escoamento da água das nascentes na Serra até o Delta do Jacuí.',
    author: 'Engenharia de Recursos Hídricos',
    createdAt: new Date(Date.now() - 54000000).toISOString(),
    isFeatured: false
  },
  {
    id: 'video-17-abrigos-lajeado-estrela',
    title: 'Acolhimento nos Ginásios de Lajeado/Estrela e Região',
    youtubeUrl: 'https://www.youtube.com/watch?v=M9p_8xN2cK0',
    youtubeId: 'M9p_8xN2cK0',
    category: 'Lajeado / Estrela',
    description: 'Atualização das vagas disponíveis e estrutura médica nos alojamentos provisórios.',
    author: 'Assistência Social Vale do Taquari',
    createdAt: new Date(Date.now() - 57600000).toISOString(),
    isFeatured: false
  },
  {
    id: 'video-18-barragem-bom-retiro',
    title: 'Inspeção Técnica da Barragem de Bom Retiro do Sul',
    youtubeUrl: 'https://www.youtube.com/watch?v=X8p_9yN1cL0',
    youtubeId: 'X8p_9yN1cL0',
    category: 'Bom Retiro do Sul',
    description: 'Verificação operacional das eclusas e efluentes no baixo Taquari.',
    author: 'Engenharia Hidráulica RS',
    createdAt: new Date(Date.now() - 61200000).toISOString(),
    isFeatured: false
  },
  {
    id: 'video-19-previsao-fim-de-semana',
    title: 'Tendência do Tempo e Acumulados de Precipitação',
    youtubeUrl: 'https://www.youtube.com/watch?v=J9x_8yN3bM0',
    youtubeId: 'J9x_8yN3bM0',
    category: 'Lajeado / Estrela',
    description: 'Previsão meteorológica para os próximos dias com foco nos vales e região metropolitana.',
    author: 'INMET / Defesa Civil',
    createdAt: new Date(Date.now() - 64800000).toISOString(),
    isFeatured: false
  },
  {
    id: 'video-20-camera-ponte-encantado',
    title: 'Câmera ao Vivo - Ponte sobre o Rio Taquari em Encantado',
    youtubeUrl: 'https://www.youtube.com/watch?v=Y8x_9yN1aK0',
    youtubeId: 'Y8x_9yN1aK0',
    category: 'Encantado',
    description: 'Visualização em tempo real do volume de água e movimentação de barcos de apoio.',
    author: 'Monitoramento Encantado',
    createdAt: new Date(Date.now() - 68400000).toISOString(),
    isFeatured: false
  },
  {
    id: 'video-21-boletim-geral-sintese',
    title: 'Resumo Geral das Cotas e Alertas de Cheia no RS',
    youtubeUrl: 'https://www.youtube.com/watch?v=Z9x_8yN1bM0',
    youtubeId: 'Z9x_8yN1bM0',
    category: 'Lajeado / Estrela',
    description: 'Síntese diária compilando níveis das principais bacias hidrográficas monitoradas.',
    author: 'Defesa Civil Estadual RS',
    createdAt: new Date(Date.now() - 72000000).toISOString(),
    isFeatured: true
  }
];

export function mergeWithDefaultVideos(incoming: YouTubeVideo[]): YouTubeVideo[] {
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return DEFAULT_VIDEOS;
  }

  const existingYoutubeIds = new Set(incoming.map(v => v.youtubeId || v.id));
  const merged = [...incoming];

  DEFAULT_VIDEOS.forEach(defVideo => {
    if (!existingYoutubeIds.has(defVideo.youtubeId) && !existingYoutubeIds.has(defVideo.id)) {
      merged.push(defVideo);
      existingYoutubeIds.add(defVideo.youtubeId);
    }
  });

  return merged;
}
