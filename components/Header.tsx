import React, { useState, useEffect } from 'react';
import { Menu, X, LayoutTemplate, LogIn } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Header: React.FC = () => {
  const { content } = useContent();
  const { header } = content;
  const variant = header.variant || 'default';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = header.navLinks || [];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Active section detection
      const scrollPosition = window.scrollY + 100;
      let currentSection = '';
      for (const link of navLinks) {
        if (link.href.startsWith('#')) {
          const sectionId = link.href.substring(1);
          const element = document.getElementById(sectionId);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              currentSection = sectionId;
            }
          }
        }
      }
      if (window.scrollY < 50) currentSection = '';
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);

      if (element) {
        const headerOffset = 85;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        setIsMobileMenuOpen(false);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  // --- Variant Styles ---

  // Top Banner
  const showBanner = header.topBanner?.show;

  // Positioning Wrapper
  const wrapperClass = "fixed top-0 left-0 right-0 z-50 flex flex-col";

  // Nav Container Styles (Background, Padding, Shadow)
  let navContainerClass = "w-full transition-all duration-300";
  let innerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
  let contentWrapperClass = "flex items-center justify-between";
  let navListClass = "hidden md:flex items-center gap-8";
  let logoClass = "flex items-center gap-2 cursor-pointer";
  let textColor = "text-gray-600";
  let activeTextColor = "text-brand-600";
  let mobileBg = "bg-white";

  // Adjust based on Variant
  if (variant === 'dark') {
    navContainerClass += isScrolled ? " bg-gray-900 shadow-md py-3" : " bg-gray-900 py-5";
    textColor = "text-gray-300";
    activeTextColor = "text-white";
    mobileBg = "bg-gray-900 border-gray-800 text-white";
  } else if (variant === 'glass') {
    // Floating pill style
    navContainerClass += " py-4 pointer-events-none"; // wrapper is transparent
    innerClass = "max-w-5xl mx-auto px-4 pointer-events-auto";

    // The actual visual "pill" is the contentWrapper in Glass mode
    contentWrapperClass += ` transition-all duration-300 ${isScrolled ? " bg-white/80 backdrop-blur-md rounded-full px-6 py-2 shadow-lg border border-white/20" : " bg-white/50 backdrop-blur-sm rounded-full px-6 py-2 border border-white/10"}`;

  } else {
    // Default & Minimal & Centered
    navContainerClass += isScrolled ? " bg-white/95 backdrop-blur-sm shadow-md py-3" : " bg-transparent py-5";
  }

  // Logo Component
  const Logo = () => (
    <div className={logoClass} onClick={scrollToTop}>
      {header.logoImage ? (
        <img src={header.logoImage} alt="Logo" className="h-10 w-auto" />
      ) : (
        <>
          <div className={`${variant === 'dark' ? 'bg-white text-gray-900' : 'bg-brand-600 text-white'} p-2 rounded-lg`}>
            <LayoutTemplate size={24} />
          </div>
          <span className={`font-display font-bold text-2xl tracking-tight ${variant === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {header.logoTitle}<span className={variant === 'dark' ? 'text-brand-400' : 'text-brand-600'}>{header.logoHighlight}</span>
          </span>
        </>
      )}
    </div>
  );

  // Nav Links Component
  const NavItems = () => (
    <div className="flex gap-8">
      {variant !== 'minimal' && navLinks.map((link) => {
        const isActive = link.href.startsWith('#') && activeSection === link.href.substring(1);
        return (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className={`font-medium transition-all duration-200 ${isActive
              ? `${activeTextColor} font-bold`
              : `${textColor} hover:${activeTextColor.replace('text-', 'text-opacity-80-')}`
              }`}
          >
            {link.name}
          </a>
        );
      })}
    </div>
  );

  // Actions Component
  const Actions = () => (
    <div className={`flex items-center gap-4 ${variant === 'centered' ? '' : 'pl-6 border-l border-gray-200'} ${variant === 'dark' ? 'border-gray-700' : ''}`}>
      <a
        href={header.loginUrl}
        className={`${textColor} hover:text-brand-600 font-medium flex items-center gap-2 transition-colors px-2 py-1 rounded-md hover:bg-white/10`}
      >
        <LogIn size={20} />
        <span className="hidden sm:inline">{header.loginText}</span>
      </a>
      <a
        href={header.ctaUrl}
        className={`bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-brand-500/30 transform hover:-translate-y-0.5 cursor-pointer`}
      >
        {header.ctaText}
      </a>
    </div>
  );


  return (
    <header className={wrapperClass}>
      {/* Top Banner */}
      {showBanner && (
        <div
          className="text-white text-sm font-medium py-2.5 px-4 text-center relative z-50"
          style={{ backgroundColor: header.topBanner?.backgroundColor || 'var(--color-accent-600)' }}
        >
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-3 md:gap-4">
            <span className="text-sm md:text-base">{header.topBanner?.text}</span>
            {header.topBanner?.linkUrl && (
              <a
                href={header.topBanner.linkUrl}
                className="inline-flex items-center gap-1.5 bg-white text-gray-900 px-4 py-1.5 rounded-full font-semibold text-xs md:text-sm hover:bg-gray-100 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                {header.topBanner.linkText || 'Saiba mais'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>
        </div>
      )}

      <div className={navContainerClass}>
        <div className={innerClass}>
          <div className={contentWrapperClass}>

            {/* Layout Logic */}
            {variant === 'centered' ? (
              <>
                <div className="flex-1 flex justify-start"><NavItems /></div>
                <div className="flex-0 mx-4"><Logo /></div>
                <div className="flex-1 flex justify-end"><Actions /></div>
              </>
            ) : (
              <>
                <Logo />
                <nav className={navListClass}>
                  <NavItems />
                  <Actions />
                </nav>
              </>
            )}

            {/* Mobile Menu Button - Always visible on mobile, overrides desktop layout */}
            <div className="md:hidden flex items-center gap-4">
              {/* Show CTA on mobile header if minimal/glass? Maybe just menu */}
              <button
                className={`p-2 rounded-lg transition-colors ${variant === 'dark' ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className={`md:hidden absolute w-full left-0 border-t shadow-lg ${mobileBg} ${variant === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="px-4 py-6 space-y-4 flex flex-col">
            {navLinks.map((link) => {
              const isActive = link.href.startsWith('#') && activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-medium text-lg transition-colors ${isActive
                    ? 'text-brand-600 font-bold'
                    : `${variant === 'dark' ? 'text-gray-300' : 'text-gray-700'} hover:text-brand-600`
                    }`}
                >
                  {link.name}
                </a>
              );
            })}

            <div className={`pt-4 border-t flex flex-col gap-3 ${variant === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
              <a
                href={header.loginUrl}
                className={`flex items-center justify-center gap-2 font-bold py-3 hover:text-brand-600 transition-colors rounded-lg w-full ${variant === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 bg-gray-50'}`}
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