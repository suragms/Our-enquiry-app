import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

export default function Pricing() {
    return (
        <Layout>
            <SEO
                title="Pricing | HexaStack"
                description="Transparent pricing for HexaBill, HexaCV, and Hexa AI Tool Suite. Start free or book a demo."
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
                <h1 className="text-4xl font-bold tracking-tight mb-6">Pricing</h1>
                <p className="text-lg text-[var(--muted-foreground)] mb-12">
                    Simple, transparent pricing. HexaCV is free; HexaBill and AI tools have plans to fit your scale.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                        <h2 className="text-2xl font-semibold mb-2">HexaBill</h2>
                        <p className="text-3xl font-bold mb-1">Custom</p>
                        <p className="text-sm text-[var(--muted-foreground)] mb-6">Pricing based on branches and users</p>
                        <ul className="space-y-2 text-sm text-[var(--muted-foreground)] mb-8">
                            <li>Professional Invoicing</li>
                            <li>POS & Inventory</li>
                            <li>Multi-Branch</li>
                            <li>VAT Compliant</li>
                        </ul>
                        <Link to="/contact?demo=1" className="block w-full py-3 text-center rounded-full border border-[var(--border)] hover:bg-[var(--muted)] font-medium transition-colors">
                            Book Demo
                        </Link>
                    </div>
                    <div className="p-8 rounded-2xl border-2 border-[var(--accent)] bg-[var(--card)] relative">
                        <span className="absolute -top-3 left-6 px-2 py-0.5 text-xs font-semibold rounded-full brand-gradient text-white">Free</span>
                        <h2 className="text-2xl font-semibold mb-2">HexaCV</h2>
                        <p className="text-3xl font-bold mb-1">Free</p>
                        <p className="text-sm text-[var(--muted-foreground)] mb-6">No login, privacy-first</p>
                        <ul className="space-y-2 text-sm text-[var(--muted-foreground)] mb-8">
                            <li>ATS Score Checker</li>
                            <li>Keyword Gap Analysis</li>
                            <li>JD Analyzer</li>
                            <li>Bullet Point Improver</li>
                        </ul>
                        <a href="https://www.hexacv.online/" target="_blank" rel="noopener noreferrer" className="block w-full py-3 text-center rounded-full brand-gradient text-white font-medium hover:opacity-90">
                            Get Started
                        </a>
                    </div>
                    <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                        <h2 className="text-2xl font-semibold mb-2">Hexa AI Tools</h2>
                        <p className="text-3xl font-bold mb-1">Free tier</p>
                        <p className="text-sm text-[var(--muted-foreground)] mb-6">Premium options available</p>
                        <ul className="space-y-2 text-sm text-[var(--muted-foreground)] mb-8">
                            <li>Career optimization tools</li>
                            <li>ATS & JD analysis</li>
                            <li>Resume improver</li>
                        </ul>
                        <a href="https://www.hexacv.online/free-tools" target="_blank" rel="noopener noreferrer" className="block w-full py-3 text-center rounded-full border border-[var(--border)] hover:bg-[var(--muted)] font-medium transition-colors">
                            Explore Tools
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
