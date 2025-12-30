import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

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
            emerald: { badge: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-200', accent: 'text-emerald-600', light: 'bg-emerald-50' },
            blue: { badge: 'bg-blue-100 text-blue-700', border: 'border-blue-200', accent: 'text-blue-600', light: 'bg-blue-50' },
            orange: { badge: 'bg-orange-100 text-orange-700', border: 'border-orange-200', accent: 'text-orange-600', light: 'bg-orange-50' }
        };
        return colors[color] || colors.emerald;
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white z-50 border-b border-slate-200 shadow-sm">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="text-xl font-bold text-slate-900">HexaStack</Link>
                        <div className="hidden md:flex items-center gap-8">
                            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">Home</Link>
                            <span className="text-sm font-semibold text-slate-900">Work</span>
                            <Link to="/contact" className="text-sm font-semibold bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800">
                                Get in touch
                            </Link>
                        </div>
                        <Link to="/contact" className="md:hidden bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <section className="pt-24 pb-8 px-6">
                <div className="max-w-5xl mx-auto">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6">
                        <ArrowLeft className="w-4 h-4" /> Back to home
                    </Link>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 md:p-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Work</h1>
                        <p className="text-lg text-slate-500 max-w-2xl">
                            Real projects for real businesses. No fake metrics — just honest work that solves actual problems.
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
                                <div className={`px-8 py-6 ${colors.light} border-b ${colors.border}`}>
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${colors.badge}`}>
                                            {project.type}
                                        </span>
                                        <span className="text-xs font-medium text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200">
                                            {project.industry}
                                        </span>
                                        <span className="text-xs text-slate-400">{project.location}</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{project.title}</h2>
                                </div>

                                {/* Project Body */}
                                <div className="p-8">
                                    {/* Result */}
                                    <div className="mb-6">
                                        <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg">
                                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                                            <span className="text-sm font-bold">Result: {project.result}</span>
                                        </div>
                                    </div>

                                    {/* Problem & Solution Grid */}
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">The Challenge</h3>
                                            <p className="text-slate-700 leading-relaxed">{project.problem}</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Our Solution</h3>
                                            <p className="text-slate-700 leading-relaxed">{project.solution}</p>
                                        </div>
                                    </div>

                                    {/* Highlights */}
                                    <div className="pt-6 border-t border-slate-100">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Key Features</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.highlights.map((highlight, i) => (
                                                <span
                                                    key={i}
                                                    className={`text-sm font-medium px-4 py-2 rounded-lg border ${colors.border} ${colors.light} ${colors.accent}`}
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
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center shadow-xl">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Have a similar project?</h2>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">Let's discuss how we can help solve your business problem.</p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg hover:bg-slate-100 font-semibold group"
                        >
                            Talk to us
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-white border-t border-slate-200">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">HexaStack</h3>
                            <p className="text-slate-500">Digital systems that run your business.</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 mb-3">Contact</h4>
                            <div className="space-y-2 text-sm">
                                <a href="tel:+919495712853" className="flex items-center gap-2 text-slate-500 hover:text-slate-900">
                                    <Phone className="w-4 h-4" /> +91 94957 12853
                                </a>
                                <a href="mailto:hexastack78@gmail.com" className="flex items-center gap-2 text-slate-500 hover:text-slate-900">
                                    <Mail className="w-4 h-4" /> hexastack78@gmail.com
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 mb-3">Location</h4>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <MapPin className="w-4 h-4" /> Thrissur, Kerala
                            </div>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-slate-200 text-center text-sm text-slate-400">
                        © {new Date().getFullYear()} HexaStack. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
