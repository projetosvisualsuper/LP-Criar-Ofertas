import React, { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import { generateOfferCopy } from '../services/aiService';
import { useContent } from '../context/ContentContext';

const AiGenerator: React.FC = () => {
  const { content } = useContent();
  const { aiGenerator } = content;

  const [product, setProduct] = useState('');
  const [generatedCopy, setGeneratedCopy] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setLoading(true);
    setGeneratedCopy('');

    // Pass custom API Key if configured in admin
    const text = await generateOfferCopy(product, aiGenerator.openaiApiKey);

    setGeneratedCopy(text);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-demo" className="py-24 bg-gray-900 text-white overflow-hidden relative">
      {/* Decorative bg elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px]"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-brand-600/20 rounded-full blur-[80px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} /> Nova Funcionalidade
            </div>
            <h2 className="text-4xl font-display font-bold mb-6">
              {aiGenerator.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {aiGenerator.subtitle}
              </span>
            </h2>


            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {aiGenerator.description}
            </p>

            <ul className="space-y-4 text-gray-300">
              {aiGenerator.features?.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Tool */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Sparkles className="text-yellow-400" />
              Teste o Gerador de Chamadas
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Produto da Oferta</label>
                <input
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder={aiGenerator.inputPlaceholder}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !product}
                className={`w-full py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2
                  ${loading || !product
                    ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-purple-500/25'
                  }`}
              >
                {loading ? 'Gerando Ideias...' : aiGenerator.buttonText}
                {!loading && <Sparkles size={18} />}
              </button>
            </form>

            {/* Output Area */}
            {generatedCopy && (
              <div className="mt-6 pt-6 border-t border-gray-700 animate-fade-in">
                <p className="text-sm text-gray-400 mb-2">{aiGenerator.generatedTitle}</p>
                <div className="bg-gray-800 rounded-lg p-4 relative group border border-gray-700">
                  <p className="text-lg font-medium pr-8">{generatedCopy}</p>
                  <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    title="Copiar"
                  >
                    {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AiGenerator;