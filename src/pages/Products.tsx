import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

const products = [
    {
        title: 'HexaBill',
        description: 'Complete business management software: invoicing, POS, inventory, and multi-branch — built for India and the Gulf.',
        benefits: [
            'Professional invoicing & VAT compliance',
            'POS for retail and restaurants',
            'Smart inventory & multi-branch',
            'Advanced analytics & reporting',
        ],
        cta: 'Request Demo',
        ctaLink: '/contact?demo=1',
        to: '/products/hexabill',
    },
    {
        title: 'HexaCV',
        description: 'Free ATS resume builder. Privacy-first, no login required. Score checker, keyword gap analysis, and JD analyzer.',
        benefits: [
            'ATS score checker',
            'Keyword gap analysis',
            'JD analyzer',
            'No sign-up required',
        ],
        cta: 'Try Now',
        ctaLink: 'https://www.hexacv.online/',
        to: 'https://www.hexacv.online/',
        isExternal: true,
    },
    {
        title: 'Hexa AI Tool Suite',
        description: 'Career optimization tools: ATS checker, JD analyzer, bullet improver, and section checker for professionals.',
        benefits: [
            'ATS checker & resume optimizer',
            'JD analyzer',
            'Bullet point improver',
            'Section checker',
        ],
        cta: 'Explore Tools',
        ctaLink: 'https://www.hexacv.online/free-tools',
        to: 'https://www.hexacv.online/free-tools',
        isExternal: true,
    },
    {
        title: 'Student Tools (Hexa Products)',
        description: 'React, Express, MongoDB, JWT, pdf-lib, Vercel. Built academic productivity SaaS designed for students.',
        benefits: [
            'CGPA & Internal Marks Checkers',
            'Attendance Calculators',
            'Client-Side PDF Tools',
            'Strict Privacy-First Setup',
        ],
        cta: 'Open App',
        ctaLink: 'https://studentshub-gold.vercel.app/',
        to: 'https://studentshub-gold.vercel.app/',
        isExternal: true,
    }
];

export default function Products() {
    return (
        <Layout>
            <SEO
                title="Products | HEXASTACK SOLUTIONS — HexaBill, HexaCV, AI Tools"
                description="Business management software, free ATS resume builder, and career optimization tools. HexaBill, HexaCV, and Hexa AI Tool Suite for India, Gulf, and global."
                keywords="HexaBill, HexaCV, business management software India, billing software UAE, free ATS resume checker, career tools"
            />

            {/* Hero */}
            <section className="relative pt-8 pb-16 md:pt-20 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.1),transparent)]" />
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-tight mb-6">
                        Software for Business and Career
                    </h1>
                    <p className="text-base md:text-lg text-[var(--muted-foreground)] max-w-2xl leading-relaxed mb-10">
                        HexaBill for business management. HexaCV for resumes. Hexa AI Tool Suite for career optimization. Built for India, Gulf, and global.
                    </p>
                    <Link to="/contact?demo=1" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full brand-gradient text-white font-semibold hover:opacity-90 transition-opacity">
                        Book a Demo
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Product cards */}
            <section className="py-8 md:py-20 border-t border-[var(--border)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Our Products</h2>
                    <p className="text-[var(--muted-foreground)] mb-10 max-w-xl">Deployed and trusted. No placeholders.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {products.map((p) => (
                            <div
                                key={p.title}
                                className="p-5 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors flex flex-col"
                            >
                                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6 flex-1">{p.description}</p>
                                <ul className="space-y-2 mb-6">
                                    {p.benefits.map((b) => (
                                        <li key={b} className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                                            <Check className="w-4 h-4 text-[var(--accent)] shrink-0" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    {p.isExternal ? (
                                        <a
                                            href={p.ctaLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 min-h-[48px] rounded-xl brand-gradient text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                                        >
                                            {p.cta}
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    ) : (
                                        <Link
                                            to={p.ctaLink}
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 min-h-[48px] rounded-xl brand-gradient text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                                        >
                                            {p.cta}
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    )}
                                    {p.isExternal ? (
                                        <a
                                            href={p.to}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 min-h-[48px] rounded-xl border border-[var(--border)] hover:bg-[var(--muted)] text-sm font-medium transition-colors"
                                        >
                                            Learn more
                                        </a>
                                    ) : (
                                        <Link
                                            to={p.to}
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 min-h-[48px] rounded-xl border border-[var(--border)] hover:bg-[var(--muted)] text-sm font-medium transition-colors"
                                        >
                                            Learn more
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-8 md:py-20 border-t border-[var(--border)] bg-[var(--card)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Not sure which product fits?</h2>
                    <p className="text-[var(--muted-foreground)] mb-8 max-w-md mx-auto">Tell us your needs. We'll recommend the right solution.</p>
                    <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[48px] rounded-full brand-gradient text-white font-semibold hover:opacity-90 transition-opacity">
                        Book Consultation
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
