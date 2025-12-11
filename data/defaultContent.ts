import { SiteContent } from '../types';

export const defaultContent: SiteContent = {
    theme: {
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
        fontFamily: 'Inter',
        favicon: ''
    },
    header: {
        logoTitle: "Criar",
        logoHighlight: "Ofertas",
        navLinks: [
            { name: 'Funcionalidades', href: '#features' },
            { name: 'Como Funciona', href: '#how-it-works' },
            { name: 'Planos', href: '#pricing' },
            { name: 'IA Demo', href: '#ai-demo' },
        ],
        loginText: "Entrar",
        loginUrl: "https://criarofertas.com.br",
        ctaText: "Criar Encarte Grátis",
        ctaUrl: "https://criarofertas.com.br"
    },
    hero: {
        badgeText: "Mais de 5.000 lojistas usam",
        title: "Crie Encartes Profissionais em",
        titleHighlight: "Minutos",
        description: "A ferramenta nº 1 para supermercados, farmácias e varejo. Esqueça designers caros e prazos longos. Faça você mesmo e venda mais hoje.",
        ctaPrimary: "Começar Grátis",
        ctaSecondary: "Ver Demonstração",
        benefits: ["Sem cartão de crédito", "Exportação em PDF/JPG", "Modelos Prontos"],
        heroImage: ""
    },
    features: [
        {
            iconName: "Layout",
            title: "Templates Profissionais",
            description: "Centenas de modelos prontos para supermercados, farmácias, açougues e muito mais."
        },
        {
            iconName: "Zap",
            title: "Extrema Rapidez",
            description: "Crie um encarte completo em menos de 5 minutos. Basta arrastar e soltar."
        },
        {
            iconName: "Download",
            title: "Alta Resolução",
            description: "Exporte em PDF para impressão ou JPG/PNG otimizado para WhatsApp e redes sociais."
        },
        {
            iconName: "Palette",
            title: "Personalização Total",
            description: "Altere cores, fontes e logo para combinar perfeitamente com a identidade da sua loja."
        },
        {
            iconName: "Smartphone",
            title: "Versão Mobile",
            description: "Crie ofertas direto do seu celular ou tablet. Seu marketing na palma da mão."
        },
        {
            iconName: "DollarSign",
            title: "Economia Real",
            description: "Reduza custos com agências e freelancers. Assuma o controle do seu marketing."
        },
        {
            iconName: 'Smartphone',
            title: 'Responsivo Total',
            description: 'Seus encartes ficam perfeitos em qualquer tela. Celulares, tablets ou computadores.'
        }
    ],
    howItWorks: {
        title: "Como Funciona?",
        subtitle: "Três passos simples para o seu encarte perfeito.",
        steps: [
            { num: '01', title: 'Escolha um Modelo', desc: 'Navegue por nossa biblioteca de temas segmentados por nicho.' },
            { num: '02', title: 'Adicione as Ofertas', desc: 'Digite o nome do produto e preço. O sistema formata automaticamente.' },
            { num: '03', title: 'Baixe e Divulgue', desc: 'Faça o download instantâneo e compartilhe no WhatsApp ou imprima.' },
        ]
    },
    aiGenerator: {
        title: "Sem criatividade para as ofertas?",
        subtitle: "Deixe a IA escrever para você.",
        description: "O Criar Ofertas agora integra inteligência artificial para sugerir títulos e chamadas que vendem. Experimente gerar uma chamada atrativa para um produto agora mesmo.",
        features: ["Textos otimizados para varejo", "Geração instantânea", "Foco em conversão e urgência"],
        inputPlaceholder: "Ex: Picanha Fatiada, Cerveja Lata...",
        buttonText: "Gerar Chamada Vendedora",
        generatedTitle: "Sugestão da IA:"
    },
    pricing: [
        {
            name: "Plano Grátis",
            price: "R$ 0,00",
            period: "/ mês",
            features: [
                "Acesso a Criar Ofertas",
                "Acesso a Redes Sociais",
                "Gerenciamento de Produtos"
            ],
            cta: "Começar Grátis",
            theme: 'gray',
            highlight: false
        },
        {
            name: "Plano Premium",
            price: "R$ 99,00",
            period: "/ mês",
            features: [
                "Acesso a Criar Ofertas",
                "Gerenciamento de Produtos",
                "Gerenciamento de Info da Empresa",
                "Acesso a TV Digital (Slides)",
                "Acesso a Redes Sociais"
            ],
            cta: "Quero este",
            theme: 'blue',
            highlight: false
        },
        {
            name: "Plano Pro",
            price: "R$ 199,00",
            period: "/ mês",
            features: [
                "Acesso a Criar Ofertas",
                "Gerenciamento de Produtos",
                "Gerenciamento de Info da Empresa",
                "Acesso a TV Digital (Slides)",
                "Acesso a Redes Sociais",
                "Acesso a Anúncios Áudio/Vídeo",
                "Visualização de Relatórios",
                "Suporte Prioritário"
            ],
            cta: "Quero este",
            theme: 'orange',
            highlight: true
        }
    ],
    testimonials: [
        { name: "Ricardo Silva", role: "Proprietário", company: "Supermercado Silva", text: "Antes eu gastava R$ 800 por mês com designer. Hoje faço tudo sozinho em 10 minutos." },
        { name: "Fernanda Lima", role: "Gerente", company: "Farmácia Central", text: "A qualidade dos templates é incrível. Meus encartes parecem feitos por uma agência grande." },
        { name: "Carlos Oliveira", role: "Dono", company: "Açougue do Carlão", text: "A função de WhatsApp mudou minhas vendas. Envio as ofertas toda segunda e o movimento aumentou." }
    ],
    faq: [
        { question: "Preciso instalar algum programa?", answer: "Não! O CriarOfertas é 100% online. Você acessa direto do seu navegador, seja no computador ou celular." },
        { question: "Posso cancelar quando quiser?", answer: "Sim. Não temos fidelidade. Você pode cancelar sua assinatura a qualquer momento sem multas." },
        { question: "Consigo usar minha própria logo?", answer: "Com certeza. Você pode fazer upload da sua logo e fotos de produtos próprios, ou usar nosso banco de imagens." }
    ],
    ctaFinal: {
        title: "Pronto para revolucionar seu marketing?",
        subtitle: "Junte-se a milhares de lojistas que estão vendendo mais com encartes profissionais.",
        buttonText: "Começar Gratuitamente"
    },
    footer: {
        description: "A plataforma líder para criação de material promocional no varejo brasileiro.",
        copyrightText: "CriarOfertas. Todos os direitos reservados.",
        madeWithText: "Feito com ❤️ para o varejo.",
        instagramUrl: "#",
        facebookUrl: "#",
        twitterUrl: "#",
        linkedinUrl: "",
        youtubeUrl: "",
        tiktokUrl: "",
        whatsappUrl: "",
        columns: [
            {
                title: "Produto",
                visible: true,
                links: [
                    { text: "Templates", url: "#" },
                    { text: "Funcionalidades", url: "#" },
                    { text: "Preços", url: "#" },
                    { text: "API", url: "#" }
                ]
            },
            {
                title: "Empresa",
                visible: true,
                links: [
                    { text: "Sobre Nós", url: "#" },
                    { text: "Carreiras", url: "#" },
                    { text: "Blog", url: "#" },
                    { text: "Contato", url: "#" }
                ]
            },
            {
                title: "Legal",
                visible: true,
                links: [
                    { text: "Termos de Uso", url: "#" },
                    { text: "Privacidade", url: "#" },
                    { text: "Cookies", url: "#" }
                ]
            }
        ]
    }
};
