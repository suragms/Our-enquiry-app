import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Phone, Mail, MapPin, CheckCircle, Clock } from 'lucide-react';
import { API_URL } from '@/lib/utils';
import SEO from '@/components/SEO';

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
    const [showWhatsApp, setShowWhatsApp] = useState(false);

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
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || 'Failed to submit');
                return;
            }
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', requirement: '', website: '' });
        } catch (err) {
            console.error('Failed to submit:', err);
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-black selection:text-white">
                <SEO
                    title="Message Sent | Hexastack AI Solutions"
                    description="Thank you for reaching out to Hexastack AI Solutions. We will get back to you within 24 hours regarding your custom software enquiry."
                    keywords="software inquiry success, contact hexastack, software consultation kerala"
                />
                <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-neutral-100">
                    <div className="max-w-6xl mx-auto px-8">
                        <div className="flex justify-between items-center h-20">
                            <Link to="/" className="text-2xl font-bold text-black tracking-tighter">Hexastack<span className="text-neutral-300"> AI Solutions.</span></Link>
                        </div>
                    </div>
                </nav>

                <div className="pt-32 pb-20 px-8">
                    <div className="max-w-lg mx-auto">
                        <div className="bg-white rounded-[3rem] border border-neutral-100 p-12 text-center shadow-2xl">
                            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-8">
                                <CheckCircle className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold text-black mb-4 tracking-tighter">Message Received</h1>
                            <p className="text-lg text-neutral-500 mb-2">Thanks for reaching out.</p>
                            <p className="text-neutral-400 mb-10">We'll get back to you <strong className="text-black">within 24 hours</strong>.</p>

                            <div className="bg-neutral-50 rounded-2xl p-8 mb-10 text-left border border-neutral-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <Clock className="w-5 h-5 text-black" />
                                    <span className="font-bold text-black uppercase text-xs tracking-widest">Next Steps</span>
                                </div>
                                <ul className="text-neutral-500 space-y-3 font-medium">
                                    <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-black rounded-full mt-2" />Reviewing requirements</li>
                                    <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-black rounded-full mt-2" />Technical consultation</li>
                                    <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-black rounded-full mt-2" />Proposal generation</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-8 mb-10 border border-neutral-100">
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-6">Urgent Support</p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href="tel:+917012714150" className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-black text-white rounded-full hover:bg-neutral-800 transition-all font-bold active:scale-95">
                                        Call Us
                                    </a>
                                    <button
                                        onClick={() => setShowWhatsApp(true)}
                                        className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-white text-black border border-neutral-100 rounded-full hover:bg-neutral-50 transition-all font-bold active:scale-95"
                                    >
                                        WhatsApp
                                    </button>
                                </div>
                            </div>

                            <Link to="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-black transition-colors font-bold uppercase text-[10px] tracking-widest">
                                <ArrowLeft className="w-4 h-4" /> Back to home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-black selection:text-white">
            <SEO
                title="Contact Us | Hire Software Developers in Kerala | Hexastack"
                description="Get in touch with Hexastack AI Solutions for free technical consultations, project enquiries, and specialized software solutions. We respond within 24 hours."
                keywords="contact hexastack, software consultation Kerala, hire developers Thrissur, project enquiry software, business automation help, custom coding services, tech support for businesses, software development quote India, AI consultation enquiry"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": "Contact Hexastack AI Solutions",
                    "description": "Start your digital transformation journey with Hexastack.",
                    "mainEntity": {
                        "@type": "ContactPoint",
                        "telephone": "+91-70127-14150",
                        "contactType": "sales",
                        "email": "hexastack78@gmail.com"
                    }
                }}
            />
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-neutral-100">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link to="/" className="text-2xl font-bold text-black tracking-tighter">HexaStack<span className="text-neutral-300">.</span></Link>
                        <div className="hidden md:flex items-center gap-10">
                            <Link to="/" className="text-sm font-bold text-neutral-400 hover:text-black transition-colors uppercase tracking-widest">Home</Link>
                            <Link to="/work" className="text-sm font-bold text-neutral-400 hover:text-black transition-colors uppercase tracking-widest">Work</Link>
                            <span className="text-sm font-bold text-black uppercase tracking-widest border-b border-black">Contact</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <section className="pt-40 pb-16 px-8">
                <div className="max-w-4xl mx-auto">
                    <Link to="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-black mb-12 transition-colors font-bold uppercase text-[10px] tracking-widest">
                        <ArrowLeft className="w-3 h-3" /> Back to home
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-bold text-black mb-8 tracking-tighter">
                        Let's build.
                    </h1>
                    <p className="text-xl text-neutral-500 max-w-xl leading-relaxed">
                        Tell us about your current process. We respond with technical insights within 24 hours.
                    </p>
                </div>
            </section>

            {/* Form & Info */}
            <section className="py-12 px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-5 gap-10">
                        {/* Form */}
                        <div className="md:col-span-3">
                            <div className="bg-white rounded-3xl border border-neutral-100 p-10 shadow-sm">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div>
                                        <label htmlFor="name" className="block text-[10px] font-bold text-black uppercase tracking-[0.2em] mb-4">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-neutral-50 px-6 py-5 border border-neutral-100 rounded-2xl focus:outline-none focus:border-black text-black text-lg transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-[10px] font-bold text-black uppercase tracking-[0.2em] mb-4">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-neutral-50 px-6 py-5 border border-neutral-100 rounded-2xl focus:outline-none focus:border-black text-black text-lg transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="requirement" className="block text-[10px] font-bold text-black uppercase tracking-[0.2em] mb-4">Project Scope</label>
                                        <textarea
                                            id="requirement"
                                            required
                                            rows={6}
                                            value={formData.requirement}
                                            onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                                            className="w-full bg-neutral-50 px-6 py-5 border border-neutral-100 rounded-2xl focus:outline-none focus:border-black text-black text-lg resize-none transition-all"
                                            placeholder="Describe your requirements..."
                                        />
                                    </div>

                                    {error && (
                                        <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-6">
                                            <p className="text-black font-bold text-sm">{error}</p>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-black text-white py-6 rounded-full hover:bg-neutral-800 transition-all text-lg font-bold disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
                                    >
                                        {loading ? 'Processing...' : 'Send Message'}
                                        {!loading && <ArrowRight className="w-5 h-5" />}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-3xl border border-neutral-100 p-10 sticky top-28">
                                <h2 className="text-xl font-bold text-black mb-10 tracking-tight">Information</h2>

                                <div className="space-y-10">
                                    <div>
                                        <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">Direct</h3>
                                        <div className="space-y-4">
                                            <a href="https://wa.me/917012714150" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-black font-bold transition-colors">
                                                <Phone className="w-4 h-4" /> +91 70127 14150
                                            </a>
                                            <a href="https://wa.me/917591999365" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-black font-bold transition-colors">
                                                <Phone className="w-4 h-4" /> +91 75919 99365
                                            </a>
                                            <a href="mailto:hexastack78@gmail.com" className="flex items-center gap-4 text-black font-bold transition-colors">
                                                <Mail className="w-4 h-4" /> hexastack78@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">Base</h3>
                                        <div className="flex items-start gap-4 text-black font-bold">
                                            <MapPin className="w-4 h-4 mt-1" /> Thrissur, Kerala
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 pt-8 border-t border-neutral-100">
                                    <p className="text-black font-bold mb-1 uppercase text-[10px] tracking-widest">Availability</p>
                                    <p className="text-sm text-neutral-400">Response within 24 hours.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 px-8 border-t border-neutral-100">
                <div className="max-w-4xl mx-auto text-center text-neutral-400 font-bold uppercase text-[10px] tracking-widest">
                    © {new Date().getFullYear()} Hexastack AI Solutions.
                </div>
            </footer>
            {/* WhatsApp Selector Modal */}
            {showWhatsApp && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setShowWhatsApp(false)}>
                    <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-black tracking-tight">Contact Us</h3>
                            </div>
                            <button onClick={() => setShowWhatsApp(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                                <ArrowRight className="w-5 h-5 rotate-180 text-black" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {[
                                { number: "+91 70127 14150", label: "Line 1", desc: "Consultation, Enquiry & Support" },
                                { number: "+91 75919 99365", label: "Line 2", desc: "Consultation, Enquiry & Support" }
                            ].map((contact, i) => (
                                <a
                                    key={i}
                                    href={`https://wa.me/${contact.number.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-6 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-black transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">{contact.label}</p>
                                            <p className="text-lg font-bold text-black tracking-tight mb-0.5">{contact.number}</p>
                                            <p className="text-[10px] font-medium text-neutral-400">{contact.desc}</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
