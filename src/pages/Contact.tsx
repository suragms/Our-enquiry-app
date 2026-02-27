import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, CheckCircle, Clock } from 'lucide-react';
import { API_URL } from '@/lib/utils';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

interface CompanySettings {
    primaryEmail?: string;
    primaryWhatsApp?: string;
    secondaryWhatsApp?: string | null;
    address?: string | null;
}

const countryOptions = ['India', 'UAE', 'Saudi Arabia', 'Oman', 'Qatar', 'Kuwait', 'Bahrain', 'Other'];
const industryOptions = ['Retail & Wholesale', 'Healthcare', 'Logistics & Distribution', 'Restaurants & Hospitality', 'SMEs & Enterprises', 'Other'];
const serviceOptions = ['HexaBill', 'HexaCV', 'Hexa AI Tool Suite', 'Custom Software Development', 'ERP & Billing', 'AI Automation', 'Other'];
const budgetOptions = ['Under ₹1L', '₹1L – ₹5L', '₹5L – ₹20L', '₹20L+', 'To be discussed'];
const timelineOptions = ['ASAP', '1–3 months', '3–6 months', '6+ months', 'Exploring'];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        country: '',
        industry: '',
        serviceOrProduct: '',
        budget: '',
        timeline: '',
        requirement: '',
        numberOfBranches: '',
        currentSystem: '',
        website: '',
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [showWhatsApp, setShowWhatsApp] = useState(false);
    const [settings, setSettings] = useState<CompanySettings | null>(null);

    useEffect(() => {
        fetch(`${API_URL}/api/settings`)
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => data && setSettings(data))
            .catch(() => { });
    }, []);

    const primaryPhone = settings?.primaryWhatsApp || '+917591999365';
    const secondaryPhone = settings?.secondaryWhatsApp || '+917012714150';
    const email = settings?.primaryEmail || 'hexastack78@gmail.com';
    const address = settings?.address || 'Thrissur, Kerala';

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
                setError(data.error || data.message || 'Failed to submit');
                return;
            }
            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                companyName: '',
                country: '',
                industry: '',
                serviceOrProduct: '',
                budget: '',
                timeline: '',
                requirement: '',
                numberOfBranches: '',
                currentSystem: '',
                website: '',
            });
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const whatsappContacts = [
        { number: primaryPhone, label: 'Line 1' },
        ...(secondaryPhone ? [{ number: secondaryPhone, label: 'Line 2' }] : []),
    ];

    if (submitted) {
        return (
            <Layout>
                <SEO title="Message Received | HEXASTACK SOLUTIONS" description="Your inquiry has been logged. Our technical team will be in touch shortly." />
                <div className="bg-[#0D0D0D] text-[#F5F5F5] font-sans antialiased min-h-[80vh] flex items-center justify-center py-20 px-4 sm:px-6">
                    <div className="max-w-xl w-full text-center p-12 border border-[rgba(255,255,255,0.08)] rounded bg-[#111111]">
                        <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] flex items-center justify-center mx-auto mb-8">
                            <CheckCircle className="w-8 h-8 text-[#F5F5F5]" />
                        </div>
                        <h1 className="text-3xl font-medium tracking-tight mb-4 text-white">Message Received</h1>
                        <p className="text-[#A0A0A0] mb-8 leading-relaxed">Your project details have been securely logged. Our technical team will review your requirements and reach out within 24 hours.</p>
                        <div className="p-6 border border-[rgba(255,255,255,0.04)] bg-[#0A0A0A] rounded-2xl text-left mb-10">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className="w-4 h-4 text-[#A0A0A0]" />
                                <span className="text-xs font-semibold uppercase tracking-widest text-[#A0A0A0]">Next Steps</span>
                            </div>
                            <ul className="text-[#A0A0A0] space-y-3 text-sm">
                                <li className="flex gap-3"><span className="text-white">01 //</span> Requirement analysis</li>
                                <li className="flex gap-3"><span className="text-white">02 //</span> Technical viability assessment</li>
                                <li className="flex gap-3"><span className="text-white">03 //</span> Scope & Architecture proposal</li>
                            </ul>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href={`tel:${primaryPhone.replace(/\D/g, '')}`} className="flex items-center justify-center h-12 px-8 bg-[#111111] border border-[rgba(255,255,255,0.08)] text-white font-medium rounded-full hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                                Call Directly
                            </a>
                            <button onClick={() => setShowWhatsApp(true)} className="flex items-center justify-center h-12 px-8 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
                                WhatsApp Connect
                            </button>
                        </div>
                        <Link to="/" className="inline-block mt-10 text-sm font-medium tracking-wide text-[#A0A0A0] hover:text-white uppercase">← Back to Home</Link>
                    </div>
                </div>

                {showWhatsApp && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0D0D]/90 backdrop-blur-sm" onClick={() => setShowWhatsApp(false)}>
                        <div className="bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded p-8 max-w-sm w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-xl font-medium tracking-tight mb-6 text-[#F5F5F5]">Secure Line Routing</h3>
                            <div className="space-y-3">
                                {whatsappContacts.map((c) => (
                                    <a key={c.number} href={`https://wa.me/${c.number.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-[#141414] rounded border border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[#1A1A1A] transition-all">
                                        <span className="font-medium text-[#F5F5F5] tracking-wide text-sm">{c.label}</span>
                                        <span className="text-[#A0A0A0] font-mono text-xs">{c.number}</span>
                                    </a>
                                ))}
                            </div>
                            <button onClick={() => setShowWhatsApp(false)} className="mt-6 w-full py-3 text-sm tracking-widest uppercase font-medium text-[#A0A0A0] hover:text-[#F5F5F5] transition-colors">Abort</button>
                        </div>
                    </div>
                )}
            </Layout>
        );
    }

    const inputClass = "w-full min-h-[44px] bg-[#0A0A0A] px-3 py-2 border border-[rgba(255,255,255,0.08)] rounded-lg focus:outline-none focus:border-[rgba(255,255,255,0.3)] focus:bg-[#111111] text-white text-sm placeholder:text-[#666666] transition-all";
    const selectClass = inputClass + " appearance-none cursor-pointer";
    const labelClass = "block text-[10px] font-semibold uppercase tracking-widest text-[#A0A0A0] mb-1.5";

    return (
        <Layout>
            <SEO
                title="Contact | HEXASTACK SOLUTIONS"
                description="Let's build together. Enterprise-grade business software, ERP, and AI automation deployment."
                keywords="contact HexaStack Solutions, request consultation, enterprise software deployment"
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'ContactPage',
                    name: 'Contact HexaStack Solutions',
                    mainEntity: {
                        '@type': 'ContactPoint',
                        telephone: primaryPhone,
                        contactType: 'sales',
                        email,
                    },
                }}
            />
            <div className="bg-[#0D0D0D] text-white font-sans antialiased selection:bg-white selection:text-[#0D0D0D] flex-1 flex flex-col justify-center py-6 md:py-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">Let's Build Together</h1>
                            <p className="text-[#A0A0A0] text-sm leading-relaxed">
                                Tell us about your project or business needs, and our architecture team will respond within 24 hours.
                            </p>
                        </div>
                        <Link to="/" className="hidden md:inline-flex items-center gap-2 text-[#A0A0A0] hover:text-white text-xs font-semibold tracking-widest uppercase transition-colors shrink-0">← Back to Home</Link>
                    </div>

                    <div className="grid md:grid-cols-12 gap-6 lg:gap-10 items-start">
                        {/* FORM SECTION */}
                        <div className="md:col-span-8">
                            <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-5 sm:p-6 lg:p-8">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                                            <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label htmlFor="companyName" className={labelClass}>Company Name</label>
                                            <input type="text" id="companyName" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className={inputClass} placeholder="Acme Corp" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className={labelClass}>Email Address <span className="text-red-500">*</span></label>
                                            <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} placeholder="john@example.com" />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className={labelClass}>Phone Number</label>
                                            <input type="tel" id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} placeholder="Include country code" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[rgba(255,255,255,0.04)] pt-4 mt-4">
                                        <div>
                                            <label htmlFor="industry" className={labelClass}>Industry</label>
                                            <select id="industry" value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} className={selectClass}>
                                                <option value="" className="bg-[#141414]">Select...</option>
                                                {industryOptions.map((opt) => (
                                                    <option key={opt} value={opt} className="bg-[#141414]">{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="serviceOrProduct" className={labelClass}>Service Needed</label>
                                            <select id="serviceOrProduct" value={formData.serviceOrProduct} onChange={(e) => setFormData({ ...formData, serviceOrProduct: e.target.value })} className={selectClass}>
                                                <option value="" className="bg-[#141414]">Select...</option>
                                                {serviceOptions.map((opt) => (
                                                    <option key={opt} value={opt} className="bg-[#141414]">{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="budget" className={labelClass}>Budget</label>
                                            <select id="budget" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className={selectClass}>
                                                <option value="" className="bg-[#141414]">Select...</option>
                                                {budgetOptions.map((opt) => (
                                                    <option key={opt} value={opt} className="bg-[#141414]">{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                        <div>
                                            <label htmlFor="country" className={labelClass}>Region</label>
                                            <select id="country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className={selectClass}>
                                                <option value="" className="bg-[#141414]">Select...</option>
                                                {countryOptions.map((opt) => (
                                                    <option key={opt} value={opt} className="bg-[#141414]">{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="timeline" className={labelClass}>Timeline</label>
                                            <select id="timeline" value={formData.timeline} onChange={(e) => setFormData({ ...formData, timeline: e.target.value })} className={selectClass}>
                                                <option value="" className="bg-[#141414]">-</option>
                                                {timelineOptions.map((opt) => (
                                                    <option key={opt} value={opt} className="bg-[#141414]">{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="numberOfBranches" className={labelClass}>Branches</label>
                                            <input type="text" id="numberOfBranches" inputMode="numeric" value={formData.numberOfBranches} onChange={(e) => setFormData({ ...formData, numberOfBranches: e.target.value })} className={inputClass} placeholder="e.g. 10" />
                                        </div>
                                        <div>
                                            <label htmlFor="currentSystem" className={labelClass}>Legacy System</label>
                                            <input type="text" id="currentSystem" value={formData.currentSystem} onChange={(e) => setFormData({ ...formData, currentSystem: e.target.value })} className={inputClass} placeholder="e.g. Tally" />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="requirement" className={labelClass}>Project Description <span className="text-red-500">*</span></label>
                                        <textarea id="requirement" required rows={3} value={formData.requirement} onChange={(e) => setFormData({ ...formData, requirement: e.target.value })} className={inputClass + ' resize-none'} placeholder="Tell us about the features, problems you're trying to solve..." />
                                    </div>

                                    <input type="text" name="website" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" />

                                    {error && (
                                        <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-lg">
                                            <p className="text-sm font-medium text-red-500">Error: {error}</p>
                                        </div>
                                    )}

                                    <div className="pt-2">
                                        <button type="submit" disabled={loading} className="w-full h-12 bg-white text-black font-semibold rounded-full hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center gap-2 text-sm transition-colors tracking-wide">
                                            {loading ? 'Sending Message...' : 'Send Message'}
                                            {!loading && <ArrowRight className="w-4 h-4" />}
                                        </button>
                                        <p className="mt-2 text-center text-[10px] text-[#666666] tracking-wider uppercase">Your data is securely encrypted</p>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* INFO SECTION */}
                        <div className="md:col-span-4 flex flex-col justify-center">
                            <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-6 sm:p-8">
                                <h2 className="text-lg font-medium tracking-tight mb-6 text-white">Contact Information</h2>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#A0A0A0] mb-3">Direct Lines</p>
                                        <a href={`https://wa.me/${primaryPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-white hover:text-[#A0A0A0] mb-3 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)] flex items-center justify-center group-hover:border-[rgba(255,255,255,0.2)] transition-colors">
                                                <Phone className="w-3.5 h-3.5 text-[#A0A0A0]" />
                                            </div>
                                            <span className="font-medium tracking-wide text-sm">{primaryPhone}</span>
                                        </a>
                                        {secondaryPhone && (
                                            <a href={`https://wa.me/${secondaryPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-white hover:text-[#A0A0A0] mb-3 transition-colors">
                                                <div className="w-8 h-8 rounded-full bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)] flex items-center justify-center group-hover:border-[rgba(255,255,255,0.2)] transition-colors">
                                                    <Phone className="w-3.5 h-3.5 text-[#A0A0A0]" />
                                                </div>
                                                <span className="font-medium tracking-wide text-sm">{secondaryPhone}</span>
                                            </a>
                                        )}
                                        <a href={`mailto:${email}`} className="group flex items-center gap-3 text-white hover:text-[#A0A0A0] transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)] flex items-center justify-center group-hover:border-[rgba(255,255,255,0.2)] transition-colors">
                                                <Mail className="w-3.5 h-3.5 text-[#A0A0A0]" />
                                            </div>
                                            <span className="font-medium tracking-wide text-sm">{email}</span>
                                        </a>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#A0A0A0] mb-3">Headquarters</p>
                                        <div className="flex items-start gap-3 text-white">
                                            <div className="w-8 h-8 rounded-full bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)] flex items-center justify-center shrink-0">
                                                <MapPin className="w-3.5 h-3.5 text-[#A0A0A0]" />
                                            </div>
                                            <span className="leading-relaxed text-[#A0A0A0] mt-1 text-sm">
                                                {address}<br />
                                                Kerala, India
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.04)]">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-green-500">Available for New Projects</span>
                                    </div>
                                    <p className="text-[10px] text-[#666666] tracking-wide uppercase">Ready to scale your business operations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
