import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Features: React.FC = () => {
  const { content } = useContent();
  const { features, howItWorks } = content;

  // Fallback if howItWorks is undefined (during transition)
  const steps = howItWorks?.steps || [
    { num: '01', title: 'Escolha um Modelo', desc: 'Navegue por nossa biblioteca de temas segmentados por nicho.' },
    { num: '02', title: 'Adicione as Ofertas', desc: 'Digite o nome do produto e preço. O sistema formata automaticamente.' },
    { num: '03', title: 'Baixe e Divulgue', desc: 'Faça o download instantâneo e compartilhe no WhatsApp ou imprima.' },
  ];

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="text-brand-600" size={32} /> : <LucideIcons.HelpCircle className="text-brand-600" size={32} />;
  };

  return (
    <>
      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-3">Diferenciais</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Tudo o que você precisa para vender mais
            </h3>
            <p className="text-lg text-gray-600">
              O Criar Ofertas foi desenvolvido pensando na rotina corrida do varejo. Simples, rápido e eficiente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="mb-6 bg-brand-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {getIcon(feature.iconName)}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{howItWorks?.title || "Como Funciona?"}</h2>
            <p className="text-brand-100 text-lg">{howItWorks?.subtitle || "Três passos simples para o seu encarte perfeito."}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-brand-700 z-0 transform -translate-y-1/2"></div>

            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto bg-brand-600 rounded-full flex items-center justify-center text-3xl font-bold font-display shadow-xl border-4 border-brand-800 mb-6">
                  {step.num}
                </div>
                <h4 className="text-2xl font-bold mb-3">{step.title}</h4>
                <p className="text-brand-100 px-4">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="https://criarofertas.com.br"
              className="inline-block bg-white text-brand-900 font-bold py-4 px-10 rounded-full text-lg hover:bg-brand-50 transition-colors shadow-lg"
            >
              Criar Meu Primeiro Encarte
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;