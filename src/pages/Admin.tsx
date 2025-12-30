import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '@/lib/utils';
import { 
    Trash2, Mail, Phone, Clock, ArrowLeft, RefreshCw, Lock, LogOut, Shield,
    FolderOpen, Settings, Bell, Plus, Edit2, Save, X, Image, ExternalLink,
    MessageCircle, AlertCircle, CheckCircle, Upload, ImagePlus
} from 'lucide-react';

// Admin password
const ADMIN_PASSWORD = 'hexastack@2024';

interface Enquiry {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    requirement: string;
    isRead: boolean;
    createdAt: string;
}

interface PortfolioProject {
    id: string;
    title: string;
    description: string;
    techStack: string | null;
    projectUrl: string | null;
    featured: boolean;
    displayOrder: number;
    media: { id: string; type: string; url: string }[];
}

interface CompanySettings {
    id?: string;
    companyName: string;
    primaryEmail: string;
    primaryWhatsApp: string;
    secondaryWhatsApp: string;
    leadName1: string;
    leadEmail1: string;
    leadWhatsApp1: string;
    leadName2: string;
    leadWhatsApp2: string;
    address: string;
    tagline: string;
    description: string;
}

type TabType = 'enquiries' | 'projects' | 'settings';

export default function Admin() {
    // Auth state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    
    // Tab state
    const [activeTab, setActiveTab] = useState<TabType>('enquiries');
    
    // Enquiries state
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
    
    // Projects state
    const [projects, setProjects] = useState<PortfolioProject[]>([]);
    const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [projectForm, setProjectForm] = useState({
        title: '',
        description: '',
        techStack: '',
        projectUrl: '',
        featured: false,
        imageUrl: '', // New field for image
    });
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Settings state
    const [settings, setSettings] = useState<CompanySettings | null>(null);
    const [editingSettings, setEditingSettings] = useState(false);
    const [settingsForm, setSettingsForm] = useState<CompanySettings>({
        companyName: '',
        primaryEmail: '',
        primaryWhatsApp: '',
        secondaryWhatsApp: '',
        leadName1: '',
        leadEmail1: '',
        leadWhatsApp1: '',
        leadName2: '',
        leadWhatsApp2: '',
        address: '',
        tagline: '',
        description: '',
    });
    
    // Loading states
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    
    // Notifications
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    // Check auth on mount
    useEffect(() => {
        const session = sessionStorage.getItem('hexastack_admin_auth');
        const sessionTime = sessionStorage.getItem('hexastack_admin_time');
        
        if (session === 'authenticated' && sessionTime) {
            const elapsed = Date.now() - parseInt(sessionTime);
            if (elapsed < 2 * 60 * 60 * 1000) {
                setIsAuthenticated(true);
            } else {
                sessionStorage.removeItem('hexastack_admin_auth');
                sessionStorage.removeItem('hexastack_admin_time');
            }
        }
        
        const lockTime = localStorage.getItem('hexastack_lock_time');
        if (lockTime) {
            const elapsed = Date.now() - parseInt(lockTime);
            if (elapsed < 15 * 60 * 1000) {
                setIsLocked(true);
            } else {
                localStorage.removeItem('hexastack_lock_time');
                localStorage.removeItem('hexastack_attempts');
            }
        }
        
        const attempts = localStorage.getItem('hexastack_attempts');
        if (attempts) setLoginAttempts(parseInt(attempts));
    }, []);

    // Fetch data when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            fetchEnquiries();
            fetchProjects();
            fetchSettings();
        }
    }, [isAuthenticated]);

    // Show notification
    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    // Auth handlers
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLocked) return;
        
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('hexastack_admin_auth', 'authenticated');
            sessionStorage.setItem('hexastack_admin_time', Date.now().toString());
            localStorage.removeItem('hexastack_attempts');
            localStorage.removeItem('hexastack_lock_time');
            setLoginError('');
            setLoginAttempts(0);
        } else {
            const newAttempts = loginAttempts + 1;
            setLoginAttempts(newAttempts);
            localStorage.setItem('hexastack_attempts', newAttempts.toString());
            
            if (newAttempts >= 5) {
                setIsLocked(true);
                localStorage.setItem('hexastack_lock_time', Date.now().toString());
                setLoginError('Too many failed attempts. Locked for 15 minutes.');
            } else {
                setLoginError(`Invalid password. ${5 - newAttempts} attempts remaining.`);
            }
        }
        setPassword('');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('hexastack_admin_auth');
        sessionStorage.removeItem('hexastack_admin_time');
    };

    // Enquiry handlers
    const fetchEnquiries = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/contact`);
            if (response.ok) {
                const data = await response.json();
                setEnquiries(data);
            }
        } catch (error) {
            console.error('Failed to fetch enquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            await fetch(`${API_URL}/api/contact/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isRead: true }),
            });
            setEnquiries(enquiries.map(e => e.id === id ? { ...e, isRead: true } : e));
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const deleteEnquiry = async (id: string) => {
        if (!window.confirm('Delete this enquiry?')) return;
        setDeleting(id);
        try {
            const response = await fetch(`${API_URL}/api/contact/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setEnquiries(enquiries.filter(e => e.id !== id));
                if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
                showNotification('success', 'Enquiry deleted');
            }
        } catch (error) {
            showNotification('error', 'Failed to delete');
        } finally {
            setDeleting(null);
        }
    };

    // Project handlers
    const fetchProjects = async () => {
        try {
            const response = await fetch(`${API_URL}/api/portfolio`);
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    };

    const saveProject = async () => {
        if (!projectForm.title || !projectForm.description) {
            showNotification('error', 'Title and description required');
            return;
        }
        
        setSaving(true);
        try {
            const url = editingProject 
                ? `${API_URL}/api/portfolio/${editingProject.id}`
                : `${API_URL}/api/portfolio`;
            
            const response = await fetch(url, {
                method: editingProject ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectForm),
            });
            
            if (response.ok) {
                await fetchProjects();
                setShowProjectForm(false);
                setEditingProject(null);
                setProjectForm({ title: '', description: '', techStack: '', projectUrl: '', featured: false, imageUrl: '' });
                showNotification('success', editingProject ? 'Project updated' : 'Project created');
            }
        } catch (error) {
            showNotification('error', 'Failed to save project');
        } finally {
            setSaving(false);
        }
    };

    const deleteProject = async (id: string) => {
        if (!window.confirm('Delete this project?')) return;
        setDeleting(id);
        try {
            const response = await fetch(`${API_URL}/api/portfolio/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setProjects(projects.filter(p => p.id !== id));
                showNotification('success', 'Project deleted');
            }
        } catch (error) {
            showNotification('error', 'Failed to delete');
        } finally {
            setDeleting(null);
        }
    };

    const editProject = (project: PortfolioProject) => {
        setEditingProject(project);
        setProjectForm({
            title: project.title,
            description: project.description,
            techStack: project.techStack || '',
            projectUrl: project.projectUrl || '',
            featured: project.featured,
            imageUrl: project.media?.[0]?.url || '',
        });
        setShowProjectForm(true);
    };

    // Image upload handler
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            showNotification('error', 'Image too large (max 5MB)');
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_URL}/api/upload`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setProjectForm({ ...projectForm, imageUrl: data.url });
                showNotification('success', 'Image uploaded');
            } else {
                showNotification('error', 'Upload failed');
            }
        } catch (error) {
            showNotification('error', 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    // Settings handlers
    const fetchSettings = async () => {
        try {
            const response = await fetch(`${API_URL}/api/settings`);
            if (response.ok) {
                const data = await response.json();
                setSettings(data);
                setSettingsForm(data);
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        }
    };

    const saveSettings = async () => {
        setSaving(true);
        try {
            const response = await fetch(`${API_URL}/api/settings`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settingsForm),
            });
            
            if (response.ok) {
                const data = await response.json();
                setSettings(data);
                setEditingSettings(false);
                showNotification('success', 'Settings saved');
            }
        } catch (error) {
            showNotification('error', 'Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    const unreadCount = enquiries.filter(e => !e.isRead).length;

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-50 font-sans flex items-center justify-center px-6">
                <div className="w-full max-w-sm">
                    <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-xl font-semibold text-slate-900">Admin Access</h1>
                            <p className="text-sm text-slate-500 mt-1">Enter password to continue</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLocked}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 disabled:bg-slate-100"
                                        placeholder="Enter password"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {loginError && (
                                <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-md">
                                    {loginError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLocked || !password}
                                className="w-full bg-slate-900 text-white py-3 px-4 rounded-md hover:bg-slate-800 font-medium disabled:opacity-50"
                            >
                                {isLocked ? 'Locked' : 'Access Admin'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">← Back to website</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Notification */}
            {notification && (
                <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
                    notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}>
                    {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    {notification.message}
                </div>
            )}

            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="text-slate-500 hover:text-slate-700">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-xl font-semibold text-slate-900">Admin Dashboard</h1>
                                <p className="text-sm text-slate-500">Manage your website</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {unreadCount > 0 && (
                                <span className="flex items-center gap-1 text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                                    <Bell className="w-4 h-4" />
                                    {unreadCount} new
                                </span>
                            )}
                            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700">
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex gap-1">
                        {[
                            { id: 'enquiries', label: 'Enquiries', icon: Mail, count: unreadCount },
                            { id: 'projects', label: 'Projects', icon: FolderOpen },
                            { id: 'settings', label: 'Settings', icon: Settings },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabType)}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-slate-900 text-slate-900'
                                        : 'border-transparent text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                                {tab.count ? (
                                    <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">{tab.count}</span>
                                ) : null}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                
                {/* ENQUIRIES TAB */}
                {activeTab === 'enquiries' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-slate-900">Client Enquiries</h2>
                            <button onClick={fetchEnquiries} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                        </div>

                        {loading && enquiries.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto mb-4" />
                                <p className="text-slate-500">Loading...</p>
                            </div>
                        ) : enquiries.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                                <Mail className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-700 mb-2">No enquiries yet</h3>
                                <p className="text-slate-500">New enquiries will appear here.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="md:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
                                    {enquiries.map((enquiry) => (
                                        <div
                                            key={enquiry.id}
                                            onClick={() => { setSelectedEnquiry(enquiry); if (!enquiry.isRead) markAsRead(enquiry.id); }}
                                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                                selectedEnquiry?.id === enquiry.id
                                                    ? 'bg-slate-900 text-white border-slate-900'
                                                    : enquiry.isRead
                                                        ? 'bg-white border-slate-200 hover:border-slate-300'
                                                        : 'bg-blue-50 border-blue-200 hover:border-blue-300'
                                            }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className={`font-medium truncate ${selectedEnquiry?.id === enquiry.id ? 'text-white' : 'text-slate-900'}`}>
                                                    {enquiry.name}
                                                </h3>
                                                {!enquiry.isRead && selectedEnquiry?.id !== enquiry.id && (
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                                )}
                                            </div>
                                            <p className={`text-sm truncate mb-2 ${selectedEnquiry?.id === enquiry.id ? 'text-slate-300' : 'text-slate-500'}`}>
                                                {enquiry.requirement}
                                            </p>
                                            <p className={`text-xs ${selectedEnquiry?.id === enquiry.id ? 'text-slate-400' : 'text-slate-400'}`}>
                                                {formatDate(enquiry.createdAt)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="md:col-span-2">
                                    {selectedEnquiry ? (
                                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h2 className="text-xl font-semibold text-slate-900 mb-1">{selectedEnquiry.name}</h2>
                                                    <div className="flex items-center gap-1 text-sm text-slate-500">
                                                        <Clock className="w-4 h-4" />
                                                        {formatDate(selectedEnquiry.createdAt)}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => deleteEnquiry(selectedEnquiry.id)}
                                                    disabled={deleting === selectedEnquiry.id}
                                                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    {deleting === selectedEnquiry.id ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </div>

                                            <div className="space-y-4 mb-8">
                                                <div className="flex items-center gap-3">
                                                    <Mail className="w-4 h-4 text-slate-400" />
                                                    <a href={`mailto:${selectedEnquiry.email}`} className="text-slate-700 hover:text-slate-900">
                                                        {selectedEnquiry.email}
                                                    </a>
                                                </div>
                                                {selectedEnquiry.phone && (
                                                    <div className="flex items-center gap-3">
                                                        <Phone className="w-4 h-4 text-slate-400" />
                                                        <a href={`tel:${selectedEnquiry.phone}`} className="text-slate-700 hover:text-slate-900">
                                                            {selectedEnquiry.phone}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mb-8">
                                                <h3 className="text-sm font-medium text-slate-500 mb-3">Project Requirements</h3>
                                                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{selectedEnquiry.requirement}</p>
                                            </div>

                                            <div className="pt-6 border-t border-slate-100 flex gap-3">
                                                <a href={`mailto:${selectedEnquiry.email}`} className="flex-1 text-center bg-slate-900 text-white py-3 px-4 rounded-md hover:bg-slate-800 text-sm font-medium">
                                                    Reply via Email
                                                </a>
                                                {selectedEnquiry.phone && (
                                                    <a href={`https://wa.me/${selectedEnquiry.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 text-sm font-medium">
                                                        <MessageCircle className="w-4 h-4 inline mr-2" />
                                                        WhatsApp
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
                                            <Mail className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                            <p className="text-slate-500">Select an enquiry to view details</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* PROJECTS TAB */}
                {activeTab === 'projects' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-slate-900">Portfolio Projects</h2>
                            <button
                                onClick={() => { setShowProjectForm(true); setEditingProject(null); setProjectForm({ title: '', description: '', techStack: '', projectUrl: '', featured: false, imageUrl: '' }); }}
                                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 text-sm font-medium"
                            >
                                <Plus className="w-4 h-4" />
                                Add Project
                            </button>
                        </div>

                        {/* Project Form Modal */}
                        {showProjectForm && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
                                <div className="bg-white rounded-lg w-full max-w-lg p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-semibold text-slate-900">
                                            {editingProject ? 'Edit Project' : 'Add New Project'}
                                        </h3>
                                        <button onClick={() => setShowProjectForm(false)} className="text-slate-400 hover:text-slate-600">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                                            <input
                                                type="text"
                                                value={projectForm.title}
                                                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                                                className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
                                                placeholder="Project title"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                                            <textarea
                                                value={projectForm.description}
                                                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                                                className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
                                                rows={3}
                                                placeholder="Project description"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Tech Stack</label>
                                            <input
                                                type="text"
                                                value={projectForm.techStack}
                                                onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                                                className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
                                                placeholder="React, Node.js, MongoDB..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Project URL</label>
                                            <input
                                                type="url"
                                                value={projectForm.projectUrl}
                                                onChange={(e) => setProjectForm({ ...projectForm, projectUrl: e.target.value })}
                                                className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="featured"
                                                checked={projectForm.featured}
                                                onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                                                className="w-4 h-4"
                                            />
                                            <label htmlFor="featured" className="text-sm text-slate-700">Featured project</label>
                                        </div>
                                        
                                        {/* Image Upload */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Project Image</label>
                                            <div className="flex items-center gap-4">
                                                {projectForm.imageUrl ? (
                                                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200">
                                                        <img src={projectForm.imageUrl} alt="Project" className="w-full h-full object-cover" />
                                                        <button
                                                            onClick={() => setProjectForm({ ...projectForm, imageUrl: '' })}
                                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() => fileInputRef.current?.click()}
                                                        className="w-24 h-24 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-slate-400 transition-colors"
                                                    >
                                                        {uploading ? (
                                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600" />
                                                        ) : (
                                                            <>
                                                                <ImagePlus className="w-6 h-6 text-slate-400" />
                                                                <span className="text-xs text-slate-400 mt-1">Upload</span>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                                <div className="text-xs text-slate-500">
                                                    <p>Max 5MB</p>
                                                    <p>JPG, PNG, WebP</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        <button
                                            onClick={() => setShowProjectForm(false)}
                                            className="flex-1 px-4 py-2 border border-slate-200 rounded-md hover:bg-slate-50 text-sm font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={saveProject}
                                            disabled={saving}
                                            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 text-sm font-medium disabled:opacity-50"
                                        >
                                            <Save className="w-4 h-4" />
                                            {saving ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Projects List */}
                        {projects.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                                <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-700 mb-2">No projects yet</h3>
                                <p className="text-slate-500">Add your first project to showcase your work.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.map((project) => (
                                    <div key={project.id} className="bg-white rounded-lg border border-slate-200 p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-semibold text-slate-900">{project.title}</h3>
                                                {project.featured && (
                                                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Featured</span>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => editProject(project)} className="text-slate-400 hover:text-slate-600">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteProject(project.id)}
                                                    disabled={deleting === project.id}
                                                    className="text-red-400 hover:text-red-600 disabled:opacity-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{project.description}</p>
                                        {project.techStack && (
                                            <p className="text-xs text-slate-500 mb-4">{project.techStack}</p>
                                        )}
                                        {project.projectUrl && (
                                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800">
                                                <ExternalLink className="w-3 h-3" />
                                                View Project
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === 'settings' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-slate-900">Company Settings</h2>
                            {!editingSettings ? (
                                <button
                                    onClick={() => setEditingSettings(true)}
                                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 text-sm font-medium"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => { setEditingSettings(false); setSettingsForm(settings || settingsForm); }}
                                        className="px-4 py-2 border border-slate-200 rounded-md hover:bg-slate-50 text-sm font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={saveSettings}
                                        disabled={saving}
                                        className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 text-sm font-medium disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        {saving ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        value={settingsForm.companyName}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Primary Email</label>
                                    <input
                                        type="email"
                                        value={settingsForm.primaryEmail}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, primaryEmail: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Primary WhatsApp</label>
                                    <input
                                        type="tel"
                                        value={settingsForm.primaryWhatsApp}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, primaryWhatsApp: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Secondary WhatsApp</label>
                                    <input
                                        type="tel"
                                        value={settingsForm.secondaryWhatsApp}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, secondaryWhatsApp: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Lead 1 Name</label>
                                    <input
                                        type="text"
                                        value={settingsForm.leadName1}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, leadName1: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Lead 1 WhatsApp</label>
                                    <input
                                        type="tel"
                                        value={settingsForm.leadWhatsApp1}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, leadWhatsApp1: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Lead 2 Name</label>
                                    <input
                                        type="text"
                                        value={settingsForm.leadName2}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, leadName2: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Lead 2 WhatsApp</label>
                                    <input
                                        type="tel"
                                        value={settingsForm.leadWhatsApp2}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, leadWhatsApp2: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                                    <input
                                        type="text"
                                        value={settingsForm.address}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
                                    <input
                                        type="text"
                                        value={settingsForm.tagline}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                                        disabled={!editingSettings}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                    <textarea
                                        value={settingsForm.description}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, description: e.target.value })}
                                        disabled={!editingSettings}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
