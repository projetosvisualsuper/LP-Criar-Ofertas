import React from 'react';
import { Check, ExternalLink } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Pricing: React.FC = () => {
  const { content } = useContent();
  const { pricing } = content;

  // Helper function to get theme-specific classes
  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case 'blue': return {
        border: 'border-brand-500',
        text: 'text-brand-600',
        icon: 'text-brand-500',
        shadow: 'shadow-brand-100'
      };
      case 'orange': return {
        border: 'border-accent-500',
        text: 'text-accent-600',
        icon: 'text-accent-500',
        shadow: 'shadow-accent-100'
      };
      default: return { // gray
        border: 'border-gray-200',
        text: 'text-gray-900',
        icon: 'text-gray-400',
        shadow: 'shadow-gray-100'
      };
    }
  };

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-brand-600 mb-2">
            <span className="p-1 rounded bg-brand-100"><ExternalLink size={14} /></span>
            <span className="font-bold text-sm uppercase tracking-wide">Preços Imbatíveis</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Escolha o Plano Ideal
          </h2>
          <p className="text-lg text-gray-600">
            Comece grátis e evolua suas ferramentas de marketing conforme a necessidade de seu negócio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricing.map((tier, idx) => {
            const theme = getThemeClasses(tier.theme);

            return (
              <div
                key={idx}
                className={`relative rounded-xl p-6 bg-white transition-all duration-200 hover:shadow-xl flex flex-col border-2 ${theme.border} ${theme.shadow}`}
              >
                <div className="mb-4">
                  <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
                    <span className="text-gray-500 ml-1 font-medium">{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm">
                      <Check size={18} className={`mt-0.5 shrink-0 ${theme.icon}`} />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://criarofertas.com.br"
                  className="w-full py-3 px-4 rounded-lg font-bold text-center transition-all flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-200"
                >
                  {tier.cta}
                  {tier.theme !== 'gray' && <ExternalLink size={16} />}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;