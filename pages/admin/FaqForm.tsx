import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useContent } from '../../context/ContentContext';
import { FaqItem } from '../../types';
import { Trash2, Plus, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const FaqForm: React.FC = () => {
    const { content, updateContent } = useContent();
    const { register, control, handleSubmit, formState: { isSubmitting } } = useForm<{ faq: FaqItem[] }>({
        defaultValues: { faq: content.faq }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "faq" });

    const onSubmit = async (data: { faq: FaqItem[] }) => {
        await updateContent('faq', data.faq);
        toast.success('FAQ atualizado!');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Editar Perguntas Frequentes</h1>
                <button
                    type="button"
                    onClick={() => append({ question: 'Nova Pergunta?', answer: 'Resposta aqui.' })}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium"
                >
                    <Plus size={18} /> Adicionar
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative">
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                            <Trash2 size={20} />
                        </button>
                        <div className="flex items-center gap-2 mb-4 text-gray-700">
                            <HelpCircle size={20} /> <span className="font-bold">Pergunta #{index + 1}</span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pergunta</label>
                                <input {...register(`faq.${index}.question` as const)} className="w-full px-3 py-2 border border-gray-300 rounded-lg font-bold" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Resposta</label>
                                <textarea {...register(`faq.${index}.answer` as const)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                        </div>
                    </div>
                ))}
                <div className="flex justify-end pt-4">
                    <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700">
                        {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FaqForm;
