import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { API_URL } from '@/lib/utils';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        requirement: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit');
            }

            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', requirement: '' });
        } catch (err) {
            console.error('Failed to submit:', err);
            setError('Something went wrong. Please try again or contact us directly.');
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
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-semibold text-slate-900 mb-4">
                            Message Sent Successfully
                        </h1>
                        <p className="text-slate-500 mb-8">
                            Thank you for reaching out. We'll get back to you within 24 hours.
                        </p>
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

                                {error && (
                                    <p className="text-red-600 text-sm">{error}</p>
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
                                    <p className="text-sm text-slate-500">
                                        We typically respond within 24 hours.
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
