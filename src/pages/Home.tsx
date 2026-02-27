import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Calculator, Bot, Cloud, Layout as LayoutIcon, BarChart3, X } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { API_URL } from '@/lib/utils';

const productCards = [
    { to: '/products/hexabill', title: 'HexaBill', desc: 'Complete business management: invoicing, POS, inventory, multi-branch. VAT-compliant for India and Gulf.', cta: 'Request Demo', ctaLink: '/contact?demo=1' },
    { to: 'https://www.hexacv.online/', title: 'HexaCV', desc: 'Free ATS resume builder. Privacy-first, no login. Score checker, keyword gap, JD analyzer.', cta: 'Try Now', ctaLink: 'https://www.hexacv.online/', isExternal: true },
    { to: 'https://www.hexacv.online/free-tools', title: 'Hexa AI Tool Suite', desc: 'Career optimization tools: ATS checker, JD analyzer, bullet improver, section checker.', cta: 'Explore Tools', ctaLink: 'https://www.hexacv.online/free-tools', isExternal: true },
    { to: 'https://studentshub-gold.vercel.app/', title: 'Student Tools', desc: 'Academic productivity SaaS with CGPA, attendance, internal marks calculators, and client-side PDF tools.', cta: 'Open App', ctaLink: 'https://studentshub-gold.vercel.app/', isExternal: true },
];

const serviceIcons = [Code2, Calculator, Bot, Cloud, LayoutIcon, BarChart3];
const services = [
    { title: 'Custom Business Software Development', desc: 'Build tailored systems aligned to real operational workflows.' },
    { title: 'ERP & Billing System Implementation', desc: 'Deploy scalable billing, inventory, and reporting platforms.' },
    { title: 'AI Automation & Integration', desc: 'Implement intelligent automation to reduce manual dependency.' },
    { title: 'SaaS Product Development', desc: 'Design and engineer scalable SaaS platforms.' },
    { title: 'Cloud Infrastructure & Deployment', desc: 'Secure and scalable hosting architecture.' },
    { title: 'System Optimization & Digital Audit', desc: 'Analyze inefficiencies and improve digital performance.' },
];

export default function Home() {
    const [products, setProducts] = useState<{ id: string; name: string; description: string; link?: string; isComingSoon: boolean }[]>([]);
    const [dbServices, setDbServices] = useState<{ id: string; name: string; icon: string; link?: string; isComingSoon: boolean }[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingServices, setLoadingServices] = useState(true);
    const [exitIntentShown, setExitIntentShown] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => setProducts(Array.isArray(data) ? data : []))
            .catch(() => { })
            .finally(() => setLoadingProducts(false));

        fetch(`${API_URL}/api/services`)
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => setDbServices(Array.isArray(data) ? data : []))
            .catch(() => { })
            .finally(() => setLoadingServices(false));
    }, []);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !exitIntentShown) {
                setExitIntentShown(true);
            }
        };
        document.addEventListener('mouseout', handleMouseLeave);
        return () => document.removeEventListener('mouseout', handleMouseLeave);
    }, [exitIntentShown]);

    const apiProductsFiltered = products.filter((p: any) => !p.isComingSoon);
    const displayProducts = apiProductsFiltered.length > 0
        ? apiProductsFiltered.map((p, i) => ({ ...p, cta: productCards[i]?.cta ?? 'Learn more', ctaLink: productCards[i]?.ctaLink ?? (p as { link?: string }).link ?? productCards[i]?.to }))
        : productCards.map((p) => ({ id: p.to, name: p.title, description: p.desc, link: p.to, cta: p.cta, ctaLink: p.ctaLink }));

    const apiServicesFiltered = dbServices.filter((s: any) => !s.isComingSoon);
    const displayServices = apiServicesFiltered.length > 0
        ? apiServicesFiltered
        : services; // Fallback to hardcoded

    return (
        <Layout>
            <SEO
                title="Home | HEXASTACK SOLUTIONS"
                description="Enterprise-grade business software, ERP implementation, and AI automation systems for companies across India and the Gulf."
                keywords="HexaStack Solutions, business management software India, billing software UAE, ERP implementation, AI automation Gulf"
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: 'HexaStack Solutions',
                    legalName: 'HexaStack Solutions',
                    url: 'https://hexastack.in',
                    logo: 'https://hexastack.in/logo-dark-new.png',
                    contactPoint: {
                        '@type': 'ContactPoint',
                        telephone: '+91-70127-14150',
                        contactType: 'customer service',
                        areaServed: 'Global',
                        availableLanguage: 'English',
                    },
                }}
            />

            {/* Hero - Matching Screenshot */}
            <section className="relative pt-12 pb-16 md:pt-32 md:pb-32 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        {/* Status Pill */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A0A0A0]">Operational. Deployed. Trusted.</span>
                        </div>

                        {/* Hexagon Logo Icon */}
                        <div className="mb-8">
                            <div className="w-10 h-10 border-2 border-[rgba(255,255,255,0.8)] rounded flex items-center justify-center p-1.5">
                                {/* Using SVG directly for crispness, or fallback to the image */}
                                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
                            Build Smarter. <span className="text-[#A0A0A0]">Scale Faster.</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg md:text-xl text-[#A0A0A0] leading-relaxed mb-10 max-w-2xl font-light">
                            Intelligent business software, ERP implementation, and AI automation systems built for growing companies in India and the Gulf.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-colors">
                                Book a Consultation <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link to="/work" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-[rgba(255,255,255,0.15)] text-white hover:bg-[rgba(255,255,255,0.05)] font-medium transition-colors">
                                View Our Work
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services - mobile stacked cards with icons */}
            <section id="services" className="py-8 md:py-20 border-t border-[rgba(255,255,255,0.08)] bg-[#0D0D0D]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-white">Services</h2>
                    <p className="text-[var(--muted-foreground)] mb-8 md:mb-12 max-w-xl">Deployed solutions for business operations. No experimental language — we deliver.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loadingServices
                            ? Array(6).fill(0).map((_, i) => (
                                <div key={i} className="h-40 rounded-2xl bg-[#111111] animate-pulse" />
                            ))
                            : displayServices.map((s: any, i) => {
                                const Icon = serviceIcons[i % serviceIcons.length];
                                return (
                                    <motion.div
                                        key={s.id || s.title || s.name}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="p-5 md:p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A0A0A] shadow-sm flex flex-col items-start hover:bg-[#141414] transition-colors"
                                    >
                                        {s.icon && typeof s.icon === 'string' ? (
                                            <img src={s.icon} alt={s.title || s.name} className="w-8 h-8 rounded mb-3 opacity-90 object-contain" />
                                        ) : Icon ? (
                                            <Icon className="w-6 h-6 text-white mb-3 opacity-80" aria-hidden />
                                        ) : null}
                                        <h3 className="font-semibold mb-2 text-white">{s.title || s.name}</h3>
                                        <p className="text-sm text-[#A0A0A0] leading-relaxed">{s.desc || s.description || s.link}</p>
                                    </motion.div>
                                );
                            })}
                    </div>
                </div>
            </section>

            {/* Products - mobile stacked cards, full-width CTA */}
            <section id="products" className="py-8 md:py-20 border-t border-[rgba(255,255,255,0.08)] bg-[#0D0D0D]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-white">Products</h2>
                    <p className="text-[#A0A0A0] mb-8 md:mb-12 max-w-xl">Business management, ATS resume tools, and career optimization.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {loadingProducts
                            ? Array(4).fill(0).map((_, i) => (
                                <div key={i} className="h-64 rounded-2xl bg-[#111111] animate-pulse" />
                            ))
                            : displayProducts.slice(0, 4).map((p, i) => {
                                const card = productCards[i];
                                const cta = p.cta || card?.cta || 'Learn more';
                                const ctaLink = p.ctaLink || card?.ctaLink || p.link || card?.to || '/solutions';
                                const benefits = card ? (card.title === 'HexaBill' ? ['VAT-compliant', 'Multi-branch'] : card.title === 'HexaCV' ? ['Privacy-first', 'ATS-optimized'] : card.title === 'Student Tools' ? ['CGPA Calculators', 'PDF PDF-lib Tools'] : ['Career tools', 'JD analyzer']) : ['Learn more'];
                                return (
                                    <motion.div
                                        key={p.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-5 md:p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A0A0A] hover:bg-[#141414] hover:border-[rgba(255,255,255,0.15)] transition-colors duration-300 h-full flex flex-col"
                                    >
                                        <h3 className="text-xl font-semibold mb-2 text-white">{p.name}</h3>
                                        <p className="text-sm text-[#A0A0A0] mb-4 flex-1">{p.description}</p>
                                        <ul className="text-sm text-[rgba(255,255,255,0.6)] mb-4 space-y-1">
                                            {benefits.slice(0, 2).map((b) => <li key={b}>• {b}</li>)}
                                        </ul>
                                        {ctaLink.startsWith('http') ? (
                                            <a href={ctaLink} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 py-3.5 min-h-[48px] rounded-xl bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors">
                                                {cta}
                                                <ArrowRight className="w-4 h-4" />
                                            </a>
                                        ) : (
                                            <Link to={ctaLink} className="w-full inline-flex items-center justify-center gap-2 py-3.5 min-h-[48px] rounded-xl bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors">
                                                {cta}
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        )}
                                    </motion.div>
                                );
                            })}
                    </div>
                </div>
            </section>

            {/* Portfolio link */}
            <section className="py-8 md:py-16 border-t border-[rgba(255,255,255,0.08)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl font-bold tracking-tight mb-2 text-white">Portfolio</h2>
                    <p className="text-[#A0A0A0] mb-6 md:mb-8 max-w-xl">Real systems for real businesses. POS, healthcare, automation.</p>
                    <Link to="/work" className="inline-flex items-center gap-2 text-white font-semibold hover:underline min-h-[44px]">
                        View our work
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Industries */}
            <section id="industries" className="py-8 md:py-16 border-t border-[rgba(255,255,255,0.08)] bg-[#0D0D0D]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl font-bold tracking-tight mb-2 text-white">Industries We Serve</h2>
                    <p className="text-[#A0A0A0] mb-6 md:mb-8 max-w-xl">Deployed across retail, healthcare, logistics, hospitality, and growing enterprises.</p>
                    <div className="flex flex-wrap gap-3 md:gap-4">
                        {['Retail & Wholesale', 'Healthcare', 'Logistics & Distribution', 'Restaurants & Hospitality', 'SMEs & Growing Enterprises'].map((ind) => (
                            <span key={ind} className="px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#111111] text-[#A0A0A0] text-sm font-medium">
                                {ind}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process - mobile vertical timeline */}
            <section className="py-8 md:py-20 border-t border-[rgba(255,255,255,0.08)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-white">Our Process</h2>
                    <p className="text-[#A0A0A0] mb-8 md:mb-12 max-w-xl">From discovery to deployment. Operational methodology for predictable outcomes.</p>
                    <div className="flex flex-col md:grid md:grid-cols-5 gap-6 md:gap-6">
                        {['Discover', 'Design', 'Develop', 'Deploy', 'Support'].map((step, i) => (
                            <div key={step} className="flex md:flex-col items-start md:text-center gap-4 md:gap-3">
                                <div className="w-14 h-14 md:w-12 md:h-12 shrink-0 rounded-full border-2 border-[rgba(255,255,255,0.15)] flex items-center justify-center text-lg md:text-sm font-bold text-white">
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base md:text-sm text-white">{step}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enquiry CTA */}
            <section className="py-20 border-t border-[rgba(255,255,255,0.08)] bg-[#0A0A0A]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-white">Ready to discuss your project?</h2>
                    <p className="text-[#A0A0A0] max-w-xl mx-auto mb-10">
                        Request a consultation. We respond within 24 hours.
                    </p>
                    <Link to="/contact" className="inline-block px-8 py-4 w-full sm:w-auto rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
                        Request Consultation
                    </Link>
                </div>
            </section>

            {/* Blog preview */}
            <section className="py-16 border-t border-[rgba(255,255,255,0.08)] bg-[#0D0D0D]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl font-bold tracking-tight mb-2 text-white">Blog</h2>
                    <p className="text-[#A0A0A0] mb-6">Insights on ATS, VAT, and business software.</p>
                    <Link to="/blog" className="text-sm font-medium text-white hover:underline">View blog →</Link>
                </div>
            </section>

            {/* Book demo notification (exit intent) */}
            {exitIntentShown && (
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[70] flex items-center gap-4 p-4 rounded-xl bg-[#111111] border border-[rgba(255,255,255,0.08)] shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                >
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white">Book a demo</p>
                        <p className="text-xs text-[#A0A0A0] mt-0.5">See how HexaBill can help you.</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <Link
                            to="/contact?demo=1"
                            className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 whitespace-nowrap transition-colors"
                            onClick={() => setExitIntentShown(false)}
                        >
                            Book Demo
                        </Link>
                        <button
                            onClick={() => setExitIntentShown(false)}
                            className="p-1.5 rounded-full text-[#A0A0A0] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                            aria-label="Dismiss"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </Layout>
    );
}
