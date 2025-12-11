import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useContent } from '../../context/ContentContext';
import { Testimonial } from '../../types';
import { Trash2, Plus, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const TestimonialsForm: React.FC = () => {
    const { content, updateContent } = useContent();
    const { register, control, handleSubmit, formState: { isSubmitting } } = useForm<{ testimonials: Testimonial[] }>({
        defaultValues: { testimonials: content.testimonials }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "testimonials" });

    const onSubmit = async (data: { testimonials: Testimonial[] }) => {
        await updateContent('testimonials', data.testimonials);
        toast.success('Depoimentos atualizados!');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Editar Depoimentos</h1>
                <button
                    type="button"
                    onClick={() => append({ name: 'Novo Cliente', role: 'Cliente', company: 'Loja', text: 'Depoimento incrível...' })}
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
                        <div className="flex items-center gap-2 mb-4 text-brand-500">
                            <Star size={20} fill="currentColor" /> <span className="font-bold text-gray-900">Depoimento #{index + 1}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                <input {...register(`testimonials.${index}.name` as const)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                                <input {...register(`testimonials.${index}.role` as const)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                                <input {...register(`testimonials.${index}.company` as const)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Depoimento</label>
                                <textarea {...register(`testimonials.${index}.text` as const)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
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

export default TestimonialsForm;
