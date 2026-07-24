import { YouTubeVideo } from '../types';

export const DEFAULT_VIDEOS: YouTubeVideo[] = [
  {
    id: 'video-1-afgjqyfbojw',
    title: 'Monitoramento & Cobertura Guaíba / Rio Taquari',
    youtubeUrl: 'https://www.youtube.com/watch?v=AfgJqYFBOjw',
    youtubeId: 'AfgJqYFBOjw',
    category: 'Guaíba',
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
    category: 'Ao Vivo / Câmeras',
    description: 'Câmera ao vivo acompanhando o avanço da água e régua de medição oficial do Guaíba.',
    author: 'Câmeras RS',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    isFeatured: false
  },
  {
    id: 'video-3-defesa-civil',
    title: 'Orientações de Segurança e Evacuação em Áreas de Risco',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    youtubeId: 'ScMzIvxBSi4',
    category: 'Orientações & Abrigos',
    description: 'Informaçoes cruciais da Defesa Civil sobre rotas de fuga, cadastramento em abrigos comunitários e cuidados com a água.',
    author: 'Defesa Civil RS',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    isFeatured: false
  }
];
