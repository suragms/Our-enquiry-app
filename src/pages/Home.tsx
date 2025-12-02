import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Menu,
    X,
    ArrowRight,
    Smartphone,
    Globe,
    Cpu,
    Cloud,
    CheckCircle,
    Zap,
    Layout,
    Code,
    MessageSquare,
    ChevronRight,
    Send,
    Star
} from 'lucide-react';

export default function Home() {
    const [projects, setProjects] = useState<any[]>([]);
    const [feedbacks, setFeedbacks] = useState<any[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        requirement: ''
    });

    const [feedbackForm, setFeedbackForm] = useState({
        projectId: '',
        name: '',
        company: '',
        content: '',
        rating: 5
    });

    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const [feedbackLoading, setFeedbackLoading] = useState(false);
    const [contactLoading, setContactLoading] = useState(false);

    useEffect(() => {
        fetchProjects();
        fetchFeedbacks();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch(`${API_URL}/api/projects`);
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProjects(data);
                } else {
                    console.error('Projects data is not an array:', data);
                    setProjects([]);
                }
            } else {
                console.error('Failed to fetch projects:', response.statusText);
                setProjects([]);
            }
        } catch (error) {
            console.error('Failed to fetch projects:', error);
            setProjects([]);
        }
    };

    const fetchFeedbacks = async () => {
        try {
            const response = await fetch(`${API_URL}/api/feedback`);
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    setFeedbacks(data);
                } else {
                    console.error('Feedbacks data is not an array:', data);
                    setFeedbacks([]);
                }
            } else {
                console.error('Failed to fetch feedbacks:', response.statusText);
                setFeedbacks([]);
            }
        } catch (error) {
            console.error('Failed to fetch feedbacks:', error);
            setFeedbacks([]);
        }
    };

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setContactLoading(true);

        try {
            // Save to database
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

            alert('Message sent successfully! We will get back to you soon.');

            // Also open WhatsApp as a secondary action
            const message = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nRequirement: ${formData.requirement}`;
            const whatsappUrl = `https://wa.me/917591999365?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                requirement: ''
            });
        } catch (error) {
            console.error('Failed to submit contact form:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setContactLoading(false);
        }
    };

    const handleFeedbackSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedbackLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackForm),
            });

            if (response.ok) {
                const data = await response.json();
                setFeedbackSubmitted(true);
                setFeedbacks((prev) => [data.feedback, ...prev]);
                setFeedbackForm({
                    projectId: '',
                    name: '',
                    company: '',
                    content: '',
                    rating: 5
                });
                setTimeout(() => setFeedbackSubmitted(false), 5000);
            } else {
                alert('Failed to submit feedback. Please try again.');
            }
        } catch (error) {
            console.error('Failed to submit feedback:', error);
            alert('Failed to submit feedback. Please try again.');
        } finally {
            setFeedbackLoading(false);
        }
    };

    const services = [
        {
            icon: <Layout className="w-8 h-8" />,
            title: 'Web Applications',
            description: 'Scalable, high-performance web platforms built with modern frameworks.',
            price: 'Starting from $5,000'
        },
        {
            icon: <Smartphone className="w-8 h-8" />,
            title: 'Mobile Solutions',
            description: 'Native and cross-platform mobile apps that engage users.',
            price: 'Starting from $8,000'
        },
        {
            icon: <Cpu className="w-8 h-8" />,
            title: 'AI Integration',
            description: 'Smart automation and AI-driven insights for your business.',
            price: 'Starting from $10,000'
        },
        {
            icon: <Cloud className="w-8 h-8" />,
            title: 'Cloud Infrastructure',
            description: 'Secure, scalable cloud architecture and DevOps services.',
            price: 'Starting from $3,000'
        }
    ];

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'services', label: 'Services' },
        { id: 'portfolio', label: 'Portfolio' },
        { id: 'testimonials', label: 'Testimonials' },
        { id: 'feedback', label: 'Feedback' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-blue-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <Code className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-600">
                                HexaStack
                            </span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors relative group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full rounded-full"></span>
                                </a>
                            ))}
                            <Button className="btn-primary-gradient rounded-full px-6">
                                Get Started
                            </Button>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-slate-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-b border-blue-100 overflow-hidden"
                        >
                            <div className="px-4 pt-2 pb-6 space-y-2">
                                {navItems.map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className="block px-4 py-3 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Section */}
            <section id="home" className="pt-32 pb-20 min-h-screen flex items-center relative overflow-hidden bg-slate-50">
                {/* Animated Background Mesh */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-purple-400/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '4s' }}></div>
                </div>

                <div className="absolute inset-0 bg-grid-blue opacity-[0.03]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-8">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                </span>
                                <span className="text-sm font-semibold text-slate-600">Innovating the Future</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
                                Transforming Ideas into <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-300% animate-gradient">
                                    Digital Reality
                                </span>
                            </h1>

                            <p className="text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
                                We build scalable, high-performance web and mobile applications powered by cutting-edge AI technology.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="btn-primary-gradient h-14 px-8 rounded-full text-lg shadow-blue-500/25 shadow-xl hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300"
                                    asChild
                                >
                                    <a href="#contact">
                                        Start Your Project
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </a>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-14 px-8 rounded-full text-lg border-2 border-slate-200 text-slate-700 hover:bg-white hover:border-blue-200 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
                                    asChild
                                >
                                    <a href="#portfolio">
                                        View Our Work
                                    </a>
                                </Button>
                            </div>

                            <div className="mt-12 flex items-center gap-8 border-t border-slate-200 pt-8">
                                <div>
                                    <h4 className="text-3xl font-bold text-slate-900">200+</h4>
                                    <p className="text-slate-500 text-sm">Projects Delivered</p>
                                </div>
                                <div className="w-px h-12 bg-slate-200"></div>
                                <div>
                                    <h4 className="text-3xl font-bold text-slate-900">98%</h4>
                                    <p className="text-slate-500 text-sm">Client Satisfaction</p>
                                </div>
                                <div className="w-px h-12 bg-slate-200"></div>
                                <div>
                                    <h4 className="text-3xl font-bold text-slate-900">24/7</h4>
                                    <p className="text-slate-500 text-sm">Support Available</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative hidden lg:block h-[700px] w-full"
                        >
                            <div className="relative w-full h-full [perspective:2000px]">
                                <motion.div
                                    className="relative w-full h-full [transform-style:preserve-3d]"
                                    initial={{ rotateY: -5, rotateX: 5 }}
                                    whileHover={{ rotateY: 0, rotateX: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    {/* Main 3D Illustration - Using a reliable tech image */}
                                    <div className="absolute inset-0 flex items-center justify-center [transform:translateZ(0px)]">
                                        <div className="relative w-[500px] h-[400px] bg-gradient-to-tr from-blue-100 to-cyan-50 rounded-[2rem] shadow-2xl border border-white/50 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                                            <div className="absolute inset-0 bg-grid-blue opacity-10"></div>
                                            <img
                                                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                                                alt="Coding Workspace"
                                                className="w-full h-full object-cover opacity-90 mix-blend-overlay"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent"></div>
                                            <Code className="w-32 h-32 text-blue-500/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                        </div>
                                    </div>

                                    {/* Floating Element 1: Code Block */}
                                    <motion.div
                                        animate={{ y: [0, -15, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute top-[15%] right-[5%] [transform:translateZ(60px)]"
                                    >
                                        <div className="bg-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center gap-4 w-64">
                                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                                                <Code className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="font-mono text-xs text-slate-400 mb-1">Clean Code</div>
                                                <div className="font-bold text-slate-800 text-sm">Modern Architecture</div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Floating Element 2: Cloud Data */}
                                    <motion.div
                                        animate={{ y: [0, 20, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                        className="absolute bottom-[25%] left-[-5%] [transform:translateZ(80px)]"
                                    >
                                        <div className="bg-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center gap-4 w-60">
                                            <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                                                <Cloud className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="font-mono text-xs text-slate-400 mb-1">Serverless</div>
                                                <div className="font-bold text-slate-800 text-sm">99.9% Uptime</div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Floating Element 3: AI/Brain */}
                                    <motion.div
                                        animate={{ y: [0, -15, 0] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                        className="absolute top-[45%] right-[-10%] [transform:translateZ(40px)]"
                                    >
                                        <div className="bg-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center gap-4 w-56">
                                            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                                                <Cpu className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="font-mono text-xs text-slate-400 mb-1">AI Powered</div>
                                                <div className="font-bold text-slate-800 text-sm">Smart Analytics</div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 right-10 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                                    <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-300 rounded-full blur-2xl opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Our Expertise</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                            Comprehensive Digital Solutions
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            We provide end-to-end development services tailored to your business needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-slate-50/50 group h-full">
                                    <CardHeader>
                                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                                            <div className="text-blue-600 group-hover:text-white transition-colors duration-300">
                                                {service.icon}
                                            </div>
                                        </div>
                                        <CardTitle className="text-xl font-bold text-slate-900">{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-slate-600 mb-4 text-base leading-relaxed">
                                            {service.description}
                                        </CardDescription>
                                        <p className="text-blue-600 font-bold text-sm bg-blue-50 inline-block px-3 py-1 rounded-full">
                                            {service.price}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Our Work</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
                                Featured Projects
                            </h2>
                        </div>
                        <Button variant="outline" className="mt-4 md:mt-0 rounded-full border-blue-200 text-blue-600 hover:bg-blue-50">
                            View All Projects <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project: any, index: number) => (
                            <motion.div
                                key={project.id || index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 group bg-white">
                                    <div className="h-56 bg-slate-200 relative overflow-hidden">
                                        {project.media && project.media.find((m: any) => m.type === 'IMAGE') ? (
                                            <img
                                                src={project.media.find((m: any) => m.type === 'IMAGE').url}
                                                alt={project.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-100">
                                                <Layout className="w-12 h-12 text-slate-300" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <Button size="sm" className="bg-white text-slate-900 hover:bg-blue-50 w-full font-semibold">
                                                View Case Study
                                            </Button>
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                {project.name}
                                            </h3>
                                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                                                {project.status}
                                            </Badge>
                                        </div>
                                        <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                                            {project.overview}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 p-2 rounded-lg">
                                            <Code className="w-3 h-3 text-blue-500" />
                                            {project.techStack || 'React, Node.js'}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            {
                feedbacks.length > 0 && (
                    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-grid-blue opacity-[0.02]"></div>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="text-center mb-16">
                                <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Testimonials</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
                                    Trusted by Clients
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {feedbacks.map((feedback: any, index: number) => (
                                    <motion.div
                                        key={feedback.id || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Card className="bg-white border border-slate-100 shadow-lg p-6 h-full flex flex-col justify-between hover:border-blue-200 transition-colors">
                                            <div>
                                                <div className="flex text-yellow-400 mb-4">
                                                    {Array.from({ length: feedback.rating }).map((_, i) => (
                                                        <span key={i} className="text-lg">★</span>
                                                    ))}
                                                </div>
                                                <p className="text-slate-700 mb-6 text-lg italic leading-relaxed">
                                                    "{feedback.content}"
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                                    {feedback.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">{feedback.name}</div>
                                                    <div className="text-sm text-slate-500">{feedback.company}</div>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* Share Feedback Section */}
            <section id="feedback" className="py-24 bg-slate-50 relative">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Your Opinion Matters</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
                            Share Your Feedback
                        </h2>
                        <p className="text-slate-600 mt-4">
                            We value your experience. Please let us know how we did.
                        </p>
                    </div>

                    <Card className="border-none shadow-xl bg-white">
                        <CardContent className="p-8">
                            {feedbackSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
                                    <p className="text-slate-600">Your feedback has been submitted successfully.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Select Project *</label>
                                            <select
                                                required
                                                value={feedbackForm.projectId}
                                                onChange={(e) => setFeedbackForm({ ...feedbackForm, projectId: e.target.value })}
                                                className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="" className="text-slate-500">Select a project...</option>
                                                {projects.map((project) => (
                                                    <option key={project.id} value={project.id} className="text-slate-900">
                                                        {project.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Your Name *</label>
                                            <Input
                                                required
                                                value={feedbackForm.name}
                                                onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                                                placeholder="John Doe"
                                                className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Company (Optional)</label>
                                            <Input
                                                value={feedbackForm.company}
                                                onChange={(e) => setFeedbackForm({ ...feedbackForm, company: e.target.value })}
                                                placeholder="Company Name"
                                                className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Rating</label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                                                        className="focus:outline-none transition-transform hover:scale-110"
                                                    >
                                                        <Star
                                                            className={`w-8 h-8 ${star <= feedbackForm.rating
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-slate-200'
                                                                }`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Your Feedback *</label>
                                        <Textarea
                                            required
                                            value={feedbackForm.content}
                                            onChange={(e) => setFeedbackForm({ ...feedbackForm, content: e.target.value })}
                                            placeholder="Tell us about your experience..."
                                            rows={4}
                                            className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={feedbackLoading}
                                        className="w-full btn-primary-gradient h-12 text-lg font-bold shadow-lg"
                                    >
                                        {feedbackLoading ? 'Submitting...' : 'Submit Feedback'}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
                        <CardHeader className="text-center border-b border-white/10 pb-8">
                            <CardTitle className="text-3xl font-bold text-white">Let's Build Something Amazing</CardTitle>
                            <CardDescription className="text-blue-100 text-lg">
                                Share your project details and we'll get back to you within 24 hours.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-8">
                            <form onSubmit={handleContactSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-blue-100">Full Name</label>
                                        <Input
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-white/40"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-blue-100">Email Address</label>
                                        <Input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-white/40"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-blue-100">Phone Number</label>
                                    <Input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-white/40"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-blue-100">Project Details</label>
                                    <Textarea
                                        required
                                        rows={4}
                                        value={formData.requirement}
                                        onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                                        className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-white/40"
                                        placeholder="Tell us about your project goals..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold h-12 text-lg shadow-lg"
                                    disabled={contactLoading}
                                >
                                    <Send className="w-5 h-5 mr-2" />
                                    {contactLoading ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-16 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <Code className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-xl font-bold">HexaStack</h3>
                            </div>
                            <p className="text-slate-400 leading-relaxed">
                                Empowering businesses with cutting-edge digital solutions. We build the future of technology.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-6">Services</h4>
                            <ul className="space-y-4 text-slate-400">
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Web Development</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Mobile Apps</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">AI Solutions</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Cloud Services</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-6">Company</h4>
                            <ul className="space-y-4 text-slate-400">
                                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Portfolio</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-6">Connect</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                                    <Globe className="w-5 h-5 text-white" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                                    <MessageSquare className="w-5 h-5 text-white" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
                        <p>&copy; 2024 HexaStack. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
