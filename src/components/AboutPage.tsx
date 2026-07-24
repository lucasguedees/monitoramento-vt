import React from 'react';
import {
  HeartHandshake,
  Clock,
  AlertTriangle,
  ShieldCheck,
  CloudCheck,
  Info,
  Activity,
  Home,
  Database,
  Users,
  Lock,
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';

interface AboutPageProps {
  onNavigateTab: (tab: 'river' | 'shelters') => void;
  onOpenAdminAuth: () => void;
  isAdminAuthorized: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateTab,
  onOpenAdminAuth,
  isAdminAuthorized,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
            <HeartHandshake className="w-3.5 h-3.5 text-cyan-400" />
            Iniciativa Comunitária & Transparência
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Sobre o Sistema de Monitoramento de Enchentes & Abrigos
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Esta plataforma foi desenvolvida para apoiar a população, voluntários e agentes de resposta do Vale do Taquari no acompanhamento contínuo dos níveis do rio e da ocupação de abrigos temporários.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('river')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Activity className="w-4 h-4" />
              Ver Nível do Rio
            </button>
            <button
              onClick={() => onNavigateTab('shelters')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Ver Abrigos Ativos
            </button>
          </div>
        </div>
      </div>

      {/* Main Notice Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Voluntary Nature */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Lançamento Voluntário & Comunitário
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Os dados e medições disponíveis nesta plataforma são fornecidos e cadastrados voluntariamente por agentes locais, coordenadores de abrigos, equipes de assistência social e colaboradores comunitários nas linhas de frente.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            Trabalho colaborativo e solidário
          </div>
        </div>

        {/* Card 2: Dynamic Updates */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Alterações & Retificações Frequentes
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Durante situações de emergência, os números de acolhidos e as réguas dos rios mudam rapidamente. Os registros podem passar por reavaliações, correções de contagem e ajustes históricos a qualquer momento para garantir a melhor precisão possível.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-medium text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            Dados sujeitos a atualização contínua
          </div>
        </div>

        {/* Card 3: Potential Delay / Lag */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/60 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Possibilidade de Delay / Latência
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Devido a condições adversas em campo (como instabilidade de sinal de internet, falta de energia ou priorização do atendimento presencial), pode haver intervalo de tempo (delay) entre o evento físico e a inserção no sistema.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-medium text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Considere o horário informado em cada medição
          </div>
        </div>

      </div>

      {/* Official Disclaimer Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start gap-4">
        <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl flex-shrink-0 mt-0.5">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-amber-300">
            Aviso de Utilidade Pública & Fontes Oficiais
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Este painel é uma ferramenta de apoio visual e consulta comunitária. Para decisões críticas de evacuação, resgate ou segurança pessoal, <strong>siga sempre as orientações oficiais da Defesa Civil Municipal, Corpo de Bombeiros e Brigada Militar.</strong>
          </p>
        </div>
      </div>

      {/* Platform Features Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-500" />
            Como Funciona a Infraestrutura do Sistema
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Mecanismos técnicos e operacionais que garantem integridade e disponibilidade.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <CloudCheck className="w-4 h-4 text-emerald-500" />
              Sincronização em Tempo Real na Nuvem
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Todos os cadastros e atualizações de dados são armazenados na nuvem (Google Firestore) e sincronizados em tempo real entre todos os usuários e dispositivos conectados.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <Lock className="w-4 h-4 text-indigo-500" />
              Segurança do Modo Operador
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              O acesso público permite visualização e consulta ilimitada. A alteração e criação de dados requer autenticação via senha de operador, protegendo contra alterações não autorizadas.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <Activity className="w-4 h-4 text-cyan-500" />
              Cálculo de Velocidade de Elevação do Rio
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              O sistema calcula automaticamente a variação em metros por hora (m/h) com base na última medição para identificar subidas bruscas ou estabilização da calha do rio.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <Users className="w-4 h-4 text-purple-500" />
              Categorização Demográfica em Abrigos
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Registro detalhado do perfil dos abrigados (crianças, idosos, PCDs, pets) para auxiliar equipes de suprimentos e logística no direcionamento de doações específicas.
            </p>
          </div>

        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            Perguntas Frequentes & Orientações
          </h2>
        </div>

        <div className="space-y-4">
          
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 mb-1">
              Quem pode realizar lançamentos de medições ou atualização de abrigos?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Apenas voluntários e operadores devidamente credenciados com a senha de operador. Se você é coordenador de abrigo ou voluntário atuante no Vale do Taquari, solicite a senha de acesso ao administrador responsável do seu município.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 mb-1">
              Notei uma divergência ou erro em uma medição. O que fazer?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Caso identifique uma incoerência na quantidade de abrigados ou no nível do rio, comunique o operador local. O operador autorizado pode acessar a tabela de histórico e realizar a correção ou exclusão do registro impreciso.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 mb-1">
              Como exportar os dados para relatórios oficiais ou análise?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              No topo da página principal, clique no ícone de download para exportar o histórico completo de dados em formato CSV, compatível com Excel e outras ferramentas estatísticas.
            </p>
          </div>

        </div>

        {/* Operator Login Prompt Callout */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-950 text-indigo-400 rounded-lg border border-indigo-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">É um operador autorizado ou coordenador de abrigo?</p>
              <p className="text-[11px] text-slate-400">
                {isAdminAuthorized ? 'Sua sessão de operador está ativa.' : 'Faça login com a senha do operador para habilitar cadastros.'}
              </p>
            </div>
          </div>

          {!isAdminAuthorized && (
            <button
              onClick={onOpenAdminAuth}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              Entrar no Modo Operador
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
