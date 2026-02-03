import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, Share2, Copy, Check, QrCode, Zap, Shield, Rocket, Activity, ShoppingCart, Dna, Truck, Package } from 'lucide-react';
import { SITE_URL, API_URL } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [copied, setCopied] = useState(false);
    const [services, setServices] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);

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
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white z-50 border-b border-slate-200 shadow-sm">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="text-xl font-bold text-slate-900">HexaStack</Link>
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-slate-900">Services</a>
                            <a href="#products" className="text-sm font-medium text-slate-600 hover:text-slate-900">Products</a>
                            <a href="#work" className="text-sm font-medium text-slate-600 hover:text-slate-900">Work</a>
                            <a href="#process" className="text-sm font-medium text-slate-600 hover:text-slate-900">Process</a>
                            <Link to="/contact" className="text-sm font-semibold bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
                                Get in touch
                            </Link>
                        </div>
                        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <div className="w-5 h-4 flex flex-col justify-between">
                                <span className={`h-0.5 w-full bg-slate-900 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                                <span className={`h-0.5 w-full bg-slate-900 ${isMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`h-0.5 w-full bg-slate-900 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3">
                        <a href="#services" className="block text-slate-600" onClick={() => setIsMenuOpen(false)}>Services</a>
                        <a href="#products" className="block text-slate-600" onClick={() => setIsMenuOpen(false)}>Products</a>
                        <a href="#work" className="block text-slate-600" onClick={() => setIsMenuOpen(false)}>Work</a>
                        <a href="#process" className="block text-slate-600" onClick={() => setIsMenuOpen(false)}>Process</a>
                        <Link to="/contact" className="block bg-slate-900 text-white px-4 py-2 rounded-lg text-center" onClick={() => setIsMenuOpen(false)}>Get in touch</Link>
                    </div>
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
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="max-w-2xl"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Reliable Digital Systems</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                                Transform your operations with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">better systems.</span>
                            </h1>

                            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
                                We help small businesses replace messy spreadsheets and manual work with custom internal tools and automation that actually work.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl hover:bg-slate-800 transition-all hover:shadow-xl hover:-translate-y-1 font-bold group">
                                    Start your project
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <a href="#work" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-600 border border-slate-200 px-8 py-4 rounded-xl hover:bg-slate-50 transition-all font-bold">
                                    View our work
                                </a>
                            </div>

                            {/* Trust Indicators */}
                            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-8 items-center opacity-70 grayscale">
                                <div className="flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-slate-400" />
                                    <span className="text-sm font-semibold text-slate-500">Fast Delivery</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-slate-400" />
                                    <span className="text-sm font-semibold text-slate-500">Secure Internal Tools</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-slate-400" />
                                    <span className="text-sm font-semibold text-slate-500">24/7 Support</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent pointer-events-none" />
                                <img
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3"
                                    alt="Digital System Interface"
                                    className="w-full aspect-[4/3] object-cover"
                                />
                                {/* Overlay Glass Cards */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1, duration: 1 }}
                                    className="absolute bottom-6 left-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 max-w-[200px]"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-emerald-500 rounded-lg">
                                            <Rocket className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="text-xs font-bold text-slate-900">Efficiency Boost</div>
                                    </div>
                                    <div className="text-2xl font-bold text-slate-900">+140%</div>
                                    <div className="text-[10px] text-slate-500 font-medium">Monthly throughput</div>
                                </motion.div>
                            </div>

                            {/* Decorative Floating Circles */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-emerald-600 font-bold text-sm uppercase tracking-[0.2em] mb-4">Our Services</h2>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                                Delivering digital excellence for <br className="hidden md:block" /> operational efficiency.
                            </h3>
                        </div>
                        <p className="text-slate-500 max-w-sm text-lg">
                            We bridge the gap between complex technology and your daily business operations.
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
                                    className="group bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                                >
                                    <div className="relative h-48 overflow-hidden bg-slate-900 flex items-center justify-center p-8">
                                        <div className="absolute inset-0 opacity-20 group-hover:scale-110 transition-transform duration-700">
                                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/40 to-blue-500/40" />
                                            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                                        </div>
                                        <div className="relative w-20 h-20 rounded-2xl bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 overflow-hidden border border-white/10 p-2">
                                            <img src={service.icon} alt={service.name} className="w-full h-full object-contain" />
                                        </div>
                                        {service.isComingSoon && (
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-lg uppercase tracking-wider">
                                                    Soon
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8 flex flex-col flex-1">
                                        <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{service.name}</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                                            {service.isComingSoon
                                                ? "We are currently perfecting this solution to meet our high standards of excellence."
                                                : "Professional digital solutions tailored for your business growth and operational scaling."}
                                        </p>
                                        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                                            {service.link ? (
                                                <Link to={service.link} className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-emerald-600 transition-colors uppercase tracking-widest">
                                                    Learn more <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            ) : (
                                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
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
                                    className="group bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full grayscale hover:grayscale-0 opacity-70 hover:opacity-100"
                                >
                                    <div className="relative h-48 overflow-hidden bg-slate-900 flex items-center justify-center p-8">
                                        <div className="absolute inset-0 opacity-10">
                                            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                                        </div>
                                        <div className="relative w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                                            <service.icon className="w-8 h-8 text-emerald-500" />
                                        </div>
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/10 text-white/50 border border-white/10 uppercase tracking-wider backdrop-blur-sm">
                                                {service.tag}
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/60 backdrop-blur-[2px]">
                                            <span className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Coming Soon</span>
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-1">
                                        <h4 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">{service.title}</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                            Advanced {service.title.toLowerCase()} module is currently in active development stage.
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: "75%" }}
                                                        transition={{ duration: 1.5, delay: 0.5 }}
                                                        className="h-full bg-emerald-500"
                                                    />
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">75%</span>
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
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-center md:text-left">
                        <div className="max-w-2xl">
                            <h2 className="text-emerald-600 font-bold text-sm uppercase tracking-[0.2em] mb-4">Our Products</h2>
                            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                                Ready-to-use digital <br className="hidden md:block" /> solutions for your business.
                            </h3>
                        </div>
                        <p className="text-slate-500 max-w-sm text-lg">
                            Scalable, secure, and intuitive platforms designed to solve specific operational challenges.
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
                                    className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                                >
                                    <div className="p-8 md:p-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                                                <ShoppingCart className="w-7 h-7" />
                                            </div>
                                            {product.isComingSoon && (
                                                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-lg uppercase tracking-wider">
                                                    Coming Soon
                                                </span>
                                            )}
                                        </div>

                                        <h4 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors tracking-tight uppercase">
                                            {product.name}
                                        </h4>

                                        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                                            {product.description}
                                        </p>

                                        <div className="space-y-3 mb-8">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Features</p>
                                            {product.features.map((feature: string, idx: number) => (
                                                <div key={idx} className="flex items-center gap-3">
                                                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                                        <Check className="w-3 h-3 text-emerald-500" />
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-600">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                                            {product.link && !product.isComingSoon ? (
                                                <a
                                                    href={product.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-emerald-600 transition-colors uppercase tracking-widest"
                                                >
                                                    View Details <ArrowRight className="w-4 h-4" />
                                                </a>
                                            ) : (
                                                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
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
                    <div className="text-center mb-16">
                        <h2 className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-4">Portfolio</h2>
                        <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900">Recent Projects</h3>
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
                                className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                            >
                                <div className={`relative h-48 overflow-hidden flex items-center justify-center bg-slate-50 transition-colors duration-500 group-hover:bg-slate-900`}>
                                    {/* Abstract background pattern */}
                                    <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500">
                                        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                                    </div>

                                    <div className="relative z-10">
                                        <div className={`w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-slate-100`}>
                                            <project.icon className={`w-10 h-10 ${project.color === 'emerald' ? 'text-emerald-500' :
                                                project.color === 'blue' ? 'text-blue-500' : 'text-orange-500'
                                                }`} />
                                        </div>
                                    </div>

                                    <div className="absolute top-6 left-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold bg-white/80 backdrop-blur-md text-slate-900 shadow-sm uppercase tracking-widest border border-slate-100`}>
                                            {project.tag}
                                        </span>
                                    </div>

                                    {/* Bottom border glow on hover */}
                                    <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${project.color === 'emerald' ? 'from-emerald-500/0 via-emerald-500 to-emerald-500/0' :
                                        project.color === 'blue' ? 'from-blue-500/0 via-blue-500 to-blue-500/0' :
                                            'from-orange-500/0 via-orange-500 to-orange-500/0'
                                        } scale-x-0 group-hover:scale-x-100 transition-transform duration-700`} />
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <h4 className="text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-slate-800 transition-colors">{project.title}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
                                        {project.desc}
                                    </p>

                                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Impact Delivered</p>
                                            <p className={`text-base font-black ${project.color === 'emerald' ? 'text-emerald-600' :
                                                project.color === 'blue' ? 'text-blue-600' : 'text-orange-600'
                                                }`}>{project.result}</p>
                                        </div>
                                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 shadow-inner">
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link to="/work" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300">
                            Explore All Case Studies <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section id="process" className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-slate-900 rounded-[3rem] p-8 md:p-20 relative overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[100px] rounded-full" />
                        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[100px] rounded-full" />

                        <div className="relative z-10 grid lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-5">
                                <h2 className="text-emerald-400 font-bold text-sm uppercase tracking-[0.2em] mb-6">Our Methodology</h2>
                                <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-8">
                                    Fast deployment. <br />
                                    No technical bloat.
                                </h3>
                                <p className="text-slate-400 text-lg leading-relaxed mb-10">
                                    We've refined our process to deliver maximum value in minimal time, ensuring your business never misses a beat during transition.
                                </p>
                                <Link to="/contact" className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-xl hover:bg-emerald-400 transition-all font-bold">
                                    Get Started Today
                                </Link>
                            </div>

                            <div className="lg:col-span-6 lg:offset-1 space-y-12">
                                {[
                                    { step: "01", title: "Operational Audit", desc: "We sit with your team to map out actual workflows and pain points." },
                                    { step: "02", title: "Targeted Build", desc: "We develop only the features you need, keeping the system lean and fast." },
                                    { step: "03", title: "Live Launch", desc: "Hands-on training and deployment to ensure a smooth transition." }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.2 }}
                                        className="flex gap-6 items-start"
                                    >
                                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 font-bold text-xl">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                            <p className="text-slate-400 leading-relaxed text-sm">
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
                        className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3.5rem] p-10 md:p-20 overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]"
                    >
                        {/* Decorative Glow */}
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

                        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
                                    <Activity className="w-3.5 h-3.5" />
                                    <span>Let's collaborate</span>
                                </div>

                                <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
                                    Ready to scale with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">better systems?</span>
                                </h2>

                                <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                                    Stop fighting with messy workflows. Let's build the digital foundation your business deserves.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-500 text-white px-10 py-5 rounded-2xl hover:bg-emerald-400 transition-all hover:shadow-2xl hover:-translate-y-1 font-bold text-lg group">
                                        Start a Conversation
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <a href="https://wa.me/917012714150" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/5 text-white border border-white/10 px-10 py-5 rounded-2xl hover:bg-white/10 transition-all font-bold text-lg">
                                        <Phone className="w-5 h-5 border-none p-0" /> WhatsApp Us
                                    </a>
                                </div>
                            </div>

                            <div className="hidden lg:block relative">
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center pb-6 border-b border-white/10">
                                            <div>
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Quick Response</p>
                                                <p className="text-xl font-bold text-white tracking-tight">Average 2hr Wait</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                                                <Zap className="w-6 h-6 text-emerald-400" />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                "Tailored Operational Audit",
                                                "Seamless System Integration",
                                                "Post-Launch Technical Support"
                                            ].map((benefit, i) => (
                                                <div key={i} className="flex gap-4 items-center">
                                                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                                        <Check className="w-3 h-3 text-emerald-400" />
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-300">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* Floating Badge */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-6 -right-6 bg-emerald-500 text-white px-6 py-4 rounded-3xl shadow-xl font-bold text-sm"
                                >
                                    99.9% Reliable
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Premium Footer */}
            <footer className="pt-24 pb-12 px-6 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-12 gap-12 mb-20">
                        <div className="md:col-span-4">
                            <Link to="/" className="text-2xl font-black text-slate-900 mb-6 block tracking-tighter">
                                HexaStack<span className="text-emerald-500">.</span>
                            </Link>
                            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xs">
                                Engineering reliable digital systems for businesses that value efficiency and growth.
                            </p>
                            <div className="flex gap-4">
                                {['Twitter', 'LinkedIn', 'Github'].map((social) => (
                                    <div key={social} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer">
                                        <Share2 className="w-4 h-4" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Navigation</h4>
                            <ul className="space-y-4 text-slate-500 text-sm font-medium">
                                <li><a href="#work" className="hover:text-emerald-600 transition-colors">Past Projects</a></li>
                                <li><a href="#process" className="hover:text-emerald-600 transition-colors">Our Methodology</a></li>
                                <li><Link to="/contact" className="hover:text-emerald-600 transition-colors">Get in Touch</Link></li>
                            </ul>
                        </div>

                        <div className="md:col-span-3">
                            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Contact Details</h4>
                            <div className="space-y-4">
                                <a href="mailto:hexastack78@gmail.com" className="flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-colors group">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center group-hover:bg-emerald-50 text-slate-400 group-hover:text-emerald-600 transition-all">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium">hexastack78@gmail.com</span>
                                </a>
                                <div className="flex items-center gap-3 text-slate-500">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium">Thrissur, Kerala</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <div className="text-sm font-medium">
                                        <p>+91 70127 14150</p>
                                        <p>+91 75919 99365</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-3">
                            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm inline-block group hover:shadow-xl transition-all duration-500">
                                <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32 mb-4 grayscale group-hover:grayscale-0 transition-all duration-500" />
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <QrCode className="w-4 h-4" />
                                    <span>Scan to Share</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-sm text-slate-400 font-medium tracking-tight">
                            © {new Date().getFullYear()} HexaStack Systems. All rights reserved.
                        </p>
                        <div className="flex items-center gap-8">
                            <button onClick={copyLink} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">
                                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                {copied ? 'Project Link Copied' : 'Copy Project Link'}
                            </button>
                            <div className="h-4 w-px bg-slate-200 hidden md:block" />
                            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Built for Performance</p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Share */}
            <button onClick={() => setShowQR(!showQR)} className="fixed bottom-20 right-4 bg-slate-900 text-white p-3 rounded-full shadow-lg hover:bg-slate-800 z-40">
                <Share2 className="w-4 h-4" />
            </button>

            {/* QR Modal */}
            {showQR && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowQR(false)}>
                    <div className="bg-white rounded-2xl p-6 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
                        <QrCode className="w-6 h-6 text-slate-900 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Share HexaStack</h3>
                        <div className="bg-slate-50 p-4 rounded-xl mb-4 border border-slate-200">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(SITE_URL)}`} alt="QR" className="w-32 h-32 mx-auto" />
                        </div>
                        <div className="flex gap-2">
                            <button onClick={copyLink} className="flex-1 bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium">
                                {copied ? 'Copied!' : 'Copy Link'}
                            </button>
                            <a href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&format=png&data=${encodeURIComponent(SITE_URL)}`} download="hexastack-qr.png" className="flex-1 border border-slate-200 py-2.5 rounded-lg text-sm font-medium">
                                Download
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
