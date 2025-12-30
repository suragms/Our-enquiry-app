import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, QrCode, Share2, Copy, Check, Users, Briefcase, Settings, MessageSquare } from 'lucide-react';
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
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white z-50 border-b border-slate-200 shadow-sm">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="text-xl font-bold text-slate-900">
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
                                className="text-sm bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors font-medium"
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

                {isMenuOpen && (
                    <div className="md:hidden bg-white border-b border-slate-200">
                        <div className="px-6 py-4 flex flex-col gap-4">
                            <a href="#how-we-help" className="text-slate-600" onClick={() => setIsMenuOpen(false)}>How we help</a>
                            <a href="#work" className="text-slate-600" onClick={() => setIsMenuOpen(false)}>Work</a>
                            <Link to="/contact" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-center" onClick={() => setIsMenuOpen(false)}>Talk to us</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-28 pb-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 shadow-xl">
                        <h1 className="text-2xl md:text-4xl font-bold text-white leading-snug mb-4">
                            We help small businesses design and run reliable digital systems
                        </h1>
                        <p className="text-lg text-slate-300 mb-2">
                            Billing, internal tools, and automation — built for real day-to-day operations.
                        </p>
                        <p className="text-sm text-slate-400 mb-8">
                            We work with a small number of clients and focus on practical delivery.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors font-semibold shadow-lg"
                        >
                            Start a conversation
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* How We Help Section */}
            <section id="how-we-help" className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                            <Settings className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">How we help</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-slate-700 font-medium">Helping trading and retail businesses move from manual billing to simple, reliable systems</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-slate-700 font-medium">Designing internal tools that match how your team actually works</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-slate-700 font-medium">Automating repetitive reports and data workflows</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-slate-700 font-medium">Deploying and supporting systems in production (not just demos)</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who We Work With Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Who we typically work with</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <p className="text-slate-800 font-semibold">Small trading & retail businesses</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <p className="text-slate-800 font-semibold">Medical labs and operational teams</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <p className="text-slate-800 font-semibold">Founders replacing spreadsheets with proper systems</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Work Section - Cards */}
            <section id="work" className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-purple-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Recent work</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                            <span className="inline-block text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4">POS System</span>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Abu Dhabi Trading</h3>
                            <p className="text-sm text-slate-600">POS & billing system for a trading business</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                            <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">Healthcare</span>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Medical Lab System</h3>
                            <p className="text-sm text-slate-600">Internal workflow and reporting system</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                            <span className="inline-block text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-4">Automation</span>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Business Tools</h3>
                            <p className="text-sm text-slate-600">Custom internal automation tools</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-orange-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">How it usually works</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="relative">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-900 text-white text-sm font-bold rounded-full mb-4">1</span>
                                <p className="text-slate-700 font-medium">Short discussion to understand your current process</p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-900 text-white text-sm font-bold rounded-full mb-4">2</span>
                                <p className="text-slate-700 font-medium">We suggest a practical system (no unnecessary features)</p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-900 text-white text-sm font-bold rounded-full mb-4">3</span>
                                <p className="text-slate-700 font-medium">Build, deploy, and support the solution</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-3">Talk to us about your setup</h2>
                        <p className="text-slate-400 mb-6">We usually respond within 24 hours.</p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors font-semibold"
                        >
                            Start a conversation
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="font-bold mb-4">HexaStack</h3>
                            <p className="text-sm text-slate-400">Practical systems for real operations.</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold mb-4 text-slate-300">Contact</h4>
                            <div className="space-y-2">
                                <a href="tel:+919495712853" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white">
                                    <Phone className="w-4 h-4" /> +91 94957 12853
                                </a>
                                <a href="mailto:hexastack78@gmail.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white">
                                    <Mail className="w-4 h-4" /> hexastack78@gmail.com
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold mb-4 text-slate-300">Location</h4>
                            <div className="flex items-start gap-2 text-sm text-slate-400">
                                <MapPin className="w-4 h-4 mt-0.5" /> Thrissur, Kerala
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold mb-4 text-slate-300">Scan</h4>
                            <div className="bg-white p-2 rounded-lg inline-block">
                                <img src={qrCodeUrl} alt="QR" className="w-16 h-16" />
                            </div>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-500">© {new Date().getFullYear()} HexaStack</p>
                        <button onClick={copyLink} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white">
                            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied' : 'Copy link'}
                        </button>
                    </div>
                </div>
            </footer>

            {/* Floating Share */}
            <button onClick={() => setShowQR(!showQR)} className="fixed bottom-24 right-6 bg-slate-900 text-white p-3 rounded-full shadow-lg hover:bg-slate-800 z-40">
                <Share2 className="w-4 h-4" />
            </button>

            {/* QR Modal */}
            {showQR && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6" onClick={() => setShowQR(false)}>
                    <div className="bg-white rounded-2xl p-6 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
                        <QrCode className="w-6 h-6 text-slate-900 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Share this site</h3>
                        <div className="bg-slate-50 p-4 rounded-xl mb-4 border border-slate-200">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(SITE_URL)}`} alt="QR" className="w-32 h-32 mx-auto" />
                        </div>
                        <div className="flex gap-2">
                            <button onClick={copyLink} className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl text-sm font-medium">
                                {copied ? 'Copied!' : 'Copy Link'}
                            </button>
                            <a href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&format=png&data=${encodeURIComponent(SITE_URL)}`} download="hexastack-qr.png" className="flex-1 border border-slate-200 py-2.5 rounded-xl text-sm font-medium">
                                Download
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
