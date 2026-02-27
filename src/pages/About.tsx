import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

export default function About() {
    return (
        <Layout>
            <SEO
                title="About | HexaStack"
                description="HexaStack builds software for business and career — HexaBill, HexaCV, and Hexa AI Tool Suite. India, Gulf, and global."
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
                <h1 className="text-4xl font-bold tracking-tight mb-6">About HexaStack</h1>
                <p className="text-lg text-[var(--muted-foreground)] mb-8">
                    We build software that helps businesses and professionals run and grow. Our products — HexaBill (business management), HexaCV (ATS resume builder), and the Hexa AI Tool Suite (career optimization) — serve India, the Gulf, and global markets.
                </p>
                <p className="text-[var(--foreground)] mb-6">
                    Our focus is clarity, compliance, and outcomes: simple UX, region-aware features like VAT-compliant billing, and privacy-first tools where it matters.
                </p>
                <p className="text-[var(--foreground)]">
                    HexaStack Solutions is the legal entity behind the HEXASTACK brand. For enquiries, use the Contact page or the WhatsApp button.
                </p>
            </div>
        </Layout>
    );
}
