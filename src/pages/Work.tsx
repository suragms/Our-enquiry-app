import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export default function Work() {
    const projects = [
        {
            title: 'Abu Dhabi Trading Company',
            type: 'POS System',
            industry: 'Retail',
            color: 'emerald',
            result: '200+ daily transactions',
            problem: 'A retail business in Abu Dhabi needed a reliable point-of-sale system to manage sales, inventory, and generate accurate billing with multi-currency support.',
            solution: 'Developed a complete POS solution with inventory tracking, sales reporting, and automated billing. The system handles daily transactions efficiently and provides real-time business insights.',
            tech: ['Web Application', 'Cloud Hosting', 'Database System', 'Real-time Sync']
        },
        {
            title: 'Medical Lab Management',
            type: 'Healthcare Software',
            industry: 'Healthcare',
            color: 'blue',
            result: '60% faster reports',
            problem: 'A medical laboratory required a system to manage patient records, lab tests, sample tracking, and automated report generation while ensuring data accuracy and compliance.',
            solution: 'Built a comprehensive lab management system with patient registration, test scheduling, sample barcode tracking, and automated report generation. The system reduced manual errors and improved turnaround time.',
            tech: ['Web Application', 'Patient Management', 'Report Generation', 'Secure Database']
        },
        {
            title: 'Business Process Automation',
            type: 'Automation System',
            industry: 'Business Operations',
            color: 'orange',
            result: '40+ hours saved weekly',
            problem: 'Businesses needed to reduce manual repetitive tasks, streamline workflows, and integrate AI capabilities to improve operational efficiency.',
            solution: 'Implemented workflow automation systems with AI integrations that handle data processing, document management, and routine business operations automatically.',
            tech: ['AI Integration', 'Workflow Automation', 'API Connections', 'Cloud Services']
        }
    ];

    const getColorClasses = (color: string) => {
        const colors: Record<string, { badge: string; border: string; bg: string }> = {
            emerald: { badge: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-200', bg: 'bg-emerald-50' },
            blue: { badge: 'bg-blue-100 text-blue-700', border: 'border-blue-200', bg: 'bg-blue-50' },
            orange: { badge: 'bg-orange-100 text-orange-700', border: 'border-orange-200', bg: 'bg-orange-50' }
        };
        return colors[color] || colors.emerald;
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-slate-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link to="/" className="text-2xl font-bold text-slate-900 tracking-tight">
                            HexaStack
                        </Link>
                        <div className="hidden md:flex items-center gap-10">
                            <Link to="/" className="text-base text-slate-600 hover:text-slate-900 transition-colors">Home</Link>
                            <span className="text-base text-slate-900 font-semibold">Work</span>
                            <Link to="/contact" className="text-base bg-slate-900 text-white px-6 py-3 rounded-full hover:bg-slate-800 transition-colors font-medium">
                                Get in touch
                            </Link>
                        </div>
                        <Link to="/contact" className="md:hidden bg-slate-900 text-white px-5 py-2.5 rounded-full font-medium">
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <section className="pt-32 pb-16 px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Our Work
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
                        Real projects we've built for real businesses. No fake metrics — just honest work that solves actual problems.
                    </p>
                </div>
            </section>

            {/* Projects */}
            <section className="py-16 px-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    {projects.map((project, index) => {
                        const colors = getColorClasses(project.color);
                        return (
                            <article
                                key={index}
                                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                            >
                                {/* Header */}
                                <div className={`px-8 py-6 ${colors.bg} border-b ${colors.border}`}>
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <span className={`text-sm font-bold px-4 py-1.5 rounded-full ${colors.badge}`}>
                                            {project.type}
                                        </span>
                                        <span className="text-sm font-medium text-slate-500 bg-white px-4 py-1.5 rounded-full border border-slate-200">
                                            {project.industry}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                                        {project.title}
                                    </h2>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    {/* Result Badge */}
                                    <div className="mb-6">
                                        <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 bg-slate-100 px-4 py-2 rounded-lg">
                                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                            Result: {project.result}
                                        </span>
                                    </div>

                                    {/* Problem & Solution */}
                                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                                                The Problem
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {project.problem}
                                            </p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                                                Our Solution
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {project.solution}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tech */}
                                    <div className="pt-6 border-t border-slate-100">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                            Technologies
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center shadow-xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Have a similar project?
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                            Let's discuss how we can help solve your business problem.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full hover:bg-slate-100 transition-colors text-lg font-semibold group"
                        >
                            Talk to us
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 px-8 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-12 mb-12">
                        <div>
                            <h3 className="text-xl font-bold mb-4">HexaStack</h3>
                            <p className="text-slate-400">Practical systems for real operations.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-300 mb-4">Contact</h4>
                            <div className="space-y-3">
                                <a href="tel:+919495712853" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                    <Phone className="w-4 h-4" /> +91 94957 12853
                                </a>
                                <a href="tel:+917591999365" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                    <Phone className="w-4 h-4" /> +91 75919 99365
                                </a>
                                <a href="mailto:hexastack78@gmail.com" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                    <Mail className="w-4 h-4" /> hexastack78@gmail.com
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-300 mb-4">Location</h4>
                            <div className="flex items-start gap-2 text-slate-400">
                                <MapPin className="w-4 h-4 mt-1" />
                                Thrissur, Kerala
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-800 text-center text-slate-500">
                        © {new Date().getFullYear()} HexaStack. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
