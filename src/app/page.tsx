'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star, Code, Smartphone, Cloud, Cpu, MessageSquare, Mail, Phone, MapPin, CheckCircle, ArrowRight, Menu, X } from 'lucide-react';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirement: ''
  });

  useEffect(() => {
    fetchProjects();
    fetchFeedbacks();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/feedback');
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Failed to fetch feedbacks:', error);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nRequirement: ${formData.requirement}`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Web Applications',
      description: 'Custom web applications built with modern technologies',
      price: 'Starting from $5,000'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications',
      price: 'Starting from $8,000'
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'GenAI Projects',
      description: 'AI-powered solutions and automation tools',
      price: 'Starting from $10,000'
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: 'Cloud & DevOps',
      description: 'Cloud infrastructure and DevOps consulting',
      price: 'Starting from $3,000'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">TechPortfolio</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-gray-900 transition-colors">Home</a>
              <a href="#services" className="text-gray-700 hover:text-gray-900 transition-colors">Services</a>
              <a href="#portfolio" className="text-gray-700 hover:text-gray-900 transition-colors">Portfolio</a>
              <a href="#about" className="text-gray-700 hover:text-gray-900 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</a>
              <Button asChild>
                <a href="/admin">Admin Portal</a>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Home</a>
              <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Services</a>
              <a href="#portfolio" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Portfolio</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-gray-900">About</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Contact</a>
              <div className="px-3 py-2">
                <Button asChild className="w-full">
                  <a href="/admin">Admin Portal</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Building Digital
              <span className="text-blue-600"> Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We create innovative web applications, mobile solutions, and AI-powered tools that transform your business ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                <MessageSquare className="w-5 h-5 mr-2" />
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <a href="#portfolio">
                  View Our Work
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions for all your digital needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-blue-600 mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-blue-600">{service.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Portfolio</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our latest projects and success stories
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <Badge variant={project.status === 'DELIVERED' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription>{project.overview}</CardDescription>
                </CardHeader>
                <CardContent>
                  {project.techStack && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Tech Stack:</p>
                      <p className="text-sm text-gray-600">{project.techStack}</p>
                    </div>
                  )}
                  {project.media && project.media.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Media:</p>
                      <div className="flex gap-2">
                        {project.media.slice(0, 3).map((media: any) => (
                          <Badge key={media.id} variant="outline">
                            {media.type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.feedbacks && project.feedbacks.length > 0 && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Client Feedback:</p>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(project.feedbacks[0].rating)}
                        <span className="text-sm text-gray-600">({project.feedbacks[0].rating}/5)</span>
                      </div>
                      <p className="text-sm text-gray-600 italic">"{project.feedbacks[0].content}"</p>
                      <p className="text-xs text-gray-500 mt-1">- {project.feedbacks[0].name}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {feedbacks.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                What our clients say about working with us
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {feedbacks.map((feedback: any) => (
                <Card key={feedback.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {renderStars(feedback.rating)}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{feedback.content}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{feedback.name}</p>
                        {feedback.company && (
                          <p className="text-sm text-gray-600">{feedback.company}</p>
                        )}
                      </div>
                      <Badge variant="outline">{feedback.project.name}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About TechPortfolio</h2>
              <p className="text-lg text-gray-600 mb-6">
                We are a team of passionate developers and designers dedicated to creating exceptional digital experiences. With years of experience in web development, mobile applications, and AI solutions, we help businesses transform their ideas into powerful digital products.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our mission is to deliver high-quality, innovative solutions that drive business growth and exceed client expectations. We believe in the power of technology to transform businesses and improve lives.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">Expert Team</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">On-Time Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">Quality Assurance</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">24/7 Support</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Expertise</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Web Development</span>
                    <span className="text-gray-600">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Mobile Apps</span>
                    <span className="text-gray-600">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">AI & Machine Learning</span>
                    <span className="text-gray-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Cloud & DevOps</span>
                    <span className="text-gray-600">88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your next project? Let's discuss how we can help you achieve your goals.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="requirement" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Requirements *
                  </label>
                  <Textarea
                    id="requirement"
                    required
                    rows={4}
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    placeholder="Tell us about your project..."
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Send via WhatsApp
                </Button>
              </form>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">hello@techportfolio.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">123 Tech Street, Silicon Valley, CA 94025</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Business Hours</h4>
                <div className="space-y-2 text-gray-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button variant="outline" size="lg" className="flex-1">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <Mail className="w-5 h-5 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">TechPortfolio</h3>
              <p className="text-gray-400">
                Building digital excellence with innovative solutions.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Web Applications</li>
                <li>Mobile Apps</li>
                <li>AI Solutions</li>
                <li>Cloud & DevOps</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Portfolio</li>
                <li>Testimonials</li>
                <li>Contact</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>LinkedIn</li>
                <li>Twitter</li>
                <li>GitHub</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TechPortfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}