import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

export default function HexaBill() {
    const features = [
        { title: 'Professional Invoicing', desc: 'Create and send VAT-compliant invoices. Custom templates, multi-currency, and automatic numbering.' },
        { title: 'POS System', desc: 'Point-of-sale for retail and restaurants. Quick checkout, receipts, and day-end reports.' },
        { title: 'Smart Inventory', desc: 'Track stock across locations. Low-stock alerts, batch tracking, and purchase orders.' },
        { title: 'Customer & Payment Management', desc: 'Customer database, payment history, and multiple payment methods. Cash, card, and online.' },
        { title: 'Advanced Analytics', desc: 'Sales reports, profit margins, and trends. Export to Excel or PDF for decision-making.' },
        { title: 'Multi-Branch Management', desc: 'Central dashboard for all branches. Consolidated reporting and branch-level permissions.' },
    ];
    const industries = ['Retail', 'Restaurants', 'Healthcare', 'Wholesale', 'Services', 'Manufacturing'];
    const faqs = [
        { q: 'Is HexaBill VAT compliant for UAE and Saudi?', a: 'Yes. HexaBill supports VAT-compliant invoicing and reporting for GCC markets.' },
        { q: 'Can I use HexaBill for multiple branches?', a: 'Yes. Multi-branch management lets you run all locations from one dashboard.' },
        { q: 'Does HexaBill include a POS?', a: 'Yes. Our POS is built for retail and F&B with quick checkout and day-end reports.' },
    ];
    return (
        <Layout>
            <SEO
                title="HexaBill | Business Management Software India, Billing Software UAE | HexaStack"
                description="Complete business management software: professional invoicing, POS, smart inventory, multi-branch. VAT compliant for India and Gulf. Billing software UAE, POS Saudi Arabia."
                keywords="business management software India, billing software UAE, POS system Saudi Arabia, VAT compliant billing software, multi branch ERP software, inventory software Gulf"
            />
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                {/* Hero */}
                <section className="py-16 md:py-24">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">HexaBill</h1>
                    <p className="text-xl text-[var(--muted-foreground)] mb-8 max-w-2xl">
                        Complete business management software: invoicing, POS, inventory, and multi-branch — built for India and the Gulf.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/contact?demo=1" className="px-6 py-3 rounded-full brand-gradient text-white font-semibold hover:opacity-90">
                            Book a Demo
                        </Link>
                        <Link to="/pricing" className="px-6 py-3 rounded-full border border-[var(--border)] hover:bg-[var(--muted)] font-medium">
                            See Pricing
                        </Link>
                    </div>
                </section>

                {/* Problem */}
                <section className="py-12 border-t border-[var(--border)]">
                    <h2 className="text-2xl font-bold mb-4">The problem</h2>
                    <p className="text-[var(--muted-foreground)] max-w-2xl">
                        SMBs juggle separate tools for billing, POS, and inventory. VAT and multi-branch add complexity. Manual work leads to errors and lost time.
                    </p>
                </section>

                {/* Solution */}
                <section className="py-12 border-t border-[var(--border)]">
                    <h2 className="text-2xl font-bold mb-4">The solution</h2>
                    <p className="text-[var(--muted-foreground)] max-w-2xl mb-6">
                        HexaBill unifies invoicing, POS, inventory, customers, and payments in one platform. VAT-compliant for UAE and Saudi; multi-branch from day one.
                    </p>
                </section>

                {/* Features */}
                <section className="py-12 border-t border-[var(--border)]">
                    <h2 className="text-2xl font-bold mb-8">Features</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f) => (
                            <div key={f.title} className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                                <h3 className="font-semibold mb-2">{f.title}</h3>
                                <p className="text-sm text-[var(--muted-foreground)]">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Industries */}
                <section className="py-12 border-t border-[var(--border)]">
                    <h2 className="text-2xl font-bold mb-4">Industries we serve</h2>
                    <p className="text-[var(--muted-foreground)] mb-6">Retail, restaurants, healthcare, wholesale, services, manufacturing.</p>
                    <div className="flex flex-wrap gap-3">
                        {industries.map((i) => (
                            <span key={i} className="px-4 py-2 rounded-full border border-[var(--border)] text-sm">{i}</span>
                        ))}
                    </div>
                </section>

                {/* Why HexaBill */}
                <section className="py-12 border-t border-[var(--border)]">
                    <h2 className="text-2xl font-bold mb-4">Why HexaBill</h2>
                    <ul className="list-disc list-inside space-y-2 text-[var(--muted-foreground)] max-w-2xl">
                        <li>One platform for billing, POS, inventory, and multi-branch</li>
                        <li>VAT-compliant invoicing and reporting for Gulf</li>
                        <li>Built for India and GCC from the start</li>
                        <li>Scalable from single outlet to many branches</li>
                    </ul>
                </section>

                {/* CTA */}
                <section className="py-16 border-t border-[var(--border)] text-center">
                    <h2 className="text-2xl font-bold mb-4">Ready to simplify your business?</h2>
                    <Link to="/contact?demo=1" className="inline-block px-8 py-4 rounded-full brand-gradient text-white font-semibold hover:opacity-90">
                        Book a Demo
                    </Link>
                </section>

                {/* FAQ */}
                <section className="py-12 border-t border-[var(--border)]">
                    <h2 className="text-2xl font-bold mb-8">FAQ</h2>
                    <div className="space-y-6">
                        {faqs.map((item) => (
                            <div key={item.q} className="border-b border-[var(--border)] pb-4">
                                <h3 className="font-semibold mb-2">{item.q}</h3>
                                <p className="text-sm text-[var(--muted-foreground)]">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
}
