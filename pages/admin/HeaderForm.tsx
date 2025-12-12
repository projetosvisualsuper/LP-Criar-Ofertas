import React, { useEffect, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useContent } from '../../context/ContentContext';
import { HeaderContent } from '../../types';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';

const HeaderForm: React.FC = () => {
    const { content, updateContent, loading } = useContent();

    // Ensure topBanner has default values
    const headerWithDefaults = useMemo(() => ({
        ...content.header,
        topBanner: {
            show: content.header.topBanner?.show || false,
            text: content.header.topBanner?.text || "",
            linkText: content.header.topBanner?.linkText || "",
            linkUrl: content.header.topBanner?.linkUrl || "",
            backgroundColor: content.header.topBanner?.backgroundColor || "#f97316"
        }
    }), [content.header]);

    const { register, control, handleSubmit, watch, reset, formState: { isSubmitting } } = useForm<{ header: HeaderContent }>({
        defaultValues: { header: headerWithDefaults }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "header.navLinks" });

    // Load initial data from database only once after loading is complete
    useEffect(() => {
        if (!loading) {
            console.log('[HeaderForm] Loading initial data from database:', content.header);
            console.log('[HeaderForm] topBanner from DB:', content.header.topBanner);

            const initialHeader = {
                ...content.header,
                topBanner: {
                    show: content.header.topBanner?.show || false,
                    text: content.header.topBanner?.text || "",
                    linkText: content.header.topBanner?.linkText || "",
                    linkUrl: content.header.topBanner?.linkUrl || "",
                    backgroundColor: content.header.topBanner?.backgroundColor || "#f97316"
                }
            };

            console.log('[HeaderForm] Setting form with:', initialHeader);
            reset({ header: initialHeader });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]); // Run when loading changes from true to false


    const onSubmit = async (data: { header: HeaderContent }) => {
        console.log('Submitting header data:', data.header);
        console.log('TopBanner backgroundColor:', data.header.topBanner?.backgroundColor);
        await updateContent('header', data.header);
        toast.success('Cabeçalho atualizado!');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Editar Cabeçalho e Menu</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* Top Banner Configuration */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <span className="text-2xl">📢</span> Banner de Aviso (Topo)
                        </h2>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                {...register('header.topBanner.show')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-700">Ativar</span>
                        </label>
                    </div>

                    {watch('header.topBanner.show') && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 animate-fadeIn">
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Banner</label>
                                <input
                                    {...register('header.topBanner.text')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Ex: Aproveite nossa promoção de Black Friday! 50% OFF"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cor de Fundo</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        {...register('header.topBanner.backgroundColor')}
                                        className="h-10 w-16 p-1 rounded border border-gray-300 cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        {...register('header.topBanner.backgroundColor')}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm uppercase"
                                        placeholder="#f97316"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Link (Opcional)</label>
                                <input
                                    {...register('header.topBanner.linkText')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Ex: Saiba mais"
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL do Link (Opcional)</label>
                                <input
                                    {...register('header.topBanner.linkUrl')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Header Layout Selector */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Estilo do Cabeçalho</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { id: 'default', label: 'Padrão', desc: 'Logo Esq, Menu Centro, Ações Dir' },
                            { id: 'centered', label: 'Centralizado', desc: 'Menu Esq, Logo Centro, Ações Dir' },
                            { id: 'minimal', label: 'Minimalista', desc: 'Sem Menu, apenas Logo e Ações' },
                            { id: 'dark', label: 'Dark Mode', desc: 'Fundo Escuro, Texto Claro' },
                            { id: 'glass', label: 'Glass', desc: 'Flutuante com efeito de vidro' },
                        ].map((style) => (
                            <label
                                key={style.id}
                                className={`cursor-pointer border-2 rounded-xl p-4 transition-all hover:bg-gray-50 flex flex-col gap-2 ${(watch('header.variant') || 'default') === style.id
                                    ? 'border-brand-600 bg-brand-50 ring-1 ring-brand-600'
                                    : 'border-gray-200'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    value={style.id}
                                    {...register('header.variant')}
                                    className="sr-only"
                                />
                                <span className="font-bold text-gray-900">{style.label}</span>
                                <span className="text-xs text-gray-500 leading-snug">{style.desc}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Logo Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Logotipo</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Imagem do Logo (URL)</label>
                            <input
                                {...register('header.logoImage')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="https://... (Preencha para substituir o texto)"
                            />
                            <p className="text-xs text-gray-500 mt-1">Se preenchido, substitui o título e destaque abaixo.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título do Logo (Texto)</label>
                            <input {...register('header.logoTitle')} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Destaque (Cor da Marca)</label>
                            <input {...register('header.logoHighlight')} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative">
                    <div className="flex justify-between items-center mb-4 border-b pb-2">
                        <h2 className="text-xl font-bold text-gray-800">Itens do Menu</h2>
                        <button
                            type="button"
                            onClick={() => append({ name: 'Novo Link', href: '#' })}
                            className="bg-brand-50 text-brand-600 hover:bg-brand-100 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1"
                        >
                            <Plus size={16} /> Adicionar
                        </button>
                    </div>

                    <div className="space-y-3">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <GripVertical size={20} className="text-gray-400 cursor-move" />
                                <div className="flex-1 grid grid-cols-2 gap-4">
                                    <input
                                        {...register(`header.navLinks.${index}.name` as const)}
                                        placeholder="Nome do Link"
                                        className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
                                    />
                                    <input
                                        {...register(`header.navLinks.${index}.href` as const)}
                                        placeholder="Link / Seção (ex: #home)"
                                        className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-600 font-mono text-sm"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Botões de Ação</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Texto Login</label>
                            <input {...register('header.loginText')} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Link Login</label>
                            <input {...register('header.loginUrl')} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Texto Botão Destaque</label>
                            <input {...register('header.ctaText')} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-brand-50 border-brand-200" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Link Botão Destaque</label>
                            <input {...register('header.ctaUrl')} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 pb-20">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 disabled:opacity-50 text-lg shadow-lg"
                    >
                        {isSubmitting ? 'Salvando...' : 'Salvar Cabeçalho'}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default HeaderForm;
