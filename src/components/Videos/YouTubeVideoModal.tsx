import React, { useState, useEffect } from 'react';
import { X, Youtube, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { YouTubeVideo } from '../../types';
import { extractYouTubeId, getYouTubeThumbnailUrl, getYouTubeEmbedUrl } from '../../utils/youtubeUtils';

interface YouTubeVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (videoData: Omit<YouTubeVideo, 'id' | 'createdAt'> & { id?: string }) => void;
  editingVideo?: YouTubeVideo | null;
}

const CATEGORIES: YouTubeVideo['category'][] = [
  'Ao Vivo / Câmeras',
  'Vale do Taquari',
  'Guaíba',
  'Notícias & Alertas',
  'Orientações & Abrigos'
];

export const YouTubeVideoModal: React.FC<YouTubeVideoModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingVideo
}) => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<YouTubeVideo['category']>('Guaíba');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingVideo) {
      setYoutubeUrl(editingVideo.youtubeUrl);
      setTitle(editingVideo.title);
      setCategory(editingVideo.category);
      setDescription(editingVideo.description || '');
      setAuthor(editingVideo.author || '');
      setIsFeatured(editingVideo.isFeatured || false);
    } else {
      setYoutubeUrl('');
      setTitle('');
      setCategory('Guaíba');
      setDescription('');
      setAuthor('');
      setIsFeatured(false);
    }
    setError(null);
  }, [editingVideo, isOpen]);

  if (!isOpen) return null;

  const extractedId = extractYouTubeId(youtubeUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Por favor, informe um título para o vídeo.');
      return;
    }

    if (!extractedId) {
      setError('Cole um link válido do YouTube (ex: https://www.youtube.com/watch?v=AfgJqYFBOjw).');
      return;
    }

    onSave({
      id: editingVideo?.id,
      title: title.trim(),
      youtubeUrl: youtubeUrl.trim(),
      youtubeId: extractedId,
      category,
      description: description.trim(),
      author: author.trim(),
      isFeatured
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-500/10 text-red-600 dark:text-red-500 rounded-xl border border-red-500/20">
              <Youtube className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingVideo ? 'Editar Vídeo do YouTube' : 'Compartilhar Vídeo do YouTube'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Adicione vídeos informativos, boletins ou transmissões ao vivo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
          
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* YouTube URL input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Link ou URL do Vídeo do YouTube *
            </label>
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=AfgJqYFBOjw"
              value={youtubeUrl}
              onChange={(e) => {
                setYoutubeUrl(e.target.value);
                setError(null);
              }}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
              required
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Aceita links do tipo watch?v=..., youtu.be/..., shorts/ ou live/
            </p>
          </div>

          {/* Thumbnail preview if valid ID detected */}
          {extractedId ? (
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-center gap-3">
              <img
                src={getYouTubeThumbnailUrl(extractedId)}
                alt="Thumbnail"
                className="w-24 h-16 object-cover rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
              />
              <div className="text-xs">
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ID detectado: {extractedId}
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  O vídeo será incorporado diretamente com o player oficial do YouTube.
                </p>
              </div>
            </div>
          ) : youtubeUrl.length > 5 ? (
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Aguardando link válido do YouTube...</span>
            </div>
          ) : null}

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Título do Vídeo *
            </label>
            <input
              type="text"
              placeholder="Ex: Cobertura do Nível do Rio Guaíba e Taquari"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
              required
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Categoria *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as YouTubeVideo['category'])}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Autor / Fonte do Canal
              </label>
              <input
                type="text"
                placeholder="Ex: Defesa Civil RS / Canal Voluntário"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Descrição / Resumo Informativo
            </label>
            <textarea
              rows={3}
              placeholder="Descreva brevemente o conteúdo do vídeo, réguas citadas ou alertas transmitidos..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
          </div>

          {/* Is Featured Checkbox */}
          <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-red-600 focus:ring-red-500 accent-red-600 cursor-pointer"
            />
            <label htmlFor="isFeatured" className="text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Destacar este vídeo no topo da galeria
            </label>
          </div>

          {/* Submit buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Youtube className="w-4 h-4" />
              {editingVideo ? 'Salvar Alterações' : 'Publicar Vídeo'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
