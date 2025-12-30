import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, CheckCircle, MessageCircle, Clock, AlertCircle } from 'lucide-react';
import { API_URL } from '@/lib/utils';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        requirement: '',
        website: '' // Honeypot field for spam protection
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Honeypot check - if filled, it's a bot
        if (formData.website) {
            setSubmitted(true); // Fake success for bots
            return;
        }
        
        setLoading(true);
        setError('');

        try {
            const { website, ...submitData } = formData; // Remove honeypot from submission
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit');
            }

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
            <div className="min-h-screen bg-white text-slate-800 font-sans">
                {/* Navigation */}
                <nav className="fixed top-0 w-full bg-white z-50 border-b border-slate-100">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="flex justify-between items-center h-16">
                            <Link to="/" className="text-xl font-semibold text-slate-900">
                                HexaStack
                            </Link>
                        </div>
                    </div>
                </nav>

                <div className="pt-32 pb-20 px-6">
                    <div className="max-w-md mx-auto text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
                            Message Received
                        </h1>
                        <p className="text-slate-600 mb-2">
                            Thanks for reaching out.
                        </p>
                        <p className="text-slate-500 mb-8">
                            We've received your details and will get back to you <strong className="text-slate-700">within 24 hours</strong>.
                        </p>
                        
                        {/* What happens next */}
                        <div className="bg-slate-50 rounded-lg p-6 mb-8 text-left">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className="w-4 h-4 text-slate-500" />
                                <span className="text-sm font-medium text-slate-700">What happens next?</span>
                            </div>
                            <ul className="text-sm text-slate-600 space-y-2">
                                <li>• We'll review your requirements</li>
                                <li>• Our team will contact you via email or phone</li>
                                <li>• We'll discuss your project in detail</li>
                            </ul>
                        </div>

                        {/* Urgent contact options */}
                        <div className="border border-slate-200 rounded-lg p-6 mb-8">
                            <p className="text-sm text-slate-500 mb-4">For urgent queries, contact us directly:</p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <a
                                    href="tel:+919495712853"
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-sm font-medium"
                                >
                                    <Phone className="w-4 h-4" />
                                    Call Us
                                </a>
                                <a
                                    href="https://wa.me/919495712853"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    WhatsApp
                                </a>
                            </div>
                        </div>

                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

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
                            <Link to="/work" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                Projects
                            </Link>
                            <span className="text-sm text-slate-900 font-medium">
                                Contact
                            </span>
                        </div>
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
                        Contact Us
                    </h1>
                    <p className="text-slate-500 max-w-xl">
                        Tell us about your project and we'll get back to you within 24 hours.
                    </p>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="pb-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Form */}
                        <div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="requirement" className="block text-sm font-medium text-slate-700 mb-2">
                                        Tell us about your project *
                                    </label>
                                    <textarea
                                        id="requirement"
                                        required
                                        rows={5}
                                        value={formData.requirement}
                                        onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900 resize-none"
                                        placeholder="Describe your project requirements..."
                                    />
                                </div>

                                {/* Honeypot field - hidden from real users */}
                                <div className="absolute -left-[9999px]" aria-hidden="true">
                                    <input
                                        type="text"
                                        name="website"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    />
                                </div>

                                {error && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-red-700 mb-2">
                                                    Something went wrong. Please try again or contact us directly.
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    <a
                                                        href="tel:+919495712853"
                                                        className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800"
                                                    >
                                                        <Phone className="w-3 h-3" /> Call
                                                    </a>
                                                    <a
                                                        href="https://wa.me/919495712853"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-800"
                                                    >
                                                        <MessageCircle className="w-3 h-3" /> WhatsApp
                                                    </a>
                                                    <a
                                                        href="mailto:hexastack78@gmail.com"
                                                        className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800"
                                                    >
                                                        <Mail className="w-3 h-3" /> Email
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-slate-900 text-white py-4 px-6 rounded-md hover:bg-slate-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="md:pl-8">
                            <div className="bg-slate-50 rounded-lg p-8">
                                <h2 className="text-lg font-semibold text-slate-900 mb-6">
                                    Contact Information
                                </h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-slate-500 mb-3">Phone</h3>
                                        <div className="space-y-2">
                                            <a
                                                href="tel:+919495712853"
                                                className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors"
                                            >
                                                <Phone className="w-4 h-4" />
                                                +91 94957 12853
                                            </a>
                                            <a
                                                href="tel:+917591999365"
                                                className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors"
                                            >
                                                <Phone className="w-4 h-4" />
                                                +91 75919 99365
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-slate-500 mb-3">WhatsApp</h3>
                                        <a
                                            href="https://wa.me/919495712853"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-green-600 hover:text-green-700 transition-colors"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            Chat on WhatsApp
                                        </a>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-slate-500 mb-3">Email</h3>
                                        <a
                                            href="mailto:hexastack78@gmail.com"
                                            className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors"
                                        >
                                            <Mail className="w-4 h-4" />
                                            hexastack78@gmail.com
                                        </a>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-slate-500 mb-3">Location</h3>
                                        <div className="flex items-start gap-3 text-slate-700">
                                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                            <span>Thrissur, Vatanappally, Kerala</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-200">
                                    <p className="text-sm text-slate-500 mb-1">
                                        We typically respond within 24 hours.
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        Working hours: Mon-Sat, 10AM-7PM IST
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-slate-900 text-white">
                <div className="max-w-5xl mx-auto text-center text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} HexaStack AI Solutions. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
