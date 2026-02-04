import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, Share2, Copy, Check, QrCode, Zap, Shield, Rocket, Activity, ShoppingCart, Dna, Truck, Package } from 'lucide-react';
import { SITE_URL, API_URL } from '@/lib/utils';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [copied, setCopied] = useState(false);
    const [services, setServices] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [showWhatsApp, setShowWhatsApp] = useState(false);

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(SITE_URL)}`;

    useEffect(() => {
        fetchServices();
        fetchProducts();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch(`${API_URL}/api/services`);
            if (response.ok) {
                const data = await response.json();
                setServices(data);
            }
        } catch (error) {
            console.error('Failed to fetch services:', error);
        } finally {
            setLoadingServices(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_URL}/api/products`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoadingProducts(false);
        }
    };

    const copyLink = () => {
        navigator.clipboard.writeText(SITE_URL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-black selection:text-white">
            <SEO
                title="Hexastack AI Solutions | Custom Software & AI Automation in Kerala"
                description="Hexastack AI Solutions builds high-performance internal tools, custom POS systems, healthcare software, and AI-driven automation for global businesses. Located in Thrissur, Kerala."
                keywords="AI software development Kerala, custom POS system Thrissur, healthcare software developers India, business automation experts, internal tools development, Hexastack AI, retail automation solutions, medical lab management software, process automation company, software engineering Thrissur, custom ERP development, AI integration for business, scalable digital systems, software consultancy Kerala, tech startup Kerala, innovative software solutions"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Hexastack AI Solutions",
                    "url": "https://hexastack.in",
                    "logo": "https://hexastack.in/hexastackbrand.png",
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+91-70127-14150",
                        "contactType": "customer service",
                        "areaServed": "Global",
                        "availableLanguage": "English"
                    },
                    "sameAs": [
                        "https://twitter.com/hexastack",
                        "https://linkedin.com/company/hexastack",
                        "https://github.com/hexastack"
                    ]
                }}
            />
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-neutral-100">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="text-xl font-bold text-black tracking-tighter">Hexastack<span className="text-neutral-400"> AI Solutions.</span></Link>
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#services" className="text-sm font-medium text-neutral-500 hover:text-black transition-colors">Services</a>
                            <a href="#products" className="text-sm font-medium text-neutral-500 hover:text-black transition-colors">Products</a>
                            <a href="#work" className="text-sm font-medium text-neutral-500 hover:text-black transition-colors">Work</a>
                            <a href="#process" className="text-sm font-medium text-neutral-500 hover:text-black transition-colors">Process</a>
                            <Link to="/contact" className="text-sm font-bold bg-black text-white px-6 py-2.5 rounded-full hover:bg-neutral-800 transition-all active:scale-95">
                                Get in touch
                            </Link>
                        </div>
                        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <div className="w-6 h-5 flex flex-col justify-between">
                                <span className={`h-0.5 w-full bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <span className={`h-0.5 w-full bg-black transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`h-0.5 w-full bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden bg-white border-t border-neutral-100 px-6 py-6 space-y-4 shadow-xl"
                    >
                        <a href="#services" className="block text-lg font-medium text-neutral-600" onClick={() => setIsMenuOpen(false)}>Services</a>
                        <a href="#products" className="block text-lg font-medium text-neutral-600" onClick={() => setIsMenuOpen(false)}>Products</a>
                        <a href="#work" className="block text-lg font-medium text-neutral-600" onClick={() => setIsMenuOpen(false)}>Work</a>
                        <a href="#process" className="block text-lg font-medium text-neutral-600" onClick={() => setIsMenuOpen(false)}>Process</a>
                        <Link to="/contact" className="block bg-black text-white px-6 py-4 rounded-xl font-bold text-center active:scale-95 transition-transform" onClick={() => setIsMenuOpen(false)}>Get in touch</Link>
                    </motion.div>
                )}
            </nav>

            {/* Premium Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-2xl"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-20"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                                </span>
                                <span className="text-[10px] font-bold text-black uppercase tracking-widest leading-none py-0.5">Reliable Digital Systems</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold text-black leading-[1.05] mb-8 tracking-tighter">
                                Scale with <br />
                                <span className="text-neutral-400">better systems.</span>
                            </h1>

                            <p className="text-lg md:text-xl text-neutral-500 leading-relaxed mb-12 max-w-lg">
                                We replace manual work with custom internal tools and automation that give you room to breathe and grow.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-full hover:bg-neutral-800 transition-all hover:shadow-2xl active:scale-95 font-bold group">
                                    Start your project
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <a href="#work" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black border border-neutral-200 px-8 py-4 rounded-full hover:bg-neutral-50 transition-all font-bold active:scale-95">
                                    View our work
                                </a>
                            </div>

                            {/* Trust Indicators */}
                            <div className="mt-16 pt-8 border-t border-neutral-100 flex flex-wrap gap-8 items-center opacity-40">
                                <div className="flex items-center gap-2">
                                    <Zap className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Efficiency first</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Built to last</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative z-10 rounded-3xl overflow-hidden border border-neutral-100 grayscale hover:grayscale-0 transition-all duration-1000">
                                <img
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3"
                                    alt="Digital System Interface"
                                    className="w-full aspect-[4/3] object-cover scale-105"
                                />
                                <div className="absolute inset-0 bg-black/5" />

                                {/* Overlay Glass Cards */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1, duration: 1 }}
                                    className="absolute bottom-8 left-8 p-6 bg-white shadow-2xl rounded-2xl border border-neutral-100 min-w-[200px]"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-black rounded-lg">
                                            <Rocket className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="text-[10px] font-bold text-black uppercase tracking-widest">Efficiency</div>
                                    </div>
                                    <div className="text-3xl font-bold text-black tracking-tighter">+140%</div>
                                    <div className="text-[10px] text-neutral-400 font-bold uppercase mt-1">Monthly Peak</div>
                                </motion.div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-12 -right-12 w-64 h-64 bg-neutral-100 rounded-full -z-10 blur-3xl opacity-50" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-black font-bold text-xs uppercase tracking-[0.3em] mb-4">Our Services</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-black leading-[1.1] tracking-tighter">
                                Digital excellence for your operational scale.
                            </h3>
                        </div>
                        <p className="text-neutral-500 max-w-sm text-lg leading-relaxed">
                            Bridging the gap between complex tech and daily business operations.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {loadingServices ? (
                            Array(4).fill(0).map((_, i) => (
                                <div key={i} className="h-80 rounded-[2rem] bg-slate-100 animate-pulse border border-slate-200" />
                            ))
                        ) : services.length > 0 ? (
                            services.map((service, i) => (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group bg-white rounded-3xl overflow-hidden border border-neutral-100 hover:border-black transition-all duration-500 flex flex-col h-full"
                                >
                                    <div className="relative h-56 overflow-hidden bg-neutral-50 flex items-center justify-center p-8">
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-neutral-100" />
                                        <div className="relative w-24 h-24 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-105 transition-all duration-500 border border-neutral-100 p-4">
                                            <img src={service.icon} alt={service.name} className="w-full h-full object-contain grayscale" />
                                        </div>
                                        {service.isComingSoon && (
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-black text-white uppercase tracking-widest">
                                                    Soon
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8 flex flex-col flex-1">
                                        <h4 className="text-xl font-bold text-black mb-3 tracking-tight">{service.name}</h4>
                                        <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                                            {service.isComingSoon
                                                ? "Perfecting this solution to meet our standards of excellence."
                                                : "Professional digital solutions tailored for your business growth."}
                                        </p>
                                        <div className="mt-auto pt-6 border-t border-neutral-50 flex items-center justify-between">
                                            {service.link ? (
                                                <Link to={service.link} className="inline-flex items-center gap-2 text-[10px] font-bold text-black hover:text-neutral-500 transition-colors uppercase tracking-[0.2em]">
                                                    Learn more <ArrowRight className="w-3 h-3" />
                                                </Link>
                                            ) : (
                                                <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">
                                                    {service.isComingSoon ? "In Development" : "Service Module"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            /* Fallback Premium Cards with 'Coming Soon' aesthetic if empty */
                            [
                                { title: "Custom ERP", icon: Zap, tag: "Automation" },
                                { title: "AI Integration", icon: Activity, tag: "Intelligence" },
                                { title: "Cloud Scale", icon: Rocket, tag: "Infrastructure" },
                                { title: "Cyber Security", icon: Shield, tag: "Protection" }
                            ].map((service, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group bg-neutral-50 rounded-3xl overflow-hidden border border-neutral-100 transition-all duration-500 flex flex-col h-full"
                                >
                                    <div className="relative h-48 overflow-hidden bg-neutral-100 flex items-center justify-center p-8">
                                        <div className="relative w-16 h-16 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                                            <service.icon className="w-8 h-8 text-black" />
                                        </div>
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white text-black border border-neutral-200 uppercase tracking-widest">
                                                {service.tag}
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 backdrop-blur-[2px]">
                                            <span className="bg-black text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">Coming Soon</span>
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-1">
                                        <h4 className="text-xl font-bold text-black mb-2 tracking-tight">{service.title}</h4>
                                        <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                                            Advanced {service.title.toLowerCase()} module is in active development.
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-neutral-200">
                                            <div className="flex items-center gap-3">
                                                <div className="h-1 flex-1 bg-neutral-200 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: "75%" }}
                                                        transition={{ duration: 1.5, delay: 0.5 }}
                                                        className="h-full bg-black"
                                                    />
                                                </div>
                                                <span className="text-[10px] font-bold text-neutral-400">75%</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section id="products" className="py-24 px-6 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-black font-bold text-xs uppercase tracking-[0.3em] mb-4">Our Products</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-black leading-[1.1] tracking-tighter">
                                Ready-to-use digital <br className="hidden md:block" /> software solutions.
                            </h3>
                        </div>
                        <p className="text-neutral-500 max-w-sm text-lg leading-relaxed">
                            Scalable and intuitive platforms designed to solve operational challenges.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loadingProducts ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="h-96 rounded-[2.5rem] bg-white animate-pulse border border-slate-200" />
                            ))
                        ) : products.length > 0 ? (
                            products.map((product, i) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group bg-white rounded-3xl overflow-hidden border border-neutral-100 hover:border-black transition-all duration-500 flex flex-col h-full"
                                >
                                    <div className="p-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                                                <ShoppingCart className="w-7 h-7" />
                                            </div>
                                            {product.isComingSoon && (
                                                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-black text-white uppercase tracking-widest">
                                                    Coming Soon
                                                </span>
                                            )}
                                        </div>

                                        <h4 className="text-2xl font-bold text-black mb-4 tracking-tight">
                                            {product.name}
                                        </h4>

                                        <p className="text-neutral-500 text-sm leading-relaxed mb-8 flex-1">
                                            {product.description}
                                        </p>

                                        <div className="space-y-4 mb-10">
                                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Key Features</p>
                                            {product.features.map((feature: string, idx: number) => (
                                                <div key={idx} className="flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                                                    <span className="text-sm font-medium text-neutral-600">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-auto pt-8 border-t border-neutral-50 flex items-center justify-between">
                                            {product.link && !product.isComingSoon ? (
                                                <a
                                                    href={product.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-[10px] font-bold text-black hover:text-neutral-500 transition-colors uppercase tracking-[0.2em]"
                                                >
                                                    View Details <ArrowRight className="w-3 h-3" />
                                                </a>
                                            ) : (
                                                <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">
                                                    {product.isComingSoon ? "Launching Soon" : "Product Details"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            /* Empty State or Default Products */
                            <div className="col-span-full text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-inner">
                                <Package className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                                <h4 className="text-xl font-bold text-slate-900 mb-2">Innovative Products Coming Soon</h4>
                                <p className="text-slate-500 max-w-md mx-auto">We are building specialized tools for automation, inventory management, and more. Stay tuned for our product launches.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Work Section */}
            <section id="work" className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-black font-bold text-xs uppercase tracking-[0.3em] mb-4">Portfolio</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-black tracking-tighter">Selected Projects</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                tag: "E-Commerce / POS",
                                title: "Abu Dhabi Trading",
                                desc: "Complete billing, inventory, and staff management system for a high-volume trading business.",
                                result: "200+ Daily Transactions",
                                icon: ShoppingCart,
                                color: "emerald"
                            },
                            {
                                tag: "Healthcare Tech",
                                title: "Medical Lab Suite",
                                desc: "Automated laboratory workflow from sample collection to digital report delivery.",
                                result: "60% Faster Processing",
                                icon: Dna,
                                color: "blue"
                            },
                            {
                                tag: "Logistics SaaS",
                                title: "Dispatch Pro",
                                desc: "Real-time tracking and automated dispatch system for local delivery operations.",
                                result: "99.9% Tracking Accuracy",
                                icon: Truck,
                                color: "orange"
                            }
                        ].map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white rounded-3xl overflow-hidden border border-neutral-100 hover:border-black transition-all duration-500 flex flex-col h-full"
                            >
                                <div className={`relative h-64 overflow-hidden flex items-center justify-center bg-neutral-50 group-hover:bg-black transition-colors duration-500`}>
                                    <div className="relative z-10">
                                        <div className={`w-24 h-24 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-105 transition-all duration-500 border border-neutral-100`}>
                                            <project.icon className="w-10 h-10 text-black" />
                                        </div>
                                    </div>

                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-1.5 rounded-full text-[10px] font-bold bg-white text-black shadow-sm uppercase tracking-widest border border-neutral-100">
                                            {project.tag}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <h4 className="text-2xl font-bold text-black mb-3 tracking-tight">{project.title}</h4>
                                    <p className="text-neutral-500 text-sm leading-relaxed mb-8 flex-1">
                                        {project.desc}
                                    </p>

                                    <div className="pt-8 border-t border-neutral-50 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest mb-1">Impact</p>
                                            <p className="text-lg font-bold text-black tracking-tight">{project.result}</p>
                                        </div>
                                        <div className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <Link to="/work" className="inline-flex items-center gap-3 px-10 py-5 rounded-full border border-neutral-200 font-bold text-black hover:bg-black hover:text-white transition-all duration-300 active:scale-95">
                            View all projects <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section id="process" className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-black rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
                        <div className="relative z-10 grid lg:grid-cols-12 gap-16">
                            <div className="lg:col-span-5">
                                <h2 className="text-neutral-400 font-bold text-xs uppercase tracking-[0.3em] mb-8">Mechanism</h2>
                                <h3 className="text-4xl md:text-6xl font-bold text-white leading-[1.05] tracking-tighter mb-10">
                                    Lean build. <br />
                                    No bloat.
                                </h3>
                                <p className="text-neutral-400 text-lg md:text-xl leading-relaxed mb-12">
                                    Refined processes to deliver maximum value in minimal time.
                                </p>
                                <Link to="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full hover:bg-neutral-200 transition-all font-bold active:scale-95">
                                    Get Started
                                </Link>
                            </div>

                            <div className="lg:col-span-6 lg:offset-1 space-y-16">
                                {[
                                    { step: "01", title: "Audit", desc: "We map out actual workflows and pain points." },
                                    { step: "02", title: "Build", desc: "Custom features developed with precision and speed." },
                                    { step: "03", title: "Launch", desc: "Smooth transition with hands-on support." }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.2 }}
                                        className="flex gap-8 items-start"
                                    >
                                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white font-bold text-xl">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">{item.title}</h4>
                                            <p className="text-neutral-400 leading-relaxed max-w-sm">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Enhanced Visibility & Premium Design */}
            <section className="py-24 px-6 relative overflow-hidden bg-white">
                {/* Visual Interest Background */}
                <div className="absolute top-0 right-0 w-[60%] h-full opacity-5 pointer-events-none -z-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-900">
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative bg-black rounded-[4rem] p-12 md:p-24 overflow-hidden shadow-2xl"
                    >
                        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest mb-10">
                                    <Activity className="w-3.5 h-3.5" />
                                    <span>Let's collaborate</span>
                                </div>

                                <h2 className="text-5xl md:text-7xl font-bold text-white leading-[1] mb-10 tracking-tighter">
                                    Scale with <br />
                                    <span className="text-neutral-500">better systems.</span>
                                </h2>

                                <p className="text-neutral-400 text-lg md:text-xl leading-relaxed mb-12 max-w-sm">
                                    Stop the struggle. Build the digital foundation your business deserves.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-full hover:bg-neutral-200 transition-all font-bold text-lg active:scale-95 group">
                                        Start Conversation
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <button
                                        onClick={() => setShowWhatsApp(true)}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-transparent text-white border border-white/20 px-10 py-5 rounded-full hover:bg-white/5 transition-all font-bold text-lg cursor-pointer"
                                    >
                                        WhatsApp
                                    </button>
                                </div>
                            </div>

                            <div className="hidden lg:block relative">
                                <div className="bg-white/10 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10">
                                    <div className="space-y-8">
                                        <div className="flex justify-between items-center pb-8 border-b border-white/10">
                                            <div>
                                                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Support</p>
                                                <p className="text-2xl font-bold text-white tracking-tight">Average 2hr Wait</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-black">
                                                <Zap className="w-6 h-6" />
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            {[
                                                "Tailored Operational Audit",
                                                "Seamless Integration",
                                                "24/7 Priority Support"
                                            ].map((benefit, i) => (
                                                <div key={i} className="flex gap-4 items-center">
                                                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                                        <Check className="w-3 h-3 text-white" />
                                                    </div>
                                                    <span className="text-sm font-bold text-neutral-300 uppercase tracking-widest">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Premium Footer */}
            <footer className="pt-32 pb-16 px-6 bg-white border-t border-neutral-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-12 gap-16 mb-24">
                        <div className="md:col-span-4">
                            <Link to="/" className="text-2xl font-bold text-black mb-8 block tracking-tighter">
                                Hexastack<span className="text-neutral-300"> AI Solutions.</span>
                            </Link>
                            <p className="text-neutral-500 text-lg leading-relaxed mb-10 max-w-xs">
                                Engineering reliable digital systems for businesses that value efficiency.
                            </p>
                            <div className="flex gap-4">
                                {['Twitter', 'LinkedIn', 'Github'].map((social) => (
                                    <div key={social} className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center text-neutral-400 hover:text-black hover:border-black transition-all cursor-pointer">
                                        <Share2 className="w-4 h-4" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <h4 className="font-bold text-black mb-8 uppercase text-[10px] tracking-[0.3em]">Navigation</h4>
                            <ul className="space-y-4 text-neutral-500 text-sm font-medium">
                                <li><a href="#work" className="hover:text-black transition-colors">Past Projects</a></li>
                                <li><a href="#process" className="hover:text-black transition-colors">Our Methodology</a></li>
                                <li><Link to="/contact" className="hover:text-black transition-colors">Get in Touch</Link></li>
                            </ul>
                        </div>

                        <div className="md:col-span-3">
                            <h4 className="font-bold text-black mb-8 uppercase text-[10px] tracking-[0.3em]">Contact</h4>
                            <div className="space-y-6">
                                <a href="mailto:hexastack78@gmail.com" className="flex items-center gap-4 text-neutral-500 hover:text-black transition-colors group">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm font-medium">hexastack78@gmail.com</span>
                                </a>
                                <div className="flex items-center gap-4 text-neutral-500">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm font-medium">Thrissur, Kerala</span>
                                </div>
                                <div className="flex items-center gap-4 text-neutral-500">
                                    <Phone className="w-4 h-4" />
                                    <div className="text-sm font-medium">
                                        <p>+91 70127 14150</p>
                                        <p>+91 75919 99365</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-3">
                            <div className="p-8 bg-neutral-50 rounded-3xl border border-neutral-100 inline-block group hover:border-black transition-all duration-500">
                                <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24 mb-6 grayscale group-hover:grayscale-0 transition-all duration-500" />
                                <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                                    <QrCode className="w-4 h-4" />
                                    <span>Scan to Share</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">
                            © {new Date().getFullYear()} Hexastack AI Solutions.
                        </p>
                        <div className="flex items-center gap-8">
                            <button onClick={copyLink} className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 hover:text-black transition-colors uppercase tracking-widest">
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? 'Link Copied' : 'Copy Link'}
                            </button>
                            <div className="h-4 w-px bg-neutral-200 hidden md:block" />
                            <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">Monochrome Edition</p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Share */}
            <button onClick={() => setShowQR(!showQR)} className="fixed bottom-10 right-10 bg-black text-white p-4 rounded-full shadow-2xl hover:bg-neutral-800 z-40 active:scale-90 transition-all">
                <Share2 className="w-5 h-5" />
            </button>

            {/* QR Modal */}
            {showQR && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowQR(false)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <QrCode className="w-8 h-8 text-black mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-black mb-8 tracking-tight">Share Hexastack</h3>
                        <div className="bg-neutral-50 p-6 rounded-2xl mb-8 border border-neutral-100">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(SITE_URL)}`} alt="QR" className="w-32 h-32 mx-auto grayscale" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <button onClick={copyLink} className="w-full bg-black text-white py-4 rounded-full text-sm font-bold active:scale-95 transition-all">
                                {copied ? 'Link Copied' : 'Copy Link'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
            {/* WhatsApp Selector Modal */}
            {showWhatsApp && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setShowWhatsApp(false)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl overflow-hidden relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-black tracking-tight">Direct Connect</h3>
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

                        <p className="mt-8 text-neutral-400 text-[10px] font-bold uppercase tracking-widest text-center">
                            Pick a line to start chatting
                        </p>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
