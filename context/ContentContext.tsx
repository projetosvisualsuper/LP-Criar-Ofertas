import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent } from '../types';
import { defaultContent } from '../data/defaultContent';
import { supabase } from '../lib/supabase';

interface ContentContextType {
    content: SiteContent;
    updateContent: (section: keyof SiteContent, data: any) => Promise<void>;
    loading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<SiteContent>(defaultContent);
    const [loading, setLoading] = useState(true);

    // Apply Theme Effects
    useEffect(() => {
        if (!content.theme) return;

        const { colors, fontFamily } = content.theme;
        const root = document.documentElement;

        // Apply Colors
        if (colors) {
            Object.entries(colors).forEach(([key, value]) => {
                // Key format: brand50 -> converts to --color-brand-50
                // We split by alpha/numeric boundary if needed, or simple regex
                // Actually my keys are brand50, accent500.
                // Regex to insert hyphen before numbers:
                const cssVarName = key.replace(/([a-zA-Z]+)(\d+)/, '$1-$2');
                // brand50 -> brand-50.
                root.style.setProperty(`--color-${cssVarName}`, value);
            });
        }

        // Apply Font
        if (fontFamily) {
            root.style.setProperty('--font-sans', `'${fontFamily}', sans-serif`);

            // Update Google Font Link if it's one of our dynamic fonts
            // We'll manage a specific link tag for dynamic fonts
            const linkId = 'dynamic-theme-font';
            let link = document.getElementById(linkId) as HTMLLinkElement;

            if (!link) {
                link = document.createElement('link');
                link.id = linkId;
                link.rel = 'stylesheet';
                document.head.appendChild(link);
            }

            // Generic Google Font construction (works for most Sans fonts)
            const fontName = fontFamily.replace(/\s+/g, '+');
            link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;500;600;700;800&display=swap`;
        }

        // Apply Favicon
        if (content.theme.favicon) {
            let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
            if (!favicon) {
                favicon = document.createElement('link');
                favicon.rel = 'icon';
                document.head.appendChild(favicon);
            }
            favicon.href = content.theme.favicon;
        } else {
            // Optional: reset to default if empty, or keep as is. 
            // Ideally we should have a default favicon in index.html to fallback to if this is empty.
        }

    }, [content.theme]);

    // Fetch content from Supabase on mount
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data, error } = await supabase
                    .from('site_content')
                    .select('*');

                if (error) {
                    console.error('Error fetching content:', error);
                    // Fallback to default content is automatic since init state is defaultContent
                    return;
                }

                if (data && data.length > 0) {
                    const newContent = { ...defaultContent };
                    data.forEach((item: { id: string; content: any }) => {
                        if (item.id in newContent) {
                            // @ts-ignore
                            newContent[item.id] = item.content;
                        }
                    });
                    setContent(newContent);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    const updateContent = async (section: keyof SiteContent, data: any) => {
        // 1. Optimistic Update
        setContent((prev) => ({
            ...prev,
            [section]: data,
        }));

        // 2. Persist to Supabase
        const { error } = await supabase
            .from('site_content')
            .upsert({ id: section, content: data, updated_at: new Date() });

        if (error) {
            console.error(`Error updating ${section}:`, error);
            // Revert if needed (omitted for simplicity, but good practice)
            alert('Erro ao salvar no banco de dados. Verifique suas credenciais.');
        }
    };

    return (
        <ContentContext.Provider value={{ content, updateContent, loading }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
