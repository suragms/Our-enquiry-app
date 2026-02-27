import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Calculator, Bot, Cloud, Layout as LayoutIcon, BarChart3 } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { API_URL } from '@/lib/utils';
import { motion } from 'framer-motion';

const serviceIcons = [Code2, Calculator, Bot, Cloud, LayoutIcon, BarChart3];

export default function Services() {
    const [services, setServices] = useState<{ id: string; name: string; description: string; icon: string; link?: string; isComingSoon: boolean }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/api/services`)
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => setServices(Array.isArray(data) ? data : []))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const activeServices = services.filter(s => !s.isComingSoon);

    return (
        <Layout>
            <SEO
                title="Services | HEXASTACK SOLUTIONS"
                description="Custom ERP, SaaS platforms, and automation systems built for modern businesses across India and the Gulf."
            />
            <div className="bg-[#0D0D0D] text-[#F5F5F5] font-sans antialiased selection:bg-[#F5F5F5] selection:text-[#0D0D0D]">

                {/* SECTION 1: HERO */}
                <section className="flex flex-col items-center justify-center text-center px-4 py-16 md:py-32 max-w-4xl mx-auto min-h-[70vh]">
                    <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-4">
                        Engineering Digital Systems That Scale With You.
                    </h1>
                    <p className="text-[#A0A0A0] text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
                        Custom ERP, SaaS platforms, and automation systems built for modern businesses across India and the Gulf.
                    </p>
                    <div className="flex flex-col w-full md:w-auto md:flex-row gap-2 md:gap-4">
                        <Link to="/contact" className="flex items-center justify-center h-12 w-full md:w-auto px-8 bg-[#F5F5F5] text-[#0D0D0D] font-medium rounded hover:bg-white transition-colors">
                            Book Consultation
                        </Link>
                        <Link to="/work" className="flex items-center justify-center h-12 w-full md:w-auto px-8 bg-transparent border border-[rgba(255,255,255,0.08)] text-[#F5F5F5] font-medium rounded hover:bg-[#141414] transition-colors">
                            View Work
                        </Link>
                    </div>
                </section>

                {/* SECTION 2: CORE SERVICES */}
                <section className="px-4 py-16 md:py-32 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.08)]">
                    <div className="mb-12 md:mb-16">
                        <h2 className="text-3xl font-medium tracking-tight mb-4">Core Competencies</h2>
                        <p className="text-[#A0A0A0] text-lg max-w-2xl">
                            Precision-engineered tech stacks designed to handle high transaction volumes and complex workflows securely.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            Array(6).fill(0).map((_, i) => (
                                <div key={i} className="h-48 rounded bg-[#111111] border border-[rgba(255,255,255,0.08)] animate-pulse" />
                            ))
                        ) : activeServices.length > 0 ? (
                            activeServices.map((service, i) => {
                                const Icon = serviceIcons[i % serviceIcons.length];
                                return (
                                    <motion.article
                                        key={service.id || i}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="p-8 border border-[rgba(255,255,255,0.08)] rounded bg-[#0A0A0A] hover:bg-[#141414] hover:border-[rgba(255,255,255,0.15)] transition-all duration-300 flex flex-col items-start"
                                    >
                                        {service.icon && typeof service.icon === 'string' && !service.icon.startsWith('/') ? (
                                            <img src={service.icon} alt={service.name} className="w-8 h-8 rounded mb-6 opacity-90 object-contain" />
                                        ) : Icon ? (
                                            <Icon className="w-8 h-8 text-white mb-6 opacity-80" strokeWidth={1.5} />
                                        ) : null}

                                        <h3 className="text-xl font-medium mb-3 text-white">{service.name}</h3>
                                        <p className="text-[#A0A0A0] leading-relaxed flex-1">
                                            {service.description || "Deploying robust enterprise solutions tailored to high-scale operations."}
                                        </p>
                                    </motion.article>
                                );
                            })
                        ) : (
                            <div className="col-span-1 border border-[rgba(255,255,255,0.08)] rounded p-8 text-[#A0A0A0]">
                                No active services found. Check your database.
                            </div>
                        )}
                    </div>
                </section>

                {/* SECTION 3: READY-TO-DEPLOY PLATFORMS */}
                <section className="px-4 pb-16 md:pb-32 max-w-7xl mx-auto">
                    <div className="mb-8 md:mb-16">
                        <h2 className="text-3xl font-medium tracking-tight mb-4">Platforms Ready to Customize</h2>
                        <p className="text-[#A0A0A0] text-lg max-w-2xl">
                            Pre-architected platforms that act as a foundation for your specific business requirements, accelerating deployment timelines.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 p-8 border border-[rgba(255,255,255,0.08)] rounded hover:bg-[#141414] transition-colors duration-300 mb-8">
                        <div className="flex flex-col border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.08)] pb-8 md:pb-0 md:pr-16">
                            <h3 className="text-2xl font-bold tracking-tight mb-2 uppercase">Online Shopping App (QuickCart)</h3>
                            <span className="inline-block text-xs font-semibold tracking-widest text-[#F5F5F5] uppercase mt-2">E-Commerce Architecture</span>

                            <div className="mt-auto hidden md:block pt-8">
                                <h4 className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Stack & Infrastructure:</h4>
                                <p className="text-[#F5F5F5] font-medium text-sm">React 19, TypeScript, Recharts, DB</p>
                            </div>
                        </div>

                        <div className="space-y-8 flex flex-col justify-center">
                            <div>
                                <h4 className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider mb-3">Core Capabilities</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Developed multi-role e-commerce platform (Customer/Admin/Staff) with marketing campaign analytics dashboard.</span></li>
                                    <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Implemented dynamic brand customization using CSS variables and advanced filtering/search modules.</span></li>
                                    <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Foundation ready to be customized strictly based on the company's requirements.</span></li>
                                </ul>
                            </div>

                            <div className="md:hidden pt-4 mt-2 border-t border-[rgba(255,255,255,0.08)]">
                                <h4 className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Stack & Infrastructure:</h4>
                                <p className="text-[#F5F5F5] font-medium text-sm">React 19, TypeScript, Recharts, DB</p>
                            </div>
                        </div>
                    </div>

                    {/* HexaBill Integration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 p-8 border border-[rgba(255,255,255,0.08)] rounded hover:bg-[#141414] transition-colors duration-300">
                        <div className="flex flex-col border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.08)] pb-8 md:pb-0 md:pr-16">
                            <h3 className="text-2xl font-bold tracking-tight mb-2 uppercase">HexaBill</h3>
                            <span className="inline-block text-xs font-semibold tracking-widest text-[#F5F5F5] uppercase mt-2">Enterprise Billing & ERP Software</span>

                            <div className="mt-auto hidden md:block pt-8">
                                <h4 className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Stack & Infrastructure:</h4>
                                <p className="text-[#F5F5F5] font-medium text-sm">React, Node.js, Cloud DB Architecture, Secure Auth</p>
                            </div>
                        </div>

                        <div className="space-y-8 flex flex-col justify-center">
                            <div>
                                <h4 className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider mb-3">Core Capabilities</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">GST & Tax Compliant Invoicing system with automated complex taxation handling.</span></li>
                                    <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Advanced Inventory Management, real-time stock tracking, and automated low-stock threshold alerts.</span></li>
                                    <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Comprehensive Finance Ledgers keeping track of Supplier payments and Customer credit autonomously.</span></li>
                                    <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Deep Analytical Dashboard generating custom date-range sales reports and profit statistics.</span></li>
                                </ul>
                            </div>

                            <div className="md:hidden pt-4 mt-2 border-t border-[rgba(255,255,255,0.08)]">
                                <h4 className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Stack & Infrastructure:</h4>
                                <p className="text-[#F5F5F5] font-medium text-sm">React, Node.js, Cloud DB Architecture, Secure Auth</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: INDUSTRIES */}
                <section className="px-4 pb-16 md:pb-32 max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
                    {['Retail & Wholesale', 'Healthcare', 'Logistics', 'Restaurants', 'SMEs & Enterprises'].map((ind) => (
                        <span key={ind} className="h-12 px-6 flex items-center justify-center border border-[rgba(255,255,255,0.08)] rounded-full text-[#A0A0A0] text-sm md:text-base tracking-wide whitespace-nowrap">
                            {ind}
                        </span>
                    ))}
                </section>

                {/* SECTION 5: WHY HEXASTACK */}
                <section className="px-4 py-16 md:py-32 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.08)]">
                    <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4 md:sticky md:top-32 text-[#F5F5F5]">
                                We engineer structured digital foundations — not temporary fixes.
                            </h2>
                        </div>
                        <div className="md:w-1/2 flex flex-col justify-center">
                            <ul className="space-y-6 text-lg text-[#F5F5F5]">
                                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-[#A0A0A0] rounded-full"></span> Multi-tenant SaaS expertise</li>
                                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-[#A0A0A0] rounded-full"></span> Route-based ERP systems</li>
                                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-[#A0A0A0] rounded-full"></span> VAT-ready infrastructure</li>
                                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-[#A0A0A0] rounded-full"></span> Secure role-based access</li>
                                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-[#A0A0A0] rounded-full"></span> Long-term technical support</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* SECTION 6: CTA */}
                <section className="bg-[#111111] px-4 py-16 md:py-32 text-center border-t border-[rgba(255,255,255,0.08)]">
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8 text-[#F5F5F5]">
                        Let’s Build Better Systems.
                    </h2>
                    <div className="flex justify-center flex-col md:flex-row">
                        <Link to="/contact" className="flex items-center justify-center h-12 w-full md:w-auto px-12 bg-[#F5F5F5] text-[#0D0D0D] font-medium rounded hover:bg-white transition-colors">
                            Book Consultation
                        </Link>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
