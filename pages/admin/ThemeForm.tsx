import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useContent } from '../../context/ContentContext';
import { ThemeContent, ThemeColors } from '../../types';
import toast from 'react-hot-toast';
import { Palette, Type } from 'lucide-react';

const ThemeForm: React.FC = () => {
    const { content, updateContent } = useContent();
    // Ensure theme exists, fallback to default if not (handles transition period)
    const currentTheme = content.theme || {
        colors: {
            brand50: '#f0f9ff',
            brand100: '#e0f2fe',
            brand500: '#0ea5e9',
            brand600: '#0284c7',
            brand700: '#0369a1',
            brand900: '#0c4a6e',
            accent500: '#f97316',
            accent600: '#ea580c',
        },
        fontFamily: 'Inter'
    };

    const { register, control, handleSubmit, watch, formState: { isSubmitting } } = useForm<ThemeContent>({
        defaultValues: currentTheme
    });

    const onSubmit = async (data: ThemeContent) => {
        await updateContent('theme', data);
        toast.success('Tema atualizado com sucesso! As alterações são aplicadas instantaneamente.');
    };

    const fontOptions = [
        'Inter',
        'Roboto',
        'Poppins',
        'Open Sans',
        'Lato',
        'Montserrat',
        'Oswald',
        'Raleway',
        'Ubuntu'
    ];

    const colorLabels: Record<keyof ThemeColors, string> = {
        brand50: 'Fundo muito claro (Ex: Background de Depoimentos, Área de Ícones)',
        brand100: 'Fundo claro (Ex: Bordas sutis, Fundos secundários)',
        brand500: 'Primária Clara (Ex: Anéis de foco, Hover secundário)',
        brand600: 'Primária Principal (Ex: Botões, Links, Ícones, Títulos)',
        brand700: 'Primária Escura (Ex: Hover de Botões)',
        brand900: 'Fundo Escuro/Texto (Ex: Background "Como Funciona", Textos)',
        accent500: 'Destaque Claro (Ex: Gradientes, Detalhes menores)',
        accent600: 'Destaque Principal (Ex: Elementos de chama atenção)',
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10">
            <h1 className="text-2xl font-bold text-gray-900">Personalização Visual (Tema)</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* Typography Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                        <Type size={20} className="text-brand-600" />
                        Tipografia
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fonte Principal</label>
                            <select
                                {...register('fontFamily')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                            >
                                {fontOptions.map(font => (
                                    <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                                ))}
                                <option value="custom">Outra (Digitar Nome)</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                                Selecione uma fonte do Google Fonts. A aplicação irá carregar automaticamente.
                            </p>
                        </div>

                        {watch('fontFamily') === 'custom' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Fonte (Google Fonts)</label>
                                <input
                                    {...register('fontFamily')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Ex: Playfair Display"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Favicon Configuration */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                        ícone do Site (Favicon)
                    </h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">URL do Favicon</label>
                        <p className="text-xs text-gray-500 mb-3">Recomendado: Imagem quadrada (PNG ou ICO) - 32x32 ou 64x64.</p>
                        <input
                            {...register('favicon')}
                            placeholder="https://exemplo.com/icone.png"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-500 focus:border-brand-500"
                        />
                        {watch('favicon') && (
                            <div className="mt-4 flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <span className="text-sm text-gray-500">Prévia:</span>
                                <img src={watch('favicon')} alt="Favicon Preview" className="w-8 h-8 object-contain" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Colors Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                        <Palette size={20} className="text-brand-600" />
                        Cores da Marca
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.keys(currentTheme.colors).map((key) => {
                            const colorKey = key as keyof ThemeColors;
                            return (
                                <div key={colorKey}>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">
                                        {colorKey.replace(/([0-9])/, ' $1')}
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            {...register(`colors.${colorKey}`)}
                                            className="h-10 w-10 p-1 rounded border border-gray-300 cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            {...register(`colors.${colorKey}`)}
                                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg font-mono uppercase"
                                            pattern="^#[0-9A-Fa-f]{6}$"
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-1">{colorLabels[colorKey]}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-end pt-4 pb-20">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 disabled:opacity-50 text-lg shadow-lg flex items-center gap-2"
                    >
                        {isSubmitting ? 'Aplicando...' : 'Salvar e Aplicar Tema'} 🎨
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ThemeForm;
