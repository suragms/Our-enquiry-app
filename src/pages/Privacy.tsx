import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

export default function Privacy() {
    return (
        <Layout>
            <SEO
                title="Privacy Policy | HEXASTACK SOLUTIONS"
                description="Privacy policy and data protection guidelines for HexaStack Solutions."
            />
            <div className="bg-[#0D0D0D] text-[#F5F5F5] font-sans antialiased min-h-screen py-20 md:py-32">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">Privacy Policy</h1>
                        <p className="text-[#A0A0A0] mb-12 text-sm tracking-wide uppercase">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

                        <div className="space-y-12 prose prose-invert max-w-none">
                            <section>
                                <h2 className="text-2xl font-medium tracking-tight mb-4 text-white">1. Introduction</h2>
                                <p className="text-[#A0A0A0] leading-relaxed">
                                    At HexaStack Solutions, we take your privacy and enterprise data security seriously. This Privacy Policy describes how we collect, use, process, and disclose your information, including personal data, in conjunction with your access to and use of our enterprise software, SaaS platforms (like HexaBill), and consulting services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-medium tracking-tight mb-4 text-white">2. Information We Collect</h2>
                                <p className="text-[#A0A0A0] leading-relaxed mb-4">
                                    We collect information you provide directly to us securely. This includes:
                                </p>
                                <ul className="list-disc pl-6 text-[#A0A0A0] space-y-2">
                                    <li><strong>Contact Information:</strong> Names, email addresses, phone numbers, and job titles provided via our consultation forms.</li>
                                    <li><strong>Business Data:</strong> Information regarding your company, operational requirements, and technical legacy systems required for architecture mapping.</li>
                                    <li><strong>Platform Usage Data:</strong> Anonymized interaction metrics gathered via strict, non-intrusive analytics to improve system performance.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-medium tracking-tight mb-4 text-white">3. How We Use Information</h2>
                                <p className="text-[#A0A0A0] leading-relaxed mb-4">
                                    The data we collect is strictly utilized to operate, maintain, and provide the features and functionality of the services to you. Specifically:
                                </p>
                                <ul className="list-disc pl-6 text-[#A0A0A0] space-y-2">
                                    <li>To configure, deploy, and maintain custom ERP and SaaS systems tailored to your business needs.</li>
                                    <li>To provide secure customer support and technical consultation.</li>
                                    <li>To analyze system performance and implement security upgrades.</li>
                                    <li>To communicate administrative notices or critical platform maintenance schedules.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-medium tracking-tight mb-4 text-white">4. Data Security & Encryption</h2>
                                <p className="text-[#A0A0A0] leading-relaxed">
                                    Enterprise data security is our foundational pillar. We implement highly sophisticated security measures, including HTTPS/TLS encryption for all data in transit and AES-256 for sensitive data at rest. Access to the database is stringently restricted through cloud-based authentication protocols, preventing unauthorized modification, loss, or misuse of your operational data.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-medium tracking-tight mb-4 text-white">5. Third-Party Integrations</h2>
                                <p className="text-[#A0A0A0] leading-relaxed">
                                    Our software ecosystem (including QuickCart and HexaBill) may integrate with specific third-party APIs (such as verified payment gateways or national tax portals like the GST network). Data shared with these processors is strictly limited to transactional requirements. We do not sell, rent, or trade your operational data to external marketing vendors under any circumstances.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-medium tracking-tight mb-4 text-white">6. Your Rights</h2>
                                <p className="text-[#A0A0A0] leading-relaxed">
                                    You have complete authority over your enterprise data. You have the right to request full export of your deployed data, demand deletion of archived records, or request clarification on specific API endpoints processing your information. Requests can be submitted directly through your active communication channel or via our primary contact desk.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-medium tracking-tight mb-4 text-white">7. Contact Us</h2>
                                <p className="text-[#A0A0A0] leading-relaxed">
                                    If you have any questions or concerns about this Privacy Policy, please contact our administrative team at hexastack78@gmail.com.
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
