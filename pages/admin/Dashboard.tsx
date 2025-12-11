import React from 'react';
import { Type, List, DollarSign, MessageSquare, HelpCircle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    const cards = [
        { title: 'Cabeçalho e Menu', desc: 'Logo, Links e Botões do topo.', icon: <List size={32} />, link: '/admin/header', color: 'bg-indigo-50 text-indigo-600' },
        { title: 'Hero & Textos', desc: 'Edite o título principal, textos e botões.', icon: <Type size={32} />, link: '/admin/hero', color: 'bg-blue-50 text-blue-600' },
        { title: 'Diferenciais', desc: 'Gerencie a lista de funcionalidades e ícones.', icon: <List size={32} />, link: '/admin/features', color: 'bg-green-50 text-green-600' },
        { title: 'Planos e Preços', desc: 'Configure as tabelas de preços e planos.', icon: <DollarSign size={32} />, link: '/admin/pricing', color: 'bg-orange-50 text-orange-600' },
        { title: 'Depoimentos', desc: 'O que os clientes dizem.', icon: <MessageSquare size={32} />, link: '/admin/testimonials', color: 'bg-purple-50 text-purple-600' },
        { title: 'FAQ', desc: 'Perguntas e Respostas Frequentes.', icon: <HelpCircle size={32} />, link: '/admin/faq', color: 'bg-yellow-50 text-yellow-600' },
        { title: 'Geral & Rodapé', desc: 'IA, Chamadas Finais e Copyright.', icon: <Settings size={32} />, link: '/admin/general', color: 'bg-gray-100 text-gray-600' },
    ];

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel de Controle</h1>
            <p className="text-gray-500 mb-10">Gerencie todo o conteúdo da sua landing page em um só lugar.</p>

            <div className="grid md:grid-cols-3 gap-6">
                {cards.map((card, idx) => (
                    <Link key={idx} to={card.link} className="block group">
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${card.color} group-hover:scale-110 transition-transform`}>
                                {card.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                            <p className="text-gray-500">{card.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-12 p-6 bg-brand-50 rounded-xl border border-brand-100">
                <h4 className="font-bold text-brand-900 mb-2">ℹ️ Status da Conexão</h4>
                <p className="text-brand-700 text-sm">
                    Você está conectado via Supabase. As alterações são salvas automaticamente na tabela <code>site_content</code>.
                    Certifique-se de que as tabelas foram criadas corretamente no seu banco de dados.
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;
