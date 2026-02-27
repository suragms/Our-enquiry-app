import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

const categories = ['ATS', 'VAT Compliance', 'Billing Software', 'Career Tools'];

const guides = [
    {
        title: 'How ATS Works and How to Beat It',
        excerpt: 'Understand applicant tracking systems and optimize your resume for better visibility and shortlisting.',
        category: 'ATS',
        slug: '#',
    },
    {
        title: 'VAT Compliance for UAE and Saudi Businesses',
        excerpt: 'A practical guide to VAT-compliant invoicing, reporting, and record-keeping for Gulf operations.',
        category: 'VAT Compliance',
        slug: '#',
    },
    {
        title: 'Choosing Billing Software for Multi-Branch Operations',
        excerpt: 'What to look for in billing and ERP software when you run multiple locations or routes.',
        category: 'Billing Software',
        slug: '#',
    },
    {
        title: 'Career Tools That Actually Improve Your Resume',
        excerpt: 'Using JD analyzers, keyword gap tools, and bullet improvers to stand out in competitive roles.',
        category: 'Career Tools',
        slug: '#',
    },
];

export default function Blog() {
    return (
        <Layout>
            <SEO
                title="Blog | HEXASTACK SOLUTIONS — Guides on ATS, VAT, Billing & Career"
                description="Guides on ATS, VAT compliance, billing software, and career tools. Insights for India, Gulf, and global professionals."
                keywords="ATS guide, VAT compliance UAE, billing software India, career tools, resume optimization"
            />

            {/* Hero */}
            <section className="relative pt-8 pb-16 md:pt-20 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.1),transparent)]" />
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-tight mb-6">
                        Blog
                    </h1>
                    <p className="text-base md:text-lg text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
                        Guides on ATS, VAT compliance, billing software, and career tools.
                    </p>
                </div>
            </section>

            {/* Categories */}
            <section className="py-6 border-t border-[var(--border)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-4">Topics</p>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat) => (
                            <span
                                key={cat}
                                className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] text-sm font-medium text-[var(--foreground)]"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Guides */}
            <section className="py-8 md:py-16 border-t border-[var(--border)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Guides & insights</h2>
                    <p className="text-[var(--muted-foreground)] mb-10 max-w-xl">
                        Practical guides for business software, compliance, and career optimization.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {guides.map((g) => (
                            <article
                                key={g.title}
                                className="p-5 md:p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors flex flex-col"
                            >
                                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-2">
                                    {g.category}
                                </span>
                                <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">{g.title}</h3>
                                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4 flex-1">
                                    {g.excerpt}
                                </p>
                                <Link
                                    to={g.slug}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
                                >
                                    Read more
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-8 md:py-16 border-t border-[var(--border)] bg-[var(--card)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-[var(--muted-foreground)] mb-6 max-w-md mx-auto">
                        New guides added regularly. Need help with ATS, VAT, or billing? We can help.
                    </p>
                    <Link
                        to="/contact"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full brand-gradient text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                        Book Consultation
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
