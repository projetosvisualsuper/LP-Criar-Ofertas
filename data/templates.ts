
import { ThemeContent } from '../types';

export interface ThemeTemplate extends ThemeContent {
    id: string;
    name: string;
    description: string;
    previewColor: string;
}

export const templates: ThemeTemplate[] = [
    {
        id: 'classic-blue',
        name: 'Clássico Azul',
        description: 'Profissional, confiável e seguro. Ideal para SaaS e empresas corporativas.',
        previewColor: '#0ea5e9',
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
    },
    {
        id: 'nature-green',
        name: 'Natureza Verde',
        description: 'Fresco, orgânico e harmonioso. Ótimo para saúde, bem-estar e produtos ecológicos.',
        previewColor: '#10b981',
        colors: {
            brand50: '#ecfdf5',
            brand100: '#d1fae5',
            brand500: '#10b981',
            brand600: '#059669',
            brand700: '#047857',
            brand900: '#064e3b',
            accent500: '#f59e0b',
            accent600: '#d97706',
        },
        fontFamily: 'Montserrat'
    },
    {
        id: 'royal-purple',
        name: 'Roxo Real',
        description: 'Criativo, luxuoso e moderno. Excelente para produtos digitais e inovação.',
        previewColor: '#8b5cf6',
        colors: {
            brand50: '#f5f3ff',
            brand100: '#ede9fe',
            brand500: '#8b5cf6',
            brand600: '#7c3aed',
            brand700: '#6d28d9',
            brand900: '#4c1d95',
            accent500: '#ec4899', // Pink
            accent600: '#db2777',
        },
        fontFamily: 'Poppins'
    },
    {
        id: 'energetic-orange',
        name: 'Laranja Energético',
        description: 'Vibrante, amigável e ativo. Perfeito para alimentos, fitness ou apps sociais.',
        previewColor: '#f97316',
        colors: {
            brand50: '#fff7ed',
            brand100: '#ffedd5',
            brand500: '#f97316',
            brand600: '#ea580c',
            brand700: '#c2410c',
            brand900: '#7c2d12',
            accent500: '#3b82f6', // Blue contrast
            accent600: '#2563eb',
        },
        fontFamily: 'Lato'
    },
    {
        id: 'minimal-dark',
        name: 'Monocromático Dark',
        description: 'Sofisticado, minimalista e de alto contraste. Foco total no conteúdo.',
        previewColor: '#1f2937',
        colors: {
            brand50: '#f9fafb',
            brand100: '#f3f4f6',
            brand500: '#6b7280',
            brand600: '#4b5563',
            brand700: '#374151',
            brand900: '#111827',
            accent500: '#10b981',
            accent600: '#059669',
        },
        fontFamily: 'Roboto'
    },
    {
        id: 'cherry-red',
        name: 'Vermelho Cereja',
        description: 'Intenso, apaixonante e ousado. Bom para moda e marcas de impacto.',
        previewColor: '#e11d48',
        colors: {
            brand50: '#fff1f2',
            brand100: '#ffe4e6',
            brand500: '#f43f5e',
            brand600: '#e11d48',
            brand700: '#be123c',
            brand900: '#881337',
            accent500: '#fbbf24',
            accent600: '#f59e0b',
        },
        fontFamily: 'Open Sans'
    }
];
