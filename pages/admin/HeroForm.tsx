import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useContent } from '../../context/ContentContext';
import { HeroContent } from '../../types';

import toast from 'react-hot-toast';

const HeroForm: React.FC = () => {
    const { content, updateContent } = useContent();
    const { register, control, handleSubmit, formState: { isSubmitting } } = useForm<HeroContent>({
        defaultValues: content.hero
    });

    const onSubmit = async (data: HeroContent) => {
        // Convert benefits string array to array if it came from text input (not implemented here fully, assuming array input management or simpler text field for now)
        // For simplicity in this demo, we'll keep it simple strings.
        await updateContent('hero', data);
        toast.success('Hero atualizado com sucesso!');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Editar Seção Hero</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Badge Superior</label>
                        <input {...register('badgeText')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500" />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título Principal</label>
                        <input {...register('title')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500" />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Destaque do Título (Gradiente)</label>
                        <input {...register('titleHighlight')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500" />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                        <textarea {...register('description')} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Texto Botão Primário</label>
                        <input {...register('ctaPrimary')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Texto Botão Secundário</label>
                        <input {...register('ctaSecondary')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500" />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Imagem da Capa (URL)</label>
                        <input
                            {...register('heroImage')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                            placeholder="https://... (Deixe em branco para usar o mockup padrão)"
                        />
                        <p className="text-xs text-gray-500 mt-1">Cole o link da imagem aqui para substituir o desenho padrão.</p>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Benefícios (abaixo dos botões) - Uma por linha</label>
                        <Controller
                            control={control}
                            name="benefits"
                            render={({ field }) => (
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                                    rows={3}
                                    placeholder="Ex: Sem cartão de crédito"
                                    {...field}
                                    value={Array.isArray(field.value) ? field.value.join('\n') : field.value}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        const benefitsArray = val.split('\n');
                                        field.onChange(benefitsArray);
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>

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

export default HeroForm;
