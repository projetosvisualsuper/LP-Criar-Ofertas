import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useContent } from '../../context/ContentContext';
import { Feature } from '../../types';
import { Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const FeaturesForm: React.FC = () => {
    const { content, updateContent } = useContent();
    const { register, control, handleSubmit, formState: { isSubmitting } } = useForm<{ features: Feature[] }>({
        defaultValues: {
            features: content.features
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "features"
    });

    const onSubmit = async (data: { features: Feature[] }) => {
        await updateContent('features', data.features);
        toast.success('Funcionalidades atualizadas com sucesso!');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Editar Funcionalidades</h1>
                <button
                    type="button"
                    onClick={() => append({ iconName: 'HelpCircle', title: 'Novo Item', description: 'Descrição...' })}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium"
                >
                    <Plus size={18} /> Adicionar Item
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex gap-4 items-start">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Ícone (Lucide)</label>
                                <input
                                    {...register(`features.${index}.iconName` as const, { required: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                                    placeholder="Ex: Layout, Zap, Download"
                                />
                                <p className="text-xs text-gray-500 mt-1">Use nomes da biblioteca lucide.dev</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                <input
                                    {...register(`features.${index}.title` as const, { required: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                <textarea
                                    {...register(`features.${index}.description` as const, { required: true })}
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-6"
                            title="Remover Item"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FeaturesForm;
