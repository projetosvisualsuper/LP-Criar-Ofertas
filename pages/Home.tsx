import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import AiGenerator from '../components/AiGenerator';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import { ArrowUp } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Home: React.FC = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const { content } = useContent();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="min-h-screen bg-white font-sans antialiased selection:bg-brand-200 selection:text-brand-900 relative">
            <Header />
            <main>
                <Hero />
                <Features />
                <AiGenerator />
                <Pricing />

                {/* Testimonials Section */}
                <section className="py-24 bg-white border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-16">
                            Quem usa, recomenda
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {content.testimonials.map((t, i) => (
                                <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    <div className="flex gap-1 text-yellow-400 mb-4">
                                        {"★★★★★".split("").map((star, idx) => <span key={idx}>{star}</span>)}
                                    </div>
                                    <p className="text-gray-600 mb-6 italic">"{t.text}"</p>
                                    <div>
                                        <p className="font-bold text-gray-900">{t.name}</p>
                                        <p className="text-sm text-gray-500">{t.role}, {t.company}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 bg-brand-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-12">Perguntas Frequentes</h2>
                        <div className="space-y-6">
                            {content.faq.map((faq, i) => (
                                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                                    <h4 className="font-bold text-lg text-gray-900 mb-2">{faq.question}</h4>
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-20 bg-brand-600">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            {content.ctaFinal.title}
                        </h2>
                        <p className="text-brand-100 text-lg mb-8 max-w-2xl mx-auto">
                            {content.ctaFinal.subtitle}
                        </p>
                        <a
                            href="https://criarofertas.com.br"
                            className="inline-block bg-white text-brand-600 font-bold py-4 px-12 rounded-full text-xl shadow-2xl hover:bg-gray-100 transition-all transform hover:-translate-y-1"
                        >
                            {content.ctaFinal.buttonText}
                        </a>
                    </div>
                </section>
            </main>
            <Footer />

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-6 right-6 p-3 md:p-4 bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-2xl shadow-brand-900/20 transition-all duration-300 z-40 flex items-center justify-center border-2 border-white/20 hover:-translate-y-1 ${showBackToTop ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-10'
                    }`}
                aria-label="Voltar ao topo"
            >
                <ArrowUp size={24} />
            </button>
        </div>
    );
}

export default Home;
