import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useContent } from '../../context/ContentContext';
import { HeaderContent } from '../../types';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';

const HeaderForm: React.FC = () => {
    const { content, updateContent } = useContent();
    const { register, control, handleSubmit, formState: { isSubmitting } } = useForm<{ header: HeaderContent }>({
        defaultValues: { header: content.header }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "header.navLinks" });

    const onSubmit = async (data: { header: HeaderContent }) => {
        await updateContent('header', data.header);
        toast.success('Cabeçalho atualizado!');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Editar Cabeçalho e Menu</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

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
