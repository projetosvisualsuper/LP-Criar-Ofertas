import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useContent } from '../../context/ContentContext';
import { AiGeneratorContent, FooterContent } from '../../types';
import toast from 'react-hot-toast';

interface GeneralFormData {
    aiGenerator: AiGeneratorContent;
    howItWorks: any; // Using any for simplicity here, ideally import HowItWorksContent
    footer: FooterContent;
    ctaFinal: {
        title: string;
        subtitle: string;
        buttonText: string;
    }
}

const GeneralForm: React.FC = () => {
    const { content, updateContent } = useContent();
    const { register, control, handleSubmit, reset, formState: { isSubmitting } } = useForm<GeneralFormData>({
        defaultValues: {
            aiGenerator: content.aiGenerator,
            howItWorks: content.howItWorks,
            footer: content.footer,
            ctaFinal: content.ctaFinal
        }
    });

    // Update form values if content is loaded/changed externally (e.g. on page refresh or nav)
    React.useEffect(() => {
        reset({
            aiGenerator: content.aiGenerator,
            howItWorks: content.howItWorks,
            footer: content.footer,
            ctaFinal: content.ctaFinal
        });
    }, [content, reset]);

    const onSubmit = async (data: GeneralFormData) => {
        // We update separate sections
        await updateContent('aiGenerator', data.aiGenerator);
        await updateContent('howItWorks', data.howItWorks);
        await updateContent('footer', data.footer);
        await updateContent('ctaFinal', data.ctaFinal);
        toast.success('Configurações gerais atualizadas!');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10">
            <h1 className="text-2xl font-bold text-gray-900">Editar Conteúdo Geral</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

                {/* AI Generator Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Seção IA (Gerador)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                            <input {...register('aiGenerator.title')} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo (Destaque Colorido)</label>
                            <input {...register('aiGenerator.subtitle')} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                            <textarea {...register('aiGenerator.description')} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lista de Funcionalidades (uma por linha)</label>
                            <Controller
                                control={control}
                                name="aiGenerator.features"
                                render={({ field }) => (
                                    <textarea
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        rows={4}
                                        {...field}
                                        value={Array.isArray(field.value) ? field.value.join('\n') : field.value}
                                        onChange={(e) => field.onChange(e.target.value.split('\n'))}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Seção "Como Funciona" (Azul Escuro)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                            <input {...register('howItWorks.title')} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                            <input {...register('howItWorks.subtitle')} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>

                        {/* Steps - Simplified editing for the 3 steps */}
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="col-span-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-bold text-gray-500 mb-2">Passo {i + 1}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Título do Passo</label>
                                        <input {...register(`howItWorks.steps.${i}.title`)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Descrição</label>
                                        <input {...register(`howItWorks.steps.${i}.desc`)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Final Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Chamada Final (Fundo Azul)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                            <input {...register('ctaFinal.title')} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                            <textarea {...register('ctaFinal.subtitle')} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Texto Botão</label>
                            <input {...register('ctaFinal.buttonText')} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Rodapé</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                            <textarea {...register('footer.description')} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Texto Copyright</label>
                            <input {...register('footer.copyrightText')} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Frase "Feito com..."</label>
                            <input {...register('footer.madeWithText')} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>


                        {/* Footer Columns Editor */}
                        <div className="col-span-2 border-t pt-4 mt-2">
                            <h3 className="text-sm font-bold text-gray-700 mb-4">Colunas de Links (Menu do Rodapé)</h3>
                            <div className="space-y-6">
                                {[0, 1, 2].map((colIdx) => (
                                    <div key={colIdx} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="text-sm font-bold text-gray-700">Coluna {colIdx + 1}</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    {...register(`footer.columns.${colIdx}.visible`)}
                                                    className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                                                />
                                                <span className="text-xs text-gray-500">Visível</span>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-xs text-gray-500 mb-1">Título da Coluna</label>
                                            <input {...register(`footer.columns.${colIdx}.title`)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white" />
                                        </div>

                                        <div className="space-y-3 pl-2 border-l-2 border-gray-200">
                                            <label className="block text-xs font-semibold text-gray-500">Links</label>
                                            {[0, 1, 2, 3].map((linkIdx) => (
                                                <div key={linkIdx} className="grid grid-cols-2 gap-2">
                                                    <input
                                                        {...register(`footer.columns.${colIdx}.links.${linkIdx}.text`)}
                                                        placeholder="Texto do Link"
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                                    />
                                                    <input
                                                        {...register(`footer.columns.${colIdx}.links.${linkIdx}.url`)}
                                                        placeholder="URL (ex: # ou https://)"
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-2 border-t pt-4 mt-2">
                            <h3 className="text-sm font-bold text-gray-700 mb-4">Redes Sociais (Deixe em branco para ocultar)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Instagram URL</label>
                                    <input {...register('footer.instagramUrl')} placeholder="https://instagram.com/..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Facebook URL</label>
                                    <input {...register('footer.facebookUrl')} placeholder="https://facebook.com/..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Twitter/X URL</label>
                                    <input {...register('footer.twitterUrl')} placeholder="https://twitter.com/..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">LinkedIn URL</label>
                                    <input {...register('footer.linkedinUrl')} placeholder="https://linkedin.com/..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">YouTube URL</label>
                                    <input {...register('footer.youtubeUrl')} placeholder="https://youtube.com/..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">TikTok URL</label>
                                    <input {...register('footer.tiktokUrl')} placeholder="https://tiktok.com/..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">WhatsApp URL</label>
                                    <input {...register('footer.whatsappUrl')} placeholder="https://wa.me/55..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 pb-20">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 disabled:opacity-50 text-lg shadow-lg"
                    >
                        {isSubmitting ? 'Salvando tudo...' : 'Salvar Todas as Configurações'}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default GeneralForm;
