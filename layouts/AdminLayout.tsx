import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, Type, List, DollarSign, LogOut, Menu, X, MessageSquare, HelpCircle, Settings, Palette, Image } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const AdminLayout: React.FC = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} />, exact: true },
        { name: 'Aparência (Tema)', path: '/admin/theme', icon: <Palette size={20} /> },
        { name: 'Cabeçalho e Menu', path: '/admin/header', icon: <Menu size={20} /> },
        { name: 'Hero (Capa)', path: '/admin/hero', icon: <Type size={20} /> },
        { name: 'Banner de Slides', path: '/admin/banner-slides', icon: <Image size={20} /> },
        { name: 'Funcionalidades', path: '/admin/features', icon: <List size={20} /> },
        { name: 'Planos e Preços', path: '/admin/pricing', icon: <DollarSign size={20} /> },
        { name: 'Depoimentos', path: '/admin/testimonials', icon: <MessageSquare size={20} /> },
        { name: 'FAQ', path: '/admin/faq', icon: <HelpCircle size={20} /> },
        { name: 'Geral (IA, CTA, Rodapé)', path: '/admin/general', icon: <Settings size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Toaster position="top-right" />
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <span className="text-xl font-bold text-brand-600">Admin Panel</span>
                </div>
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    end={item.exact}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'bg-brand-50 text-brand-600'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`
                                    }
                                >
                                    {item.icon}
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        Sair
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4">
                    <span className="text-lg font-bold text-brand-600">Admin Panel</span>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </header>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-b border-gray-200 absolute top-16 left-0 w-full z-50 shadow-lg">
                        <nav className="py-2">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    end={item.exact}
                                    className={({ isActive }) =>
                                        `block px-4 py-3 text-sm font-medium ${isActive ? 'bg-brand-50 text-brand-600' : 'text-gray-600'
                                        }`
                                    }
                                >
                                    <div className="flex items-center gap-2">
                                        {item.icon} {item.name}
                                    </div>
                                </NavLink>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                            >
                                <div className="flex items-center gap-2">
                                    <LogOut size={20} /> Sair
                                </div>
                            </button>
                        </nav>
                    </div>
                )}

                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
