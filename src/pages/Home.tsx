import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, QrCode, Share2, Copy, Check } from 'lucide-react';
import { SITE_URL } from '@/lib/utils';

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [copied, setCopied] = useState(false);

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(SITE_URL)}`;
    
    const copyLink = () => {
        navigator.clipboard.writeText(SITE_URL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const services = [
        'Web Applications',
        'POS & Billing Systems',
        'Medical & Lab Management Applications',
        'AI Integrations',
        'AI Automation & Workflow Systems',
        'Business System Solutions',
        'Cloud Deployment & Support'
    ];

    const processSteps = [
        { step: '01', title: 'Understand', description: 'We listen to your requirements and understand your business needs.' },
        { step: '02', title: 'Build', description: 'We design and develop your solution with regular updates.' },
        { step: '03', title: 'Deploy', description: 'We launch your application with proper testing and setup.' },
        { step: '04', title: 'Support', description: 'We provide ongoing maintenance and support.' }
    ];

    const recentWork = [
        {
            title: 'Abu Dhabi POS & Billing System',
            type: 'POS System',
            industry: 'Retail',
            description: 'Complete point-of-sale and billing solution for retail operations.',
            tech: 'Web Application, Cloud-based'
        },
        {
            title: 'Medical Lab Management Application',
            type: 'Healthcare Software',
            industry: 'Healthcare',
            description: 'Lab workflow management, report generation, and patient record system.',
            tech: 'Web Application, Database System'
        },
        {
            title: 'Business Automation Solutions',
            type: 'Automation System',
            industry: 'Business Operations',
            description: 'Workflow automation and process optimization for business efficiency.',
            tech: 'AI Integration, Automation Tools'
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
                            <a href="#services" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                Services
                            </a>
                            <a href="#work" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                Work
                            </a>
                            <Link to="/work" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                Projects
                            </Link>
                            <Link
                                to="/contact"
                                className="text-sm bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors"
                            >
                                Contact Us
                            </Link>
                        </div>

                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <div className="w-5 h-4 flex flex-col justify-between">
                                <span className={`h-0.5 w-full bg-slate-900 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                                <span className={`h-0.5 w-full bg-slate-900 transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`h-0.5 w-full bg-slate-900 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-b border-slate-100">
                        <div className="px-6 py-4 flex flex-col gap-4">
                            <a href="#services" className="text-slate-600 hover:text-slate-900" onClick={() => setIsMenuOpen(false)}>
                                Services
                            </a>
                            <a href="#work" className="text-slate-600 hover:text-slate-900" onClick={() => setIsMenuOpen(false)}>
                                Work
                            </a>
                            <Link to="/work" className="text-slate-600 hover:text-slate-900" onClick={() => setIsMenuOpen(false)}>
                                Projects
                            </Link>
                            <Link
                                to="/contact"
                                className="bg-slate-900 text-white px-4 py-2 rounded-md text-center hover:bg-slate-800"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight mb-6">
                        Web & AI systems built<br />
                        for real businesses
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-4">
                        Real Intelligence. Real Results.
                    </p>
                    <p className="text-base text-slate-500 max-w-xl mb-10">
                        We build practical software solutions that help businesses operate better.
                        From billing systems to healthcare applications — we deliver what works.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-md hover:bg-slate-800 transition-colors text-base font-medium"
                    >
                        Talk to us about your project
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* What We Do Section */}
            <section id="services" className="py-20 px-6 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-12">
                        What We Do
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                                    <span className="text-base font-medium text-slate-800">{service}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How We Work Section */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-12">
                        How We Work
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {processSteps.map((item, index) => (
                            <div key={index} className="relative bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                                <span className="text-5xl font-bold text-slate-900/10 mb-3 block">
                                    {item.step}
                                </span>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Proof / Recent Work Section */}
            <section id="work" className="py-20 px-6 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                            Recent Work
                        </h2>
                        <Link
                            to="/work"
                            className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1"
                        >
                            View all projects
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {recentWork.map((project, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all">
                                <span className="inline-block text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                                    {project.type}
                                </span>
                                <h3 className="text-lg font-semibold text-slate-900 mt-4 mb-3">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="pt-4 border-t border-slate-100 space-y-2">
                                    <p className="text-xs text-slate-500">
                                        <span className="font-semibold text-slate-700">Industry:</span> {project.industry}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        <span className="font-semibold text-slate-700">Tech:</span> {project.tech}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                        Have a project in mind?
                    </h2>
                    <p className="text-slate-300 mb-8 max-w-md mx-auto">
                        Tell us about your requirements. We'll get back to you within 24 hours.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl hover:bg-slate-100 transition-colors text-base font-semibold shadow-lg"
                    >
                        Talk to us about your project
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-slate-900 text-white">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
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
                        {/* QR Code Section */}
                        <div>
                            <h4 className="text-sm font-medium mb-4 text-slate-300">Scan & Share</h4>
                            <div className="bg-white p-3 rounded-xl inline-block">
                                <img 
                                    src={qrCodeUrl} 
                                    alt="Scan to visit HexaStack" 
                                    className="w-24 h-24"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Scan for our website</p>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-500">© {new Date().getFullYear()} HexaStack AI Solutions. All rights reserved.</p>
                        <button 
                            onClick={copyLink}
                            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                        >
                            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Link Copied!' : 'Copy Website Link'}
                        </button>
                    </div>
                </div>
            </footer>

            {/* Floating Share Button */}
            <button
                onClick={() => setShowQR(!showQR)}
                className="fixed bottom-24 right-6 bg-slate-900 text-white p-4 rounded-full shadow-lg hover:bg-slate-800 transition-all z-40"
                title="Share Website"
            >
                <Share2 className="w-5 h-5" />
            </button>

            {/* QR Code Modal */}
            {showQR && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6" onClick={() => setShowQR(false)}>
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
                        <QrCode className="w-8 h-8 text-slate-900 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Scan to Visit</h3>
                        <p className="text-sm text-slate-500 mb-6">Use this QR code in your marketing materials</p>
                        <div className="bg-slate-50 p-6 rounded-xl mb-6">
                            <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(SITE_URL)}`}
                                alt="HexaStack QR Code" 
                                className="w-48 h-48 mx-auto"
                            />
                        </div>
                        <p className="text-xs text-slate-400 mb-4 break-all">{SITE_URL}</p>
                        <div className="flex gap-3">
                            <button 
                                onClick={copyLink}
                                className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition-colors font-medium"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? 'Copied!' : 'Copy Link'}
                            </button>
                            <a 
                                href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&format=png&data=${encodeURIComponent(SITE_URL)}`}
                                download="hexastack-qr.png"
                                className="flex-1 flex items-center justify-center gap-2 border border-slate-200 text-slate-700 py-3 rounded-xl hover:bg-slate-50 transition-colors font-medium"
                            >
                                Download QR
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
