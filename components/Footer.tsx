import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Phone, Video, LayoutTemplate } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Footer: React.FC = () => {
  const { content } = useContent();
  const { footer } = content;

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">

          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-brand-600 text-white p-1.5 rounded-lg">
                <LayoutTemplate size={20} />
              </div>
              <span className="font-display font-bold text-xl text-gray-900">
                Criar<span className="text-brand-600">Ofertas</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {footer.description}
            </p>
            <div className="flex gap-4">
              {footer.instagramUrl && (
                <a href={footer.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-600 transition-colors"><Instagram size={20} /></a>
              )}
              {footer.facebookUrl && (
                <a href={footer.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-600 transition-colors"><Facebook size={20} /></a>
              )}
              {footer.twitterUrl && (
                <a href={footer.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-600 transition-colors"><Twitter size={20} /></a>
              )}
              {footer.linkedinUrl && (
                <a href={footer.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-600 transition-colors"><Linkedin size={20} /></a>
              )}
              {footer.youtubeUrl && (
                <a href={footer.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-600 transition-colors"><Youtube size={20} /></a>
              )}
              {footer.tiktokUrl && (
                <a href={footer.tiktokUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-600 transition-colors" title="TikTok"><Video size={20} /></a>
              )}
              {footer.whatsappUrl && (
                <a href={footer.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-600 transition-colors" title="WhatsApp"><Phone size={20} /></a>
              )}
            </div>
          </div>

          {/* Dynamic Footer Columns */}
          {footer.columns?.map((column, idx) => (
            column.visible && (
              <div key={idx}>
                <h4 className="font-bold text-gray-900 mb-4">{column.title}</h4>
                <ul className="space-y-3 text-sm text-gray-500">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href={link.url} className="hover:text-brand-600 transition-colors">{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}

        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} {footer.copyrightText}</p>
          <p className="mt-2 md:mt-0">{footer.madeWithText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;