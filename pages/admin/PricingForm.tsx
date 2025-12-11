import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useContent } from '../../context/ContentContext';
import { PricingTier } from '../../types';
import { Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const PricingForm: React.FC = () => {
    const { content, updateContent } = useContent();
    const { register, control, handleSubmit, formState: { isSubmitting } } = useForm<{ pricing: PricingTier[] }>({
        defaultValues: {
            pricing: content.pricing
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "pricing"
    });

    const onSubmit = async (data: { pricing: PricingTier[] }) => {
        // Note: features array inside pricing needs a splitter if using a textarea, or simple logic.
        // Ideally we would use another nested useFieldArray for features list, but for MVP let's assume specific handling or simplification
        // For this implementation, I will treat features as comma-separated string in the UI and convert back, OR just keep them static/map them simply.
        // Actually, let's keep it simple: assuming user edits them as a comma-separated string for now or just text fields if complex.
        // Wait, the interface says `features: string[]`. React-hook-form handles arrays well but nesting arrays of arrays (fields -> features) is complex for one form.
        // Let's implement a text area for features that splits by newline.

        // Correct approach for features[] inside pricing tier:
        // We'll update the data before sending to context.

        await updateContent('pricing', data.pricing);
        toast.success('Preços atualizados com sucesso!');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Editar Planos e Preços</h1>
                <button
                    type="button"
                    onClick={() => append({
                        name: 'Novo Plano',
                        price: 'R$ 0,00',
                        period: '/ mês',
                        features: ['Feature 1', 'Feature 2'],
                        cta: 'Assinar',
                        theme: 'gray',
                        highlight: false
                    })}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium"
                >
                    <Plus size={18} /> Adicionar Plano
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative">
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remover Plano"
                        >
                            <Trash2 size={20} />
                        </button>

                        <h3 className="text-lg font-bold text-gray-900 mb-4">Plano #{index + 1}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Plano</label>
                                <input
                                    {...register(`pricing.${index}.name` as const, { required: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                                <input
                                    {...register(`pricing.${index}.price` as const, { required: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
                                <input
                                    {...register(`pricing.${index}.period` as const, { required: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tema</label>
                                <select
                                    {...register(`pricing.${index}.theme` as const)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                                >
                                    <option value="gray">Cinza (Padrão)</option>
                                    <option value="blue">Azul (Destaque Leve)</option>
                                    <option value="orange">Laranja (Destaque Principal)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Botão</label>
                                <input
                                    {...register(`pricing.${index}.cta` as const, { required: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Lista de Funcionalidades (uma por linha)</label>
                                <Controller
                                    control={control}
                                    name={`pricing.${index}.features`}
                                    render={({ field }) => (
                                        <textarea
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                                            rows={5}
                                            placeholder="Digite cada funcionalidade em uma nova linha"
                                            {...field}
                                            value={Array.isArray(field.value) ? field.value.join('\n') : field.value}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                const featuresArray = val.split('\n');
                                                field.onChange(featuresArray);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
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

export default PricingForm;
