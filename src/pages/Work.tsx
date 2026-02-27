import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

export default function Work() {
    return (
        <Layout>
            <SEO
                title="Our Work | Portfolio | HEXASTACK SOLUTIONS"
                description="Real business challenges solved with structured digital solutions."
            />
            <div className="bg-[#0D0D0D] text-[#F5F5F5] font-sans antialiased selection:bg-[#F5F5F5] selection:text-[#0D0D0D]">

                {/* SECTION 1: HERO */}
                <section className="flex flex-col items-center justify-center text-center px-4 py-16 md:py-32 max-w-4xl mx-auto min-h-[50vh]">
                    <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-4">
                        Proven Systems. Measurable Results.
                    </h1>
                    <p className="text-[#A0A0A0] text-lg md:text-xl max-w-2xl leading-relaxed">
                        Real business challenges solved with structured digital solutions.
                    </p>
                </section>

                {/* SECTION 2: CASE STUDIES */}
                <section className="px-4 pb-16 md:pb-32 max-w-5xl mx-auto">
                    <div className="space-y-16 md:space-y-32">

                        {/* Case Study 1: ZAYOGA GENERAL TRADING */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 p-8 border border-[rgba(255,255,255,0.08)] rounded hover:bg-[#141414] transition-colors duration-300">
                            <div className="flex flex-col border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.08)] pb-8 md:pb-0 md:pr-16">
                                <h2 className="text-2xl font-bold tracking-tight mb-2 uppercase">ZAYOGA GENERAL TRADING</h2>
                                <p className="text-[#A0A0A0] text-sm md:text-base mb-1">Sole Proprietorship L.L.C</p>
                                <p className="text-[#A0A0A0] text-sm md:text-base mb-6">Abu Dhabi, UAE</p>
                                <span className="inline-block text-xs font-semibold tracking-widest text-[#F5F5F5] uppercase mt-2">Retail & Wholesale Distribution</span>

                                <div className="mt-auto hidden md:block pt-8">
                                    <h3 className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Platform Deployed:</h3>
                                    <p className="text-[#F5F5F5] font-medium">HexaBill — Business Management Software</p>
                                </div>
                            </div>

                            <div className="space-y-8 flex flex-col justify-center">
                                <div>
                                    <h3 className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Challenge</h3>
                                    <p className="text-[#F5F5F5] leading-relaxed line-clamp-2">Legacy billing and manual tracking processes limited scalability, requiring a robust digital foundation and safe legacy data onboarding.</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Solution</h3>
                                    <p className="text-[#F5F5F5] leading-relaxed line-clamp-3">Architected multi-tenant <strong>HexaBill SaaS</strong> featuring a 40+ table PostgreSQL schema, financial reconciliation logic, and Stripe subscriptions.</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider mb-3">Results</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Scaled structure to service 4 paying B2B clients at ~₹1.2 Cr/month volume.</span></li>
                                        <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Executed UAE legacy data migration — reverse-engineered billing schema.</span></li>
                                        <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Migrated 241 live invoices securely with automated validation and zero data loss.</span></li>
                                    </ul>
                                </div>

                                <div className="pt-2">
                                    <Link to="/products/hexabill" className="flex items-center justify-center h-12 w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] text-[#F5F5F5] font-medium rounded hover:bg-[#F5F5F5] hover:text-[#0D0D0D] transition-colors">
                                        View Implementation Details
                                    </Link>
                                </div>

                                <div className="md:hidden pt-4 mt-2 border-t border-[rgba(255,255,255,0.08)]">
                                    <h3 className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Platform Deployed:</h3>
                                    <p className="text-[#F5F5F5] font-medium text-sm">HexaBill — Business Management Software</p>
                                </div>
                            </div>

                        </div>

                        {/* Case Study 2: HEALit MEDICAL LAB MANAGEMENT */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 p-8 border border-[rgba(255,255,255,0.08)] rounded hover:bg-[#141414] transition-colors duration-300">
                            <div className="flex flex-col border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.08)] pb-8 md:pb-0 md:pr-16">
                                <h2 className="text-2xl font-bold tracking-tight mb-2 uppercase">HEALit MEDICAL LAB SYSTEM</h2>
                                <p className="text-[#A0A0A0] text-sm md:text-base mb-1">Thyrocare Lab</p>
                                <span className="inline-block text-xs font-semibold tracking-widest text-[#F5F5F5] uppercase mt-6">Healthcare Technology</span>
                            </div>
                            <div className="space-y-8 flex flex-col justify-center">
                                <div>
                                    <h3 className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Challenge</h3>
                                    <p className="text-[#F5F5F5] leading-relaxed line-clamp-2">Fragmented patient workflows and slow reporting turnarounds required a highly available system with robust multi-device synchronization.</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Solution</h3>
                                    <p className="text-[#F5F5F5] leading-relaxed line-clamp-3">Deployed <strong>HEALit Medical Lab Management System</strong> engineered with a resilient circuit breaker pattern for external integrations.</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider mb-3">Results</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Engineered 30+ comprehensive test profiles flawlessly synced across devices.</span></li>
                                        <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Automated and completely native secure PDF report generation.</span></li>
                                        <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Zero-delay instant WhatsApp and email result delivery system.</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Case Study 3: STARPLUS POS SYSTEM */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 p-8 border border-[rgba(255,255,255,0.08)] rounded hover:bg-[#141414] transition-colors duration-300">
                            <div className="flex flex-col border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.08)] pb-8 md:pb-0 md:pr-16">
                                <h2 className="text-2xl font-bold tracking-tight mb-2 uppercase">STARPLUS UAE POS SYSTEM</h2>
                                <p className="text-[#A0A0A0] text-sm md:text-base mb-1">Retail Billing Interface</p>
                                <span className="inline-block text-xs font-semibold tracking-widest text-[#F5F5F5] uppercase mt-6">Enterprise Operations</span>
                            </div>
                            <div className="space-y-8 flex flex-col justify-center">
                                <div>
                                    <h3 className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Challenge</h3>
                                    <p className="text-[#F5F5F5] leading-relaxed line-clamp-2">Scaling Gulf retail operations demanded a strict bilingual billing system that prioritizes high-volume performance with zero deployment downtime.</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Solution</h3>
                                    <p className="text-[#F5F5F5] leading-relaxed line-clamp-3">Engineered a cutting-edge engine using <strong>React 18</strong>, <strong>ASP.NET Core 9</strong>, and <strong>PostgreSQL</strong> deployed completely via Docker + GitHub Actions CI/CD.</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider mb-3">Results</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Guaranteed 5% VAT compliance designed natively for UAE retail.</span></li>
                                        <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">Seamless bilingual (English / Arabic) localized user experience.</span></li>
                                        <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 bg-[#F5F5F5] rounded-full mt-2.5 shrink-0"></span> <span className="text-[#F5F5F5] text-sm">100% client satisfaction achieved with rigorous automated pipelines.</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* SECTION 3: TECHNICAL CAPABILITIES STRIP */}
                <section className="px-4 py-12 md:py-16 border-t border-b border-[rgba(255,255,255,0.08)] bg-[#0D0D0D]">
                    <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-6 gap-y-4 text-sm md:text-base text-[#A0A0A0] tracking-wide">
                        <span>Multi-tenant SaaS Architecture</span>
                        <span className="hidden sm:inline-block w-1 h-1 bg-[rgba(255,255,255,0.2)] rounded-full"></span>
                        <span>Secure JWT Authentication</span>
                        <span className="hidden md:inline-block w-1 h-1 bg-[rgba(255,255,255,0.2)] rounded-full"></span>
                        <span>Audit Logging</span>
                        <span className="hidden lg:inline-block w-1 h-1 bg-[rgba(255,255,255,0.2)] rounded-full"></span>
                        <span>Role-Based Permissions</span>
                        <span className="hidden xl:inline-block w-1 h-1 bg-[rgba(255,255,255,0.2)] rounded-full"></span>
                        <span>Cloud Deployment</span>
                    </div>
                </section>

                {/* SECTION 4: FINAL CTA */}
                <section className="px-4 py-16 md:py-32 text-center">
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
                        Let’s Build Your Next System.
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
