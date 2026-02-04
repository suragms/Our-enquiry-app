import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import SEO from '@/components/SEO';

export default function Work() {
    const projects = [
        {
            title: 'Abu Dhabi Trading Company',
            type: 'POS System',
            industry: 'Retail',
            color: 'emerald',
            location: 'Abu Dhabi, UAE',
            result: '200+ daily transactions',
            highlights: ['Multi-currency billing', 'Real-time inventory', 'Sales analytics'],
            problem: 'A retail business needed a reliable point-of-sale system to manage sales, inventory, and billing with multi-currency support.',
            solution: 'Complete POS solution with inventory tracking, automated billing, and real-time business insights.',
        },
        {
            title: 'Medical Lab Management',
            type: 'Healthcare Software',
            industry: 'Healthcare',
            color: 'blue',
            location: 'Kerala, India',
            result: '60% faster reports',
            highlights: ['Sample tracking', 'Auto report generation', 'Patient records'],
            problem: 'A medical laboratory needed to manage patient records, lab tests, and automated report generation.',
            solution: 'Comprehensive lab system with barcode tracking, automated reports, and reduced manual errors.',
        },
        {
            title: 'Business Process Automation',
            type: 'Automation System',
            industry: 'Operations',
            color: 'orange',
            location: 'Multiple Clients',
            result: '40+ hours saved weekly',
            highlights: ['Data entry automation', 'Report scheduling', 'Workflow optimization'],
            problem: 'Businesses needed to reduce manual repetitive tasks and streamline workflows.',
            solution: 'Workflow automation with AI integrations for data processing and document management.',
        }
    ];

    const getColorClasses = (color: string) => {
        const colors: Record<string, { badge: string; border: string; accent: string; light: string }> = {
            emerald: { badge: 'bg-black text-white', border: 'border-neutral-100', accent: 'text-black', light: 'bg-neutral-50' },
            blue: { badge: 'bg-black text-white', border: 'border-neutral-100', accent: 'text-black', light: 'bg-neutral-50' },
            orange: { badge: 'bg-black text-white', border: 'border-neutral-100', accent: 'text-black', light: 'bg-neutral-50' }
        };
        return colors[color] || colors.emerald;
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-black selection:text-white">
            <SEO
                title="Our Work | Custom Software Portfolio | Hexastack AI Solutions"
                description="Explore our successful projects including advanced POS systems in Abu Dhabi, medical laboratory management software in Kerala, and end-to-end business automation."
                keywords="software portfolio Kerala, POS system case studies, healthcare software examples, automation project gallery, software engineering portfolio, client success stories Thrissur, custom software development UAE, medical software implementation, business tool automation results, industrial automation software, billing software portfolio"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Our Work - Portfolio",
                    "description": "Selected projects and case studies by Hexastack AI Solutions.",
                    "mainEntity": {
                        "@type": "ItemList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Abu Dhabi Trading POS System" },
                            { "@type": "ListItem", "position": 2, "name": "Medical Lab Management Suite" },
                            { "@type": "ListItem", "position": 3, "name": "Business Process Automation" }
                        ]
                    }
                }}
            />
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-neutral-100">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link to="/" className="text-2xl font-bold text-black tracking-tighter">Hexastack<span className="text-neutral-300"> AI Solutions.</span></Link>
                        <div className="hidden md:flex items-center gap-10">
                            <Link to="/" className="text-sm font-bold text-neutral-400 hover:text-black transition-colors uppercase tracking-widest">Home</Link>
                            <span className="text-sm font-bold text-black uppercase tracking-widest border-b border-black">Work</span>
                            <Link to="/contact" className="bg-black text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-neutral-800 transition-all active:scale-95">
                                Get in touch
                            </Link>
                        </div>
                        <Link to="/contact" className="md:hidden bg-black text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <section className="pt-40 pb-16 px-8">
                <div className="max-w-6xl mx-auto">
                    <Link to="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-black mb-12 transition-colors font-bold uppercase text-[10px] tracking-widest">
                        <ArrowLeft className="w-4 h-4" /> Back to home
                    </Link>
                    <div className="bg-neutral-50 rounded-[3rem] border border-neutral-100 p-12 md:p-20">
                        <h1 className="text-5xl md:text-7xl font-bold text-black mb-8 tracking-tighter">Selected <br />Projects</h1>
                        <p className="text-xl text-neutral-500 max-w-xl leading-relaxed">
                            Real systems for real businesses. Honest work that solves actual operational challenges.
                        </p>
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section className="py-8 px-6">
                <div className="max-w-5xl mx-auto space-y-6">
                    {projects.map((project, index) => {
                        const colors = getColorClasses(project.color);
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                {/* Project Header */}
                                <div className={`px-10 py-10 ${colors.light} border-b ${colors.border}`}>
                                    <div className="flex flex-wrap items-center gap-4 mb-6">
                                        <span className={`text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest ${colors.badge}`}>
                                            {project.type}
                                        </span>
                                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                                            {project.industry} • {project.location}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tighter">{project.title}</h2>
                                </div>

                                {/* Project Body */}
                                <div className="p-10">
                                    {/* Result */}
                                    <div className="mb-10">
                                        <div className="inline-flex items-center gap-3 bg-black text-white px-5 py-3 rounded-full">
                                            <CheckCircle className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-widest">Result: {project.result}</span>
                                        </div>
                                    </div>

                                    {/* Problem & Solution Grid */}
                                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                                        <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
                                            <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4">The Challenge</h3>
                                            <p className="text-black font-medium leading-relaxed">{project.problem}</p>
                                        </div>
                                        <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
                                            <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4">Our Solution</h3>
                                            <p className="text-black font-medium leading-relaxed">{project.solution}</p>
                                        </div>
                                    </div>

                                    {/* Highlights */}
                                    <div className="pt-10 border-t border-neutral-50">
                                        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-6">Key Engineering Highlights</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {project.highlights.map((highlight, i) => (
                                                <span
                                                    key={i}
                                                    className={`text-xs font-bold px-5 py-2.5 rounded-full border border-neutral-100 bg-white text-black uppercase tracking-widest`}
                                                >
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-black rounded-[4rem] p-16 md:p-24 text-center shadow-2xl">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">Have a similar project?</h2>
                        <p className="text-neutral-400 text-lg md:text-xl mb-12 max-w-md mx-auto leading-relaxed">Let's discuss how we can engineer a stable solution for your business.</p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full hover:bg-neutral-200 transition-all font-bold text-lg active:scale-95 group"
                        >
                            Talk to us
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 px-8 border-t border-neutral-100">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-16 mb-16">
                        <div>
                            <h3 className="text-2xl font-bold text-black mb-6 tracking-tighter">Hexastack<span className="text-neutral-300"> AI Solutions.</span></h3>
                            <p className="text-neutral-500 leading-relaxed max-w-xs">Engineering reliable digital systems for businesses that value efficiency.</p>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-bold text-black mb-8 uppercase tracking-[0.3em]">Contact</h4>
                            <div className="space-y-4">
                                <a href="tel:+917012714150" className="flex items-center gap-4 text-neutral-500 hover:text-black transition-colors font-medium">
                                    <Phone className="w-4 h-4" /> +91 70127 14150
                                </a>
                                <a href="tel:+917591999365" className="flex items-center gap-4 text-neutral-500 hover:text-black transition-colors font-medium">
                                    <Phone className="w-4 h-4" /> +91 75919 99365
                                </a>
                                <a href="mailto:hexastack78@gmail.com" className="flex items-center gap-4 text-neutral-500 hover:text-black transition-colors font-medium">
                                    <Mail className="w-4 h-4" /> hexastack78@gmail.com
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-bold text-black mb-8 uppercase tracking-[0.3em]">Base</h4>
                            <div className="flex items-center gap-4 text-neutral-500 font-medium">
                                <MapPin className="w-4 h-4" /> Thrissur, Kerala
                            </div>
                        </div>
                    </div>
                    <div className="pt-12 border-t border-neutral-100 flex justify-between items-center px-4">
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">© {new Date().getFullYear()} Hexastack AI Solutions.</p>
                        <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">Monochrome Edition</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
