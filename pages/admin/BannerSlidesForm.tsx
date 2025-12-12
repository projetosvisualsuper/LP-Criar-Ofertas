import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useContent } from '../../context/ContentContext';
import { HeroContent, BannerSlide } from '../../types';
import { Trash2, Plus, GripVertical, Image } from 'lucide-react';
import toast from 'react-hot-toast';

const BannerSlidesForm: React.FC = () => {
    const { content, updateContent } = useContent();
    const { register, control, handleSubmit, watch, formState: { isSubmitting } } = useForm<{ hero: HeroContent }>({
        defaultValues: {
            hero: {
                ...content.hero,
                bannerSlides: content.hero.bannerSlides || [],
                showBannerSlider: content.hero.showBannerSlider || false
            }
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "hero.bannerSlides" });

    const onSubmit = async (data: { hero: HeroContent }) => {
        await updateContent('hero', data.hero);
        toast.success('Banner de slides atualizado!');
    };

    const addSlide = () => {
        append({
            id: `slide-${Date.now()}`,
            imageUrl: '',
            title: '',
            subtitle: '',
            ctaText: '',
            ctaUrl: ''
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Banner de Slides (Hero)</h1>
            <p className="text-gray-600">Configure um slider de imagens profissional para a seção principal da sua página.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* Enable/Disable Banner Slider */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <Image size={20} className="text-brand-600" />
                                Ativar Banner de Slides
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Quando ativado, substitui a imagem estática por um slider de banners.
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                {...register('hero.showBannerSlider')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                        </label>
                    </div>
                </div>

                {/* Slides Management */}
                {watch('hero.showBannerSlider') && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-6 border-b pb-4">
                            <h2 className="text-xl font-bold text-gray-800">Slides do Banner</h2>
                            <button
                                type="button"
                                onClick={addSlide}
                                className="bg-brand-50 text-brand-600 hover:bg-brand-100 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                            >
                                <Plus size={16} /> Adicionar Slide
                            </button>
                        </div>

                        {fields.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                                <Image size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500 font-medium mb-2">Nenhum slide adicionado</p>
                                <p className="text-sm text-gray-400 mb-4">Clique em "Adicionar Slide" para começar</p>
                                <button
                                    type="button"
                                    onClick={addSlide}
                                    className="bg-brand-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-700 inline-flex items-center gap-2"
                                >
                                    <Plus size={16} /> Criar Primeiro Slide
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50 relative">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2 text-gray-700 font-bold">
                                                <GripVertical size={20} className="text-gray-400 cursor-move" />
                                                Slide {index + 1}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="col-span-1 md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    URL da Imagem *
                                                </label>
                                                <input
                                                    {...register(`hero.bannerSlides.${index}.imageUrl` as const)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                                                    placeholder="https://exemplo.com/banner.jpg"
                                                    required
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Recomendado: 1920x600px ou maior</p>
                                            </div>

                                            <div className="col-span-1 md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Título (Opcional)
                                                </label>
                                                <input
                                                    {...register(`hero.bannerSlides.${index}.title` as const)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                                                    placeholder="Ex: Ofertas Imperdíveis"
                                                />
                                            </div>

                                            <div className="col-span-1 md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Subtítulo (Opcional)
                                                </label>
                                                <input
                                                    {...register(`hero.bannerSlides.${index}.subtitle` as const)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                                                    placeholder="Ex: Até 50% de desconto em produtos selecionados"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Texto do Botão (Opcional)
                                                </label>
                                                <input
                                                    {...register(`hero.bannerSlides.${index}.ctaText` as const)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                                                    placeholder="Ex: Ver Ofertas"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Link do Botão (Opcional)
                                                </label>
                                                <input
                                                    {...register(`hero.bannerSlides.${index}.ctaUrl` as const)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>

                                        {/* Preview */}
                                        {watch(`hero.bannerSlides.${index}.imageUrl`) && (
                                            <div className="mt-4 border-t pt-4">
                                                <p className="text-xs font-medium text-gray-500 mb-2">Prévia:</p>
                                                <div className="relative h-32 rounded-lg overflow-hidden bg-gray-200">
                                                    <img
                                                        src={watch(`hero.bannerSlides.${index}.imageUrl`)}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'https://placehold.co/1920x600/e5e7eb/6b7280?text=Imagem+Inválida';
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex justify-end pt-4 pb-20">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 disabled:opacity-50 text-lg shadow-lg"
                    >
                        {isSubmitting ? 'Salvando...' : 'Salvar Banner de Slides'}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default BannerSlidesForm;
