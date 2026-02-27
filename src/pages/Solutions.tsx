import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

export default function Solutions() {
    return (
        <Layout>
            <SEO
                title="Solutions | HexaStack"
                description="Business management, ATS resume tools, and career optimization for India, Gulf, and global markets."
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
                <h1 className="text-4xl font-bold tracking-tight mb-6">Solutions</h1>
                <p className="text-lg text-[var(--muted-foreground)] mb-12">
                    We build software that helps businesses and professionals run and grow — from billing and operations to career optimization.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                    <Link to="/products/hexabill" className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors">
                        <h2 className="text-xl font-semibold mb-2">HexaBill</h2>
                        <p className="text-sm text-[var(--muted-foreground)]">Complete business management: invoicing, POS, inventory, multi-branch. VAT-compliant for Gulf and India.</p>
                    </Link>
                    <a href="https://www.hexacv.online/" target="_blank" rel="noopener noreferrer" className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors">
                        <h2 className="text-xl font-semibold mb-2">HexaCV</h2>
                        <p className="text-sm text-[var(--muted-foreground)]">Free ATS resume builder. Privacy-first, no login. Score checker, keyword gap, JD analyzer.</p>
                    </a>
                    <a href="https://www.hexacv.online/free-tools" target="_blank" rel="noopener noreferrer" className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors">
                        <h2 className="text-xl font-semibold mb-2">Hexa AI Tool Suite</h2>
                        <p className="text-sm text-[var(--muted-foreground)]">Career optimization tools: ATS checker, JD analyzer, bullet improver, section checker.</p>
                    </a>
                    <a href="https://studentshub-gold.vercel.app/" target="_blank" rel="noopener noreferrer" className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors">
                        <h2 className="text-xl font-semibold mb-2">Student Tools</h2>
                        <p className="text-sm text-[var(--muted-foreground)]">Academic productivity SaaS with CGPA, attendance calculators, and client-side PDF tools.</p>
                    </a>
                </div>
            </div>
        </Layout>
    );
}
