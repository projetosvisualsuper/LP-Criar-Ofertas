import React from 'react';
import { ArrowRight, CheckCircle, LayoutTemplate, User, ShoppingBag, Building2, Tv, Image as ImageIcon, LogOut, Search, Settings, Grid, Palette, Wand2, Share } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Hero: React.FC = () => {
  const { content } = useContent();
  const { hero } = content;

  return (
    <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-brand-50" id="home">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-200/50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-accent-200/50 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/80 border border-brand-100 rounded-full px-4 py-1.5 mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-sm font-medium text-gray-600">{hero.badgeText}</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 leading-tight mb-6">
            {hero.title} <span className="gradient-text">{hero.titleHighlight}</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="https://criarofertas.com.br"
              className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white text-lg px-8 py-4 rounded-full font-bold transition-all shadow-xl hover:shadow-brand-500/40 flex items-center justify-center gap-2"
            >
              {hero.ctaPrimary} <ArrowRight size={20} />
            </a>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-lg px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center"
            >
              {hero.ctaSecondary}
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-500 font-medium">
            {hero.benefits?.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle size={16} className="text-brand-600" /> {benefit}
              </div>
            ))}
          </div>
        </div>


        {/* Dynamic Image or Default CSS Mockup */}
        <div className="mt-16 relative mx-auto max-w-6xl">
          {hero.heroImage ? (
            <div className="rounded-xl bg-gray-900 p-1.5 shadow-2xl ring-1 ring-gray-900/10 transform md:rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                src={hero.heroImage}
                alt="Preview da Plataforma"
                className="rounded-lg w-full h-auto border border-gray-800"
              />
            </div>
          ) : (
            <div className="rounded-xl bg-gray-900 p-1.5 shadow-2xl ring-1 ring-gray-900/10 transform md:rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Window Container */}
              <div className="rounded-lg bg-[#0F172A] w-full aspect-[16/9] flex overflow-hidden border border-gray-800">

                {/* Sidebar (Left) */}
                <div className="hidden md:flex w-64 flex-col border-r border-gray-800 bg-[#0F172A] text-gray-400">
                  <div className="p-4 border-b border-gray-800 flex items-center gap-2">
                    <div className="bg-brand-600 text-white p-1 rounded">
                      <LayoutTemplate size={18} />
                    </div>
                    <span className="font-bold text-white text-lg">Criar Ofertas</span>
                  </div>

                  <div className="p-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-4 px-2">Menu Principal</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 px-3 py-2 text-sm hover:text-white cursor-pointer">
                        <User size={18} /> Meu Perfil
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-sm text-white bg-indigo-600 rounded-lg shadow-lg shadow-indigo-900/50 cursor-pointer">
                        <LayoutTemplate size={18} /> Criar Ofertas
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-sm hover:text-white cursor-pointer">
                        <ShoppingBag size={18} /> Banco de Produtos
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-sm hover:text-white cursor-pointer">
                        <Building2 size={18} /> Dados da Empresa
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-sm hover:text-white cursor-pointer">
                        <Tv size={18} /> TV Digital (Slides)
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-sm hover:text-white cursor-pointer">
                        <ImageIcon size={18} /> Artes Redes Sociais
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto p-4 border-t border-gray-800">
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3 mb-3">
                      <p className="text-xs text-yellow-500 font-bold mb-1">⚡ Seu Plano: Premium</p>
                      <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-yellow-500 w-3/4 h-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-red-400 text-sm cursor-pointer hover:text-red-300">
                      <LogOut size={16} /> Sair (Logout)
                    </div>
                  </div>
                </div>

                {/* Main Content Area (Right) */}
                <div className="flex-1 bg-gray-50 flex flex-col min-w-0">

                  {/* Top Header */}
                  <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                    <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
                      <span className="bg-indigo-100 p-1 rounded text-indigo-600">CO</span> Criar Ofertas
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full">
                        <span className="text-yellow-600 font-bold">$</span> Créditos IA: <span className="text-gray-900 font-bold">100</span>
                      </div>
                    </div>
                  </div>

                  {/* Toolbar */}
                  <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-6 text-sm font-medium text-gray-500">
                    <div className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer"><Grid size={16} /> Produtos</div>
                    <div className="flex items-center gap-2 text-indigo-600 border-b-2 border-indigo-600 pb-3 -mb-3"><LayoutTemplate size={16} /> Templates</div>
                    <div className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer"><Palette size={16} /> Design</div>
                    <div className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer"><Wand2 size={16} /> IA</div>
                  </div>

                  {/* Canvas Area */}
                  <div className="flex-1 overflow-hidden p-6 flex gap-6">
                    {/* Left Panel (Template Gallery) */}
                    <div className="w-64 bg-white rounded-lg border border-gray-200 p-4 hidden lg:flex flex-col gap-4 overflow-y-auto">
                      <h3 className="text-sm font-bold text-gray-700">Galeria de Templates</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="aspect-square bg-[#2d3319] rounded-md flex items-center justify-center text-[10px] text-white font-bold">Black Friday</div>
                        <div className="aspect-square bg-[#4a5d23] rounded-md flex items-center justify-center text-[10px] text-white font-bold">Feira Fresca</div>
                        <div className="aspect-square bg-[#a83232] rounded-md flex items-center justify-center text-[10px] text-white font-bold">Açougue</div>
                        <div className="aspect-square bg-[#9c6b3f] rounded-md flex items-center justify-center text-[10px] text-white font-bold">Padaria</div>
                        <div className="aspect-square bg-[#d94680] rounded-md flex items-center justify-center text-[10px] text-white font-bold">Pink Week</div>
                        <div className="aspect-square bg-[#1a56db] rounded-md flex items-center justify-center text-[10px] text-white font-bold">Ofertas Tech</div>
                      </div>
                    </div>

                    {/* Main Canvas - The Flyer */}
                    <div className="flex-1 bg-gray-200 rounded-lg overflow-hidden flex justify-center items-start pt-4 shadow-inner relative">
                      {/* Paper / Flyer */}
                      <div className="bg-white w-[400px] h-[560px] shadow-xl relative flex flex-col">
                        {/* Header Image Simulation */}
                        <div className="h-32 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                          <h1 className="text-4xl font-black text-white drop-shadow-lg text-center leading-none tracking-tighter transform -rotate-2" style={{ textShadow: "3px 3px 0px #0246a8" }}>
                            OFERTAS<br /><span className="text-2xl text-yellow-300">DA SEMANA</span>
                          </h1>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-3 gap-2 p-3 flex-1 bg-gradient-to-b from-white to-gray-50">
                          {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="border border-orange-200 rounded-lg p-1 flex flex-col items-center bg-white shadow-sm relative">
                              <span className="absolute top-0 right-0 bg-red-600 text-white text-[8px] font-bold px-1 rounded-bl-lg">-30%</span>
                              <div className="w-12 h-12 bg-gray-100 rounded mb-1 flex items-center justify-center">
                                <img src={`https://placehold.co/100x100/f3f4f6/a3a3a3?text=Prod+${i}`} className="mix-blend-multiply" alt="prod" />
                              </div>
                              <p className="text-[9px] text-center font-bold text-gray-800 leading-tight mb-1">Arroz Branco 5kg Tipo 1</p>
                              <div className="mt-auto w-full text-center">
                                <p className="text-[7px] text-gray-400 line-through">DE R$ 21,99</p>
                                <p className="text-[8px] text-gray-600">POR APENAS</p>
                                <p className="text-lg font-black text-red-600 leading-none">R$ 14<span className="text-xs align-top">,99</span></p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="bg-red-600 text-white text-[10px] font-bold text-center py-1">
                          OFERTAS VÁLIDAS ENQUANTO DURAREM OS ESTOQUES
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;