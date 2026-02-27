import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

export default function Terms() {
    return (
        <Layout>
            <SEO
                title="Terms of Service | HEXASTACK SOLUTIONS"
                description="Terms, conditions, and service agreements for HexaStack Solutions."
            />
            <div className="bg-[#0D0D0D] text-[#F5F5F5] font-sans antialiased min-h-screen py-20 md:py-32">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">Terms of Service</h1>
                        <p className="text-[#A0A0A0] mb-12 text-sm tracking-wide uppercase">Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

                        <div className="space-y-12 prose prose-invert max-w-none">
                            <section>
                                <h2 className="text-2xl font-medium tracking-tight mb-4 text-white">1. Agreement to Terms</h2>
                                <p className="text-[#A0A0A0] leading-relaxed">
                                    These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you," "Client"), and HexaStack Solutions ("we," "us," or "our"), concerning your access to and use of our deployed enterprise software, platforms, and technical consulting services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-medium tracking-tight mb-4 text-white">2. Enterprise Software Licenses (SaaS & Custom Deliverables)</h2>
                                <h3 className="text-lg font-medium text-white mb-2 mt-6">2.1 Custom Engineering</h3>
                                <p className="text-[#A0A0A0] leading-relaxed">
                                    For fully custom architectures, intellectual property rights to the final application layer are strictly transferred upon full clearance of all developmental invoices, unless otherwise stated via a secondary contract. HexaStack retains ownership of internal foundational boilerplates, proprietary components, and libraries.
                                </p>
                                <h3 className="text-lg font-medium text-white mb-2 mt-8">2.2 SaaS Subscriptions (e.g., HexaBill)</h3>
                                <p className="text-[#A0A0A0] leading-relaxed">
                                    Access to HexaBill or similar subscription-based Software-as-a-Service is provided on a non-exclusive, non-transferable, revocable license strictly for your internal business operations. No source-code ownership is granted under SaaS models.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-medium tracking-tight mb-4 text-white">3. System Usage & Restrictions</h2>
                                <p className="text-[#A0A0A0] leading-relaxed mb-4">
                                    You represent, warrant, and agree that you will not use any provided platform to:
                                </p>
                                <ul className="list-disc pl-6 text-[#A0A0A0] space-y-2">
                                    <li>Reverse engineer, decompile, or attempt to extract source code from compiled SaaS platforms.</li>
                                    <li>Interfere with, disrupt, or bypass the security or performance of our cloud infrastructure.</li>
                                    <li>Process illegal transactions or utilize the platforms for criminal enterprises.</li>
                                    <li>Resell or lease access to HexaStack-owned platforms without formal White-Label authorization.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-medium tracking-tight mb-4 text-white">4. Deployments and Maintenance</h2>
                                <p className="text-[#A0A0A0] leading-relaxed">
                                    HexaStack Solutions strives for 99.9% uptime for cloud deployments. However, the systems are provided "as-is", and scheduled maintenance or emergency security patching may result in strictly monitored, minimal downtime. We will not be liable for revenue losses attributed directly to infrastructure interruptions unless enforced via a discrete enterprise SLA (Service Level Agreement).
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-medium tracking-tight mb-4 text-white">5. Payments and Billing</h2>
                                <p className="text-[#A0A0A0] leading-relaxed">
                                    All invoices for consulting phases, development milestones, and SaaS subscriptions are due effectively upon receipt or as structured in the formal Statement of Work (SOW). HexaStack reserves the right to suspend platform access, API connections, and database read/write queries instantly if account balances remain perpetually past due.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-medium tracking-tight mb-4 text-white">6. Refund and Return Policy</h2>
                                <h3 className="text-lg font-medium text-white mb-2 mt-6">6.1 SaaS Subscriptions & Digital Products</h3>
                                <p className="text-[#A0A0A0] leading-relaxed">
                                    Due to the immediate access to digital infrastructure and intellectual property granted upon purchase, all sales of Software-as-a-Service subscriptions (including HexaBill), digital modules, and pre-built platforms are strictly <strong>non-refundable and non-returnable</strong> under any circumstances. We highly encourage clients to thoroughly evaluate demonstrations or trial periods prior to executing a final purchase.
                                </p>
                                <h3 className="text-lg font-medium text-white mb-2 mt-8">6.2 Custom Engineering Engagements</h3>
                                <p className="text-[#A0A0A0] leading-relaxed">
                                    Payments made for custom development milestones, deployment phases, or hourly technical consulting are compensating labor output and are inherently <strong>non-refundable</strong>. If a project is terminated prematurely by the client, they forfeit access to any incomplete source code unless previously cleared invoices cover specific feature deliverables.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-medium tracking-tight mb-4 text-white">7. Limitation of Liability</h2>
                                <p className="text-[#A0A0A0] leading-relaxed">
                                    IN NO EVENT WILL HEXASTACK SOLUTIONS, ITS DIRECTORS, OR EMPLOYEES BE LIABLE FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, INCIDENTAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST DATA, OR BUSINESS DISRUPTION, ARISING FROM YOUR USE OF OUR SOFTWARE OR SERVICES.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-medium tracking-tight mb-4 text-white">8. Governing Law</h2>
                                <p className="text-[#A0A0A0] leading-relaxed">
                                    These Terms shall be governed by and constructed in accordance with the laws of India, specifically within the jurisdiction of Kerala operations, without regard to conflict of law principles.
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
