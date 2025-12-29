import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export default function Work() {
    const projects = [
        {
            title: 'Abu Dhabi POS & Billing System',
            type: 'POS System',
            industry: 'Retail',
            problem: 'A retail business in Abu Dhabi needed a reliable point-of-sale system to manage sales, inventory, and generate accurate billing with multi-currency support.',
            solution: 'Developed a complete POS solution with inventory tracking, sales reporting, and automated billing. The system handles daily transactions efficiently and provides real-time business insights.',
            tech: ['Web Application', 'Cloud Hosting', 'Database System', 'Real-time Sync']
        },
        {
            title: 'Medical Lab Management Application',
            type: 'Healthcare Software',
            industry: 'Healthcare',
            problem: 'A medical laboratory required a system to manage patient records, lab tests, sample tracking, and automated report generation while ensuring data accuracy and compliance.',
            solution: 'Built a comprehensive lab management system with patient registration, test scheduling, sample barcode tracking, and automated report generation. The system reduced manual errors and improved turnaround time.',
            tech: ['Web Application', 'Patient Management', 'Report Generation', 'Secure Database']
        },
        {
            title: 'Business Automation Solutions',
            type: 'Automation System',
            industry: 'Business Operations',
            problem: 'Businesses needed to reduce manual repetitive tasks, streamline workflows, and integrate AI capabilities to improve operational efficiency.',
            solution: 'Implemented workflow automation systems with AI integrations that handle data processing, document management, and routine business operations automatically.',
            tech: ['AI Integration', 'Workflow Automation', 'API Connections', 'Cloud Services']
        }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white z-50 border-b border-slate-100">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="text-xl font-semibold text-slate-900">
                            HexaStack
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                Home
                            </Link>
                            <span className="text-sm text-slate-900 font-medium">
                                Projects
                            </span>
                            <Link
                                to="/contact"
                                className="text-sm bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors"
                            >
                                Contact Us
                            </Link>
                        </div>

                        <Link
                            to="/contact"
                            className="md:hidden text-sm bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <section className="pt-32 pb-12 px-6">
                <div className="max-w-5xl mx-auto">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to home
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
                        Our Work
                    </h1>
                    <p className="text-slate-500 max-w-xl">
                        Real projects we've built for real businesses. No fake metrics, no exaggeration —
                        just honest work that solves actual problems.
                    </p>
                </div>
            </section>

            {/* Projects */}
            <section className="pb-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="space-y-8">
                        {projects.map((project, index) => (
                            <article
                                key={index}
                                className="bg-white border border-slate-100 rounded-lg p-6 md:p-8 hover:border-slate-200 transition-colors"
                            >
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                        {project.type}
                                    </span>
                                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                        {project.industry}
                                    </span>
                                </div>

                                <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">
                                    {project.title}
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-slate-700 mb-2">
                                            The Problem
                                        </h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">
                                            {project.problem}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-slate-700 mb-2">
                                            Our Solution
                                        </h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">
                                            {project.solution}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                                        Technologies Used
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
                        Have a similar project?
                    </h2>
                    <p className="text-slate-500 mb-8 max-w-md mx-auto">
                        Let's discuss how we can help solve your business problem.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-md hover:bg-slate-800 transition-colors text-base font-medium"
                    >
                        Talk to us
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-slate-900 text-white">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">HexaStack AI Solutions</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Real Intelligence. Real Results.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium mb-4 text-slate-300">Contact</h4>
                            <div className="space-y-2">
                                <a href="tel:+919495712853" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                                    <Phone className="w-4 h-4" />
                                    +91 94957 12853
                                </a>
                                <a href="tel:+917591999365" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                                    <Phone className="w-4 h-4" />
                                    +91 75919 99365
                                </a>
                                <a href="mailto:hexastack78@gmail.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                                    <Mail className="w-4 h-4" />
                                    hexastack78@gmail.com
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium mb-4 text-slate-300">Location</h4>
                            <div className="flex items-start gap-2 text-sm text-slate-400">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>Thrissur, Vatanappally, Kerala</span>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
                        <p>© {new Date().getFullYear()} HexaStack AI Solutions. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
