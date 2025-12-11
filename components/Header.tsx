import React, { useState, useEffect } from 'react';
import { Menu, X, LayoutTemplate, LogIn } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Header: React.FC = () => {
  const { content } = useContent();
  const { header } = content;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = header.navLinks || [];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Active section detection
      const scrollPosition = window.scrollY + 100; // Offset for header detection

      let currentSection = '';
      for (const link of navLinks) {
        const sectionId = link.href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = sectionId;
          }
        }
      }

      // Clear active section if at the very top
      if (window.scrollY < 50) {
        currentSection = '';
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // navLinks is constant inside component

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 85; // Height of sticky header + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      setIsMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
            {header.logoImage ? (
              <img src={header.logoImage} alt="Logo" className="h-10 w-auto" />
            ) : (
              <>
                <div className="bg-brand-600 text-white p-2 rounded-lg">
                  <LayoutTemplate size={24} />
                </div>
                <span className="font-display font-bold text-2xl tracking-tight text-gray-900">
                  {header.logoTitle}<span className="text-brand-600">{header.logoHighlight}</span>
                </span>
              </>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`font-medium transition-all duration-200 ${isActive
                      ? 'text-brand-600 font-semibold'
                      : 'text-gray-600 hover:text-brand-600'
                      }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
              <a
                href={header.loginUrl}
                className="text-gray-600 hover:text-brand-600 font-medium flex items-center gap-2 transition-colors px-2 py-1 rounded-md hover:bg-gray-50"
              >
                <LogIn size={20} />
                {header.loginText}
              </a>
              <a
                href={header.ctaUrl}
                className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-brand-500/30 transform hover:-translate-y-0.5 cursor-pointer"
              >
                {header.ctaText}
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg left-0">
          <div className="px-4 py-6 space-y-4 flex flex-col">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-medium text-lg transition-colors ${isActive
                    ? 'text-brand-600 font-bold'
                    : 'text-gray-700 hover:text-brand-600'
                    }`}
                >
                  {link.name}
                </a>
              );
            })}


            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <a
                href={header.loginUrl}
                className="flex items-center justify-center gap-2 text-gray-700 font-bold py-3 hover:text-brand-600 transition-colors bg-gray-50 rounded-lg w-full"
              >
                <LogIn size={20} />
                {header.loginText}
              </a>
              <a
                href={header.ctaUrl}
                className="bg-brand-600 text-white px-6 py-3 rounded-lg font-bold text-center hover:bg-brand-700 transition-colors cursor-pointer"
              >
                {header.ctaText}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;