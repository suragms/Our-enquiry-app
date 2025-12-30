import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Phone, Mail, MapPin, CheckCircle, MessageCircle, Clock, AlertCircle } from 'lucide-react';
import { API_URL } from '@/lib/utils';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        requirement: '',
        website: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.website) {
            setSubmitted(true);
            return;
        }
        setLoading(true);
        setError('');

        try {
            const { website, ...submitData } = formData;
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData),
            });
            if (!response.ok) throw new Error('Failed to submit');
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', requirement: '', website: '' });
        } catch (err) {
            console.error('Failed to submit:', err);
            setError('failed');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
                <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-slate-200 shadow-sm">
                    <div className="max-w-6xl mx-auto px-8">
                        <div className="flex justify-between items-center h-20">
                            <Link to="/" className="text-2xl font-bold text-slate-900 tracking-tight">HexaStack</Link>
                        </div>
                    </div>
                </nav>

                <div className="pt-32 pb-20 px-8">
                    <div className="max-w-lg mx-auto">
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-10 text-center">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
                                <CheckCircle className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-4">Message Received</h1>
                            <p className="text-lg text-slate-600 mb-2">Thanks for reaching out.</p>
                            <p className="text-slate-500 mb-8">We'll get back to you <strong className="text-slate-700">within 24 hours</strong>.</p>
                            
                            <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left border border-slate-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <Clock className="w-5 h-5 text-slate-500" />
                                    <span className="font-bold text-slate-900">What happens next?</span>
                                </div>
                                <ul className="text-slate-600 space-y-2">
                                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2"></span>We'll review your requirements</li>
                                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2"></span>Our team will contact you</li>
                                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2"></span>We'll discuss your project in detail</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-6 mb-8 border-2 border-slate-200">
                                <p className="text-sm text-slate-500 mb-4">For urgent queries:</p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a href="tel:+919495712853" className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-medium">
                                        <Phone className="w-4 h-4" /> Call Us
                                    </a>
                                    <a href="https://wa.me/919495712853" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium">
                                        <MessageCircle className="w-4 h-4" /> WhatsApp
                                    </a>
                                </div>
                            </div>

                            <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Back to home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-slate-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link to="/" className="text-2xl font-bold text-slate-900 tracking-tight">HexaStack</Link>
                        <div className="hidden md:flex items-center gap-10">
                            <Link to="/" className="text-base text-slate-600 hover:text-slate-900 transition-colors">Home</Link>
                            <Link to="/work" className="text-base text-slate-600 hover:text-slate-900 transition-colors">Work</Link>
                            <span className="text-base text-slate-900 font-semibold">Contact</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <section className="pt-32 pb-12 px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Talk to us about your setup
                    </h1>
                    <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
                        Tell us about your current process. We usually respond within 24 hours.
                    </p>
                </div>
            </section>

            {/* Form & Info */}
            <section className="py-12 px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-5 gap-10">
                        {/* Form */}
                        <div className="md:col-span-3">
                            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-bold text-slate-900 mb-2">Your Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 text-slate-900 text-lg transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 text-slate-900 text-lg transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-bold text-slate-900 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 text-slate-900 text-lg transition-colors"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="requirement" className="block text-sm font-bold text-slate-900 mb-2">Tell us about your project *</label>
                                        <textarea
                                            id="requirement"
                                            required
                                            rows={5}
                                            value={formData.requirement}
                                            onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                                            className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 text-slate-900 text-lg resize-none transition-colors"
                                            placeholder="Describe your project requirements..."
                                        />
                                    </div>

                                    {/* Honeypot */}
                                    <div className="absolute -left-[9999px]" aria-hidden="true">
                                        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
                                    </div>

                                    {error && (
                                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
                                            <div className="flex items-start gap-3">
                                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-red-700 font-medium mb-2">Something went wrong. Try again or contact us directly.</p>
                                                    <div className="flex flex-wrap gap-3">
                                                        <a href="tel:+919495712853" className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-800 font-medium"><Phone className="w-4 h-4" /> Call</a>
                                                        <a href="https://wa.me/919495712853" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-800 font-medium"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
                                                        <a href="mailto:hexastack78@gmail.com" className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-800 font-medium"><Mail className="w-4 h-4" /> Email</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-slate-900 text-white py-5 px-8 rounded-xl hover:bg-slate-800 transition-colors text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                                    >
                                        {loading ? 'Sending...' : 'Send Message'}
                                        {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 sticky top-28">
                                <h2 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h2>

                                <div className="space-y-6">
                                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Phone / WhatsApp</h3>
                                        <div className="space-y-2">
                                            <a href="https://wa.me/919495712853" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                                                <Phone className="w-4 h-4" /> +91 94957 12853
                                            </a>
                                            <a href="https://wa.me/917591999365" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                                                <Phone className="w-4 h-4" /> +91 75919 99365
                                            </a>
                                        </div>
                                    </div>


                                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Email</h3>
                                        <a href="mailto:hexastack78@gmail.com" className="flex items-center gap-3 text-slate-700 hover:text-slate-900 font-medium transition-colors">
                                            <Mail className="w-4 h-4" /> hexastack78@gmail.com
                                        </a>
                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Location</h3>
                                        <div className="flex items-start gap-3 text-slate-700 font-medium">
                                            <MapPin className="w-4 h-4 mt-0.5" /> Thrissur, Kerala
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t-2 border-slate-100">
                                    <p className="text-slate-600 font-medium mb-1">We respond within 24 hours.</p>
                                    <p className="text-sm text-slate-400">Mon-Sat, 10AM-7PM IST</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-8 bg-slate-900 text-white mt-12">
                <div className="max-w-4xl mx-auto text-center text-slate-500">
                    © {new Date().getFullYear()} HexaStack. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
