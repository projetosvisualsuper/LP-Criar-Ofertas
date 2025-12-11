export interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  theme: 'gray' | 'blue' | 'orange';
}

export interface Feature {
  iconName: string; // Changed to string to store in DB
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
}

export interface HeroContent {
  badgeText: string;
  title: string;
  titleHighlight: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  benefits: string[];
  heroImage?: string;
}

export interface AiGeneratorContent {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  inputPlaceholder: string;
  buttonText: string;
  generatedTitle: string;
}

export interface HeaderLink {
  name: string;
  href: string;
}

export interface HeaderContent {
  logoTitle: string;
  logoHighlight: string; // The part "Ofertas"
  logoImage?: string; // Optional URL to replace icon + text
  navLinks: HeaderLink[];
  loginText: string;
  loginUrl: string;
  ctaText: string;
  ctaUrl: string;
}

export interface FooterLink {
  text: string;
  url: string;
}

export interface FooterColumn {
  title: string;
  visible: boolean;
  links: FooterLink[];
}

export interface FooterContent {
  description: string;
  copyrightText: string;
  madeWithText: string;
  instagramUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  whatsappUrl?: string;
  columns?: FooterColumn[]; // New field for dynamic columns
}

export interface Step {
  num: string;
  title: string;
  desc: string;
}

export interface HowItWorksContent {
  title: string;
  subtitle: string;
  steps: Step[];
}

export interface ThemeColors {
  brand50: string;
  brand100: string;
  brand500: string;
  brand600: string;
  brand700: string;
  brand900: string;
  accent500: string;
  accent600: string;
}

export interface ThemeContent {
  colors: ThemeColors;
  fontFamily: string; // 'Inter', 'Roboto', 'Open Sans', etc.
  favicon?: string;
}

export interface SiteContent {
  theme: ThemeContent;
  header: HeaderContent;
  hero: HeroContent;
  features: Feature[];
  howItWorks: HowItWorksContent;
  aiGenerator: AiGeneratorContent;
  pricing: PricingTier[];
  testimonials: Testimonial[];
  faq: FaqItem[];
  ctaFinal: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  footer: FooterContent;
}