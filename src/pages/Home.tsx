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

    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-slate-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="text-lg font-semibold text-slate-900">
                            HexaStack
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <a href="#how-we-help" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                How we help
                            </a>
                            <a href="#work" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                Work
                            </a>
                            <Link
                                to="/contact"
                                className="text-sm text-slate-900 hover:text-slate-700 transition-colors"
                            >
                                Talk to us
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
                            <a href="#how-we-help" className="text-slate-600 hover:text-slate-900" onClick={() => setIsMenuOpen(false)}>
                                How we help
                            </a>
                            <a href="#work" className="text-slate-600 hover:text-slate-900" onClick={() => setIsMenuOpen(false)}>
                                Work
                            </a>
                            <Link to="/contact" className="text-slate-900" onClick={() => setIsMenuOpen(false)}>
                                Talk to us
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section - Consulting Style */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-medium text-slate-900 leading-snug mb-6">
                        We help small businesses design and run reliable digital systems
                    </h1>
                    <p className="text-lg text-slate-600 mb-4">
                        Billing, internal tools, and automation — built for real day-to-day operations.
                    </p>
                    <p className="text-sm text-slate-500">
                        We work with a small number of clients and focus on practical delivery.
                    </p>
                </div>
            </section>

            {/* How We Help Section */}
            <section id="how-we-help" className="py-16 px-6 bg-slate-50">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-xl font-medium text-slate-900 mb-8">
                        How we help
                    </h2>
                    <div className="space-y-6">
                        <p className="text-slate-700 leading-relaxed">
                            Helping trading and retail businesses move from manual billing to simple, reliable systems
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                            Designing internal tools that match how your team actually works
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                            Automating repetitive reports and data workflows
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                            Deploying and supporting systems in production (not just demos)
                        </p>
                    </div>
                </div>
            </section>

            {/* Who We Work With Section */}
            <section className="py-16 px-6">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-xl font-medium text-slate-900 mb-8">
                        Who we typically work with
                    </h2>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-slate-700">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2.5 flex-shrink-0" />
                            Small trading & retail businesses
                        </li>
                        <li className="flex items-start gap-3 text-slate-700">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2.5 flex-shrink-0" />
                            Medical labs and operational teams
                        </li>
                        <li className="flex items-start gap-3 text-slate-700">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2.5 flex-shrink-0" />
                            Founders replacing spreadsheets with proper systems
                        </li>
                    </ul>
                </div>
            </section>

            {/* Recent Work Section - Text Only */}
            <section id="work" className="py-16 px-6 bg-slate-50">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-xl font-medium text-slate-900 mb-8">
                        Recent work
                    </h2>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-slate-700">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2.5 flex-shrink-0" />
                            Abu Dhabi — POS & billing system for a trading business
                        </li>
                        <li className="flex items-start gap-3 text-slate-700">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2.5 flex-shrink-0" />
                            Medical lab — internal workflow and reporting system
                        </li>
                        <li className="flex items-start gap-3 text-slate-700">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2.5 flex-shrink-0" />
                            Business automation — custom internal tools
                        </li>
                    </ul>
                </div>
            </section>

            {/* How Engagement Works Section */}
            <section className="py-16 px-6">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-xl font-medium text-slate-900 mb-8">
                        How it usually works
                    </h2>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <span className="text-sm font-medium text-slate-400 mt-0.5">1</span>
                            <p className="text-slate-700">Short discussion to understand your current process</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-sm font-medium text-slate-400 mt-0.5">2</span>
                            <p className="text-slate-700">We suggest a practical system (no unnecessary features)</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-sm font-medium text-slate-400 mt-0.5">3</span>
                            <p className="text-slate-700">Build, deploy, and support the solution</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section - Reframed */}
            <section className="py-16 px-6 bg-slate-900">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-xl font-medium text-white mb-4">
                        Talk to us about your setup
                    </h2>
                    <p className="text-slate-400 mb-8">
                        We usually respond within 24 hours.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium"
                    >
                        Start a conversation
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-slate-950 text-white">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="font-medium mb-4">HexaStack</h3>
                            <p className="text-sm text-slate-500">
                                Practical systems for real operations.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium mb-4 text-slate-400">Contact</h4>
                            <div className="space-y-2">
                                <a href="tel:+919495712853" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors">
                                    <Phone className="w-4 h-4" />
                                    +91 94957 12853
                                </a>
                                <a href="mailto:hexastack78@gmail.com" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors">
                                    <Mail className="w-4 h-4" />
                                    hexastack78@gmail.com
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium mb-4 text-slate-400">Location</h4>
                            <div className="flex items-start gap-2 text-sm text-slate-500">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>Thrissur, Kerala</span>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium mb-4 text-slate-400">Share</h4>
                            <div className="bg-white p-2 rounded-lg inline-block">
                                <img 
                                    src={qrCodeUrl} 
                                    alt="Scan to visit" 
                                    className="w-20 h-20"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-600">© {new Date().getFullYear()} HexaStack</p>
                        <button 
                            onClick={copyLink}
                            className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
                        >
                            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied' : 'Copy link'}
                        </button>
                    </div>
                </div>
            </footer>

            {/* Floating Share Button */}
            <button
                onClick={() => setShowQR(!showQR)}
                className="fixed bottom-24 right-6 bg-slate-900 text-white p-3 rounded-full shadow-lg hover:bg-slate-800 transition-all z-40"
                title="Share"
            >
                <Share2 className="w-4 h-4" />
            </button>

            {/* QR Code Modal */}
            {showQR && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6" onClick={() => setShowQR(false)}>
                    <div className="bg-white rounded-xl p-6 max-w-xs w-full text-center" onClick={e => e.stopPropagation()}>
                        <QrCode className="w-6 h-6 text-slate-900 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">Share this site</h3>
                        <div className="bg-slate-50 p-4 rounded-lg mb-4">
                            <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(SITE_URL)}`}
                                alt="QR Code" 
                                className="w-32 h-32 mx-auto"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={copyLink}
                                className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-2 rounded-lg text-sm"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                            <a 
                                href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&format=png&data=${encodeURIComponent(SITE_URL)}`}
                                download="hexastack-qr.png"
                                className="flex-1 flex items-center justify-center gap-2 border border-slate-200 text-slate-700 py-2 rounded-lg text-sm"
                            >
                                Download
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
