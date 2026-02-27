import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

export default function HexaCV() {
    const features = [
        { title: 'ATS Score Checker', desc: 'See how well your resume passes applicant tracking systems. Get a score and actionable tips.' },
        { title: 'Keyword Gap Analysis', desc: 'Compare your resume to the job description. Find missing keywords that ATS and recruiters look for.' },
        { title: 'JD Analyzer', desc: 'Extract key requirements and keywords from job descriptions. Align your resume to each role.' },
        { title: 'Bullet Point Improver', desc: 'Strengthen bullet points with impact and metrics. Make each line count.' },
        { title: 'Section Checker', desc: 'Ensure structure and formatting meet ATS best practices. No broken parsing.' },
    ];
    const faqs = [
        { q: 'Is HexaCV really free?', a: 'Yes. Core ATS checking and optimization tools are free. No credit card, no trial expiry.' },
        { q: 'Do I need to create an account?', a: 'No. Use HexaCV without logging in. We prioritize privacy — your resume stays in your control.' },
        { q: 'Is my resume data stored?', a: 'We are privacy-first. We do not use your resume for training models or selling data. Use without login for maximum privacy.' },
    ];
    return (
        <Layout>
            <SEO
                title="HexaCV | Free ATS Resume Checker & Resume Optimization AI | HexaStack"
                description="Free ATS resume builder and checker. Privacy-first, no login. ATS score, keyword gap analysis, JD analyzer, bullet improver. Resume optimization AI."
                keywords="free ATS resume checker, ATS score checker free, resume keyword analyzer, job description keyword extractor, resume optimization AI"
            />
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                {/* Hero */}
                <section className="py-16 md:py-24">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">HexaCV</h1>
                    <p className="text-xl text-[var(--muted-foreground)] mb-4 max-w-2xl">
                        Free ATS resume builder. Privacy-first. No login required.
                    </p>
                    <p className="text-[var(--muted-foreground)] mb-8 max-w-2xl">
                        Most resumes fail ATS before a human sees them. HexaCV helps you pass the filter and get noticed — without handing over your data.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/contact" className="px-6 py-3 rounded-full brand-gradient text-white font-semibold hover:opacity-90">
                            Try HexaCV
                        </Link>
                        <a href="https://www.hexacv.online/free-tools" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-[var(--border)] hover:bg-[var(--muted)] font-medium">
                            More Career Tools
                        </a>
                    </div>
                </section>

                {/* ATS problem */}
                <section className="py-12 border-t border-[var(--border)]">
                    <h2 className="text-2xl font-bold mb-4">Why ATS matters</h2>
                    <p className="text-[var(--muted-foreground)] max-w-2xl">
                        Applicant tracking systems scan resumes for keywords and structure. If your format is wrong or keywords are missing, you get filtered out before a recruiter ever sees you. HexaCV helps you fix that — for free and without creating an account.
                    </p>
                </section>

                {/* Privacy-first */}
                <section className="py-12 border-t border-[var(--border)]">
                    <h2 className="text-2xl font-bold mb-4">Privacy-first, no login</h2>
                    <p className="text-[var(--muted-foreground)] max-w-2xl">
                        We don't require sign-up to use HexaCV. Your resume is not used to train AI or sold to third parties. You stay in control of your data.
                    </p>
                </section>

                {/* Features */}
                <section className="py-12 border-t border-[var(--border)]">
                    <h2 className="text-2xl font-bold mb-8">Features</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {features.map((f) => (
                            <div key={f.title} className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                                <h3 className="font-semibold mb-2">{f.title}</h3>
                                <p className="text-sm text-[var(--muted-foreground)]">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 border-t border-[var(--border)] text-center">
                    <h2 className="text-2xl font-bold mb-4">Optimize your resume in minutes</h2>
                    <Link to="/contact" className="inline-block px-8 py-4 rounded-full brand-gradient text-white font-semibold hover:opacity-90">
                        Get Started — Free
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
