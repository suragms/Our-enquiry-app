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
        <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-slate-100">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link to="/" className="text-2xl font-bold text-slate-900 tracking-tight">
                            HexaStack
                        </Link>
                        <div className="hidden md:flex items-center gap-10">
                            <a href="#work" className="text-base text-slate-600 hover:text-slate-900 transition-colors">Work</a>
                            <a href="#process" className="text-base text-slate-600 hover:text-slate-900 transition-colors">Process</a>
                            <Link to="/contact" className="text-base bg-slate-900 text-white px-6 py-3 rounded-full hover:bg-slate-800 transition-colors font-medium">
                                Get in touch
                            </Link>
                        </div>
                        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <div className="w-6 h-5 flex flex-col justify-between">
                                <span className={`h-0.5 w-full bg-slate-900 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <span className={`h-0.5 w-full bg-slate-900 transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`h-0.5 w-full bg-slate-900 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-slate-100 px-8 py-6 space-y-4">
                        <a href="#work" className="block text-lg text-slate-600" onClick={() => setIsMenuOpen(false)}>Work</a>
                        <a href="#process" className="block text-lg text-slate-600" onClick={() => setIsMenuOpen(false)}>Process</a>
                        <Link to="/contact" className="block bg-slate-900 text-white px-6 py-3 rounded-full text-center font-medium" onClick={() => setIsMenuOpen(false)}>Get in touch</Link>
                    </div>
                )}
            </nav>

            {/* Hero */}
            <section className="pt-40 pb-32 px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-8">
                        We build digital systems that actually work
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-2xl mb-12">
                        Reliable billing, internal tools, and automation for small businesses. No complexity. Just solutions that run every day.
                    </p>
                    <Link to="/contact" className="inline-flex items-center gap-3 bg-slate-900 text-white text-lg px-8 py-4 rounded-full hover:bg-slate-800 transition-all font-medium group">
                        Let's talk about your project
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* What We Do */}
            <section className="py-24 px-8 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-lg font-semibold text-slate-400 uppercase tracking-wider mb-6">What We Do</h2>
                    <div className="space-y-6">
                        <p className="text-2xl md:text-3xl text-slate-900 leading-relaxed font-medium">
                            We help trading businesses, medical labs, and growing teams replace manual processes with clean, working software.
                        </p>
                        <p className="text-xl text-slate-500 leading-relaxed">
                            From POS systems to custom internal tools — we design, build, and support the technology your operations depend on.
                        </p>
                    </div>
                </div>
            </section>

            {/* Work */}
            <section id="work" className="py-24 px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-lg font-semibold text-slate-400 uppercase tracking-wider mb-12">Selected Work</h2>
                    <div className="space-y-16">
                        <div className="group">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Retail / POS</span>
                                    <h3 className="text-3xl font-bold text-slate-900 mt-2">Abu Dhabi Trading Company</h3>
                                </div>
                            </div>
                            <p className="text-xl text-slate-500 leading-relaxed">
                                Complete point-of-sale and billing system. Replaced 3 separate tools with one integrated solution. Now processing 200+ transactions daily.
                            </p>
                        </div>
                        <div className="h-px bg-slate-200" />
                        <div className="group">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Healthcare</span>
                                    <h3 className="text-3xl font-bold text-slate-900 mt-2">Medical Lab Management</h3>
                                </div>
                            </div>
                            <p className="text-xl text-slate-500 leading-relaxed">
                                Internal workflow system for sample tracking, report generation, and patient records. Cut report delivery time by 60%.
                            </p>
                        </div>
                        <div className="h-px bg-slate-200" />
                        <div className="group">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <span className="text-sm font-semibold text-orange-600 uppercase tracking-wider">Automation</span>
                                    <h3 className="text-3xl font-bold text-slate-900 mt-2">Business Process Tools</h3>
                                </div>
                            </div>
                            <p className="text-xl text-slate-500 leading-relaxed">
                                Custom automation for data entry, reporting, and team coordination. Reduced manual work by 40 hours per week.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section id="process" className="py-24 px-8 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-lg font-semibold text-slate-400 uppercase tracking-wider mb-12">How We Work</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div>
                            <div className="text-5xl font-bold text-slate-700 mb-4">01</div>
                            <h3 className="text-2xl font-bold mb-3">Understand</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">We start with your actual workflow. No assumptions. We learn how your business operates before writing any code.</p>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-slate-700 mb-4">02</div>
                            <h3 className="text-2xl font-bold mb-3">Build</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">We design and develop exactly what you need. No bloat, no unnecessary features. Regular updates throughout.</p>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-slate-700 mb-4">03</div>
                            <h3 className="text-2xl font-bold mb-3">Support</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">We deploy, train your team, and stay available. When something needs to change, we're there.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Ready to simplify your operations?</h2>
                    <p className="text-xl text-slate-500 mb-10 max-w-xl mx-auto">Tell us about your business. We'll respond within 24 hours with honest thoughts on how we can help.</p>
                    <Link to="/contact" className="inline-flex items-center gap-3 bg-slate-900 text-white text-lg px-10 py-5 rounded-full hover:bg-slate-800 transition-all font-medium group">
                        Start a conversation
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 px-8 bg-slate-50 border-t border-slate-200">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="md:col-span-2">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">HexaStack</h3>
                            <p className="text-slate-500 text-lg">Digital systems that run your business. Built with care.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4">Contact</h4>
                            <div className="space-y-3">
                                <a href="tel:+919495712853" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                                    <Phone className="w-4 h-4" /> +91 94957 12853
                                </a>
                                <a href="mailto:hexastack78@gmail.com" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                                    <Mail className="w-4 h-4" /> hexastack78@gmail.com
                                </a>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <MapPin className="w-4 h-4" /> Thrissur, Kerala
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4">Share</h4>
                            <div className="bg-white p-3 rounded-xl border border-slate-200 inline-block shadow-sm">
                                <img src={qrCodeUrl} alt="QR" className="w-20 h-20" />
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-400">© {new Date().getFullYear()} HexaStack. All rights reserved.</p>
                        <button onClick={copyLink} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors">
                            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Link copied!' : 'Copy website link'}
                        </button>
                    </div>
                </div>
            </footer>

            {/* Share Button */}
            <button onClick={() => setShowQR(!showQR)} className="fixed bottom-24 right-6 bg-slate-900 text-white p-4 rounded-full shadow-xl hover:bg-slate-800 transition-all z-40">
                <Share2 className="w-5 h-5" />
            </button>

            {/* QR Modal */}
            {showQR && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6" onClick={() => setShowQR(false)}>
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
                        <QrCode className="w-8 h-8 text-slate-900 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Share HexaStack</h3>
                        <p className="text-slate-500 mb-6">Scan or download for marketing</p>
                        <div className="bg-slate-50 p-6 rounded-2xl mb-6 border border-slate-200">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(SITE_URL)}`} alt="QR" className="w-40 h-40 mx-auto" />
                        </div>
                        <div className="flex gap-3">
                            <button onClick={copyLink} className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors">
                                {copied ? 'Copied!' : 'Copy Link'}
                            </button>
                            <a href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&format=png&data=${encodeURIComponent(SITE_URL)}`} download="hexastack-qr.png" className="flex-1 border-2 border-slate-200 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors">
                                Download
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
