import React from 'react';
import { Check, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden min-h-[600px] animate-fade-in">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
          <button 
            onClick={onBack}
            className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} /> Voltar
          </button>

          <div className="max-w-md mx-auto w-full pt-8 md:pt-0">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-2 text-center">Criar Ofertas</h2>
            <p className="text-gray-500 text-center mb-10">Entre com suas credenciais para acessar o sistema</p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">E-mail</label>
                <input 
                  type="email" 
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Senha</label>
                <input 
                  type="password" 
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-gray-700 placeholder-gray-400"
                />
              </div>

              <button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-brand-500/20">
                Entrar
              </button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <a href="#" className="block text-sm text-brand-600 hover:underline font-medium">Esqueceu sua senha?</a>
              <a href="#" className="block text-sm text-brand-600 hover:underline font-medium">Não tem uma conta? Cadastre-se</a>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-brand-600 to-purple-700 p-8 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
              Sistema <span className="text-green-400">de Criação de Ofertas</span>
            </h2>
            <p className="text-brand-100 text-lg mb-8 leading-relaxed">
              Crie cartazes, posts para redes sociais e anúncios de áudio/vídeo em minutos, usando ferramentas de marketing avançadas.
            </p>

            <ul className="space-y-4">
              {[
                "Criação Rápida e Intuitiva",
                "Banco de Produtos Integrado",
                "Templates Profissionais",
                "Exportação para TV Digital",
                "Anúncios em Áudio/Vídeo"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="bg-white/20 p-1 rounded-full shrink-0">
                    <Check size={14} className="text-white" />
                  </div>
                  <span className="font-medium text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;