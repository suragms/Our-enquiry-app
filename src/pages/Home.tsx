import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, Share2, Copy, Check, QrCode } from 'lucide-react';
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
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white z-50 border-b border-slate-200 shadow-sm">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="text-xl font-bold text-slate-900">HexaStack</Link>
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#work" className="text-sm font-medium text-slate-600 hover:text-slate-900">Work</a>
                            <a href="#process" className="text-sm font-medium text-slate-600 hover:text-slate-900">Process</a>
                            <Link to="/contact" className="text-sm font-semibold bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
                                Get in touch
                            </Link>
                        </div>
                        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <div className="w-5 h-4 flex flex-col justify-between">
                                <span className={`h-0.5 w-full bg-slate-900 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                                <span className={`h-0.5 w-full bg-slate-900 ${isMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`h-0.5 w-full bg-slate-900 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3">
                        <a href="#work" className="block text-slate-600" onClick={() => setIsMenuOpen(false)}>Work</a>
                        <a href="#process" className="block text-slate-600" onClick={() => setIsMenuOpen(false)}>Process</a>
                        <Link to="/contact" className="block bg-slate-900 text-white px-4 py-2 rounded-lg text-center" onClick={() => setIsMenuOpen(false)}>Get in touch</Link>
                    </div>
                )}
            </nav>

            {/* Hero */}
            <section className="pt-28 pb-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 md:p-12">
                        <div className="max-w-3xl">
                            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4">Consulting & Development</p>
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                                We help small businesses run on reliable digital systems
                            </h1>
                            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-2xl">
                                Billing, internal tools, and automation — built for real operations. We work with a small number of clients and focus on practical delivery.
                            </p>
                            <Link to="/contact" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors font-semibold group">
                                Talk to us
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do */}
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">What We Do</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-2">Replace manual billing</h3>
                                <p className="text-sm text-slate-500">Move from spreadsheets to reliable POS and billing systems</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-2">Build internal tools</h3>
                                <p className="text-sm text-slate-500">Custom software that matches how your team works</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-2">Automate workflows</h3>
                                <p className="text-sm text-slate-500">Reduce manual data entry and repetitive tasks</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-2">Deploy & support</h3>
                                <p className="text-sm text-slate-500">We run your systems in production, not just demos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Work */}
            <section id="work" className="py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Recent Work</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg hover:border-slate-300 transition-all">
                            <span className="inline-block text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4">POS System</span>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Abu Dhabi Trading</h3>
                            <p className="text-sm text-slate-500 mb-4">Complete billing and inventory system</p>
                            <div className="pt-4 border-t border-slate-100">
                                <p className="text-xs font-semibold text-slate-900">200+ daily transactions</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg hover:border-slate-300 transition-all">
                            <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">Healthcare</span>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Medical Lab System</h3>
                            <p className="text-sm text-slate-500 mb-4">Workflow, reports, patient records</p>
                            <div className="pt-4 border-t border-slate-100">
                                <p className="text-xs font-semibold text-slate-900">60% faster reports</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg hover:border-slate-300 transition-all">
                            <span className="inline-block text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-4">Automation</span>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Business Tools</h3>
                            <p className="text-sm text-slate-500 mb-4">Data entry and reporting automation</p>
                            <div className="pt-4 border-t border-slate-100">
                                <p className="text-xs font-semibold text-slate-900">40+ hours saved weekly</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <Link to="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
                            View all projects <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section id="process" className="py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-slate-900 rounded-2xl p-8 md:p-10 shadow-xl">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-8">How We Work</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-lg font-bold text-emerald-400">1</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Understand</h3>
                                <p className="text-sm text-slate-400">We learn your actual workflow before writing code</p>
                            </div>
                            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-lg font-bold text-blue-400">2</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Build</h3>
                                <p className="text-sm text-slate-400">We develop exactly what you need. No bloat.</p>
                            </div>
                            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-lg font-bold text-orange-400">3</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Support</h3>
                                <p className="text-sm text-slate-400">We deploy, train, and stay available</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg p-8 md:p-12 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Ready to simplify your operations?</h2>
                        <p className="text-slate-500 mb-8 max-w-lg mx-auto">Tell us about your business. We'll respond within 24 hours.</p>
                        <Link to="/contact" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-lg hover:bg-slate-800 transition-colors font-semibold group">
                            Start a conversation
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-white border-t border-slate-200">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="md:col-span-2">
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
                                <div className="flex items-center gap-2 text-slate-500">
                                    <MapPin className="w-4 h-4" /> Thrissur, Kerala
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 mb-3">Scan</h4>
                            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 inline-block">
                                <img src={qrCodeUrl} alt="QR" className="w-16 h-16" />
                            </div>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-400">© {new Date().getFullYear()} HexaStack</p>
                        <button onClick={copyLink} className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-900">
                            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied!' : 'Copy link'}
                        </button>
                    </div>
                </div>
            </footer>

            {/* Share */}
            <button onClick={() => setShowQR(!showQR)} className="fixed bottom-20 right-4 bg-slate-900 text-white p-3 rounded-full shadow-lg hover:bg-slate-800 z-40">
                <Share2 className="w-4 h-4" />
            </button>

            {/* QR Modal */}
            {showQR && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowQR(false)}>
                    <div className="bg-white rounded-2xl p-6 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
                        <QrCode className="w-6 h-6 text-slate-900 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Share HexaStack</h3>
                        <div className="bg-slate-50 p-4 rounded-xl mb-4 border border-slate-200">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(SITE_URL)}`} alt="QR" className="w-32 h-32 mx-auto" />
                        </div>
                        <div className="flex gap-2">
                            <button onClick={copyLink} className="flex-1 bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium">
                                {copied ? 'Copied!' : 'Copy Link'}
                            </button>
                            <a href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&format=png&data=${encodeURIComponent(SITE_URL)}`} download="hexastack-qr.png" className="flex-1 border border-slate-200 py-2.5 rounded-lg text-sm font-medium">
                                Download
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
