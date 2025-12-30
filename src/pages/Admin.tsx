import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '@/lib/utils';
import { Trash2, Mail, Phone, Clock, ArrowLeft, RefreshCw, Lock, LogOut, Shield } from 'lucide-react';

// Admin password - change this to your secure password
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

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);

    // Check if already logged in (session)
    useEffect(() => {
        const session = sessionStorage.getItem('hexastack_admin_auth');
        const sessionTime = sessionStorage.getItem('hexastack_admin_time');
        
        // Session expires after 2 hours
        if (session === 'authenticated' && sessionTime) {
            const elapsed = Date.now() - parseInt(sessionTime);
            if (elapsed < 2 * 60 * 60 * 1000) { // 2 hours
                setIsAuthenticated(true);
            } else {
                sessionStorage.removeItem('hexastack_admin_auth');
                sessionStorage.removeItem('hexastack_admin_time');
            }
        }
        
        // Check if locked out
        const lockTime = localStorage.getItem('hexastack_lock_time');
        if (lockTime) {
            const elapsed = Date.now() - parseInt(lockTime);
            if (elapsed < 15 * 60 * 1000) { // 15 minutes lockout
                setIsLocked(true);
            } else {
                localStorage.removeItem('hexastack_lock_time');
                localStorage.removeItem('hexastack_attempts');
            }
        }
        
        const attempts = localStorage.getItem('hexastack_attempts');
        if (attempts) setLoginAttempts(parseInt(attempts));
    }, []);

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
        setSelectedEnquiry(null);
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

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

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this enquiry?')) return;

        setDeleting(id);
        try {
            const response = await fetch(`${API_URL}/api/contact/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setEnquiries(enquiries.filter(e => e.id !== id));
                if (selectedEnquiry?.id === id) {
                    setSelectedEnquiry(null);
                }
            }
        } catch (error) {
            console.error('Failed to delete:', error);
        } finally {
            setDeleting(null);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            await fetch(`${API_URL}/api/contact/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isRead: true }),
            });
            setEnquiries(enquiries.map(e =>
                e.id === id ? { ...e, isRead: true } : e
            ));
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
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
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLocked}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900 disabled:bg-slate-100 disabled:cursor-not-allowed"
                                        placeholder="Enter admin password"
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
                                className="w-full bg-slate-900 text-white py-3 px-4 rounded-md hover:bg-slate-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLocked ? 'Locked' : 'Access Admin'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">
                                ← Back to website
                            </Link>
                        </div>
                    </div>

                    <p className="text-center text-xs text-slate-400 mt-6">
                        Protected area. Unauthorized access prohibited.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="text-slate-500 hover:text-slate-700 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-xl font-semibold text-slate-900">
                                    Enquiries
                                </h1>
                                <p className="text-sm text-slate-500">
                                    {enquiries.length} total • {unreadCount} unread
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={fetchEnquiries}
                                className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                {loading && enquiries.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto mb-4" />
                        <p className="text-slate-500">Loading enquiries...</p>
                    </div>
                ) : enquiries.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                        <Mail className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h2 className="text-lg font-medium text-slate-700 mb-2">No enquiries yet</h2>
                        <p className="text-slate-500">New enquiries will appear here.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Enquiry List */}
                        <div className="md:col-span-1 space-y-2">
                            {enquiries.map((enquiry) => (
                                <div
                                    key={enquiry.id}
                                    onClick={() => {
                                        setSelectedEnquiry(enquiry);
                                        if (!enquiry.isRead) markAsRead(enquiry.id);
                                    }}
                                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                        selectedEnquiry?.id === enquiry.id
                                            ? 'bg-slate-900 text-white border-slate-900'
                                            : enquiry.isRead
                                                ? 'bg-white border-slate-200 hover:border-slate-300'
                                                : 'bg-blue-50 border-blue-200 hover:border-blue-300'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className={`font-medium truncate ${
                                            selectedEnquiry?.id === enquiry.id
                                                ? 'text-white'
                                                : 'text-slate-900'
                                        }`}>
                                            {enquiry.name}
                                        </h3>
                                        {!enquiry.isRead && selectedEnquiry?.id !== enquiry.id && (
                                            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                        )}
                                    </div>
                                    <p className={`text-sm truncate mb-2 ${
                                        selectedEnquiry?.id === enquiry.id
                                            ? 'text-slate-300'
                                            : 'text-slate-500'
                                    }`}>
                                        {enquiry.requirement}
                                    </p>
                                    <p className={`text-xs ${
                                        selectedEnquiry?.id === enquiry.id
                                            ? 'text-slate-400'
                                            : 'text-slate-400'
                                    }`}>
                                        {formatDate(enquiry.createdAt)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Enquiry Details */}
                        <div className="md:col-span-2">
                            {selectedEnquiry ? (
                                <div className="bg-white rounded-lg border border-slate-200 p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h2 className="text-xl font-semibold text-slate-900 mb-1">
                                                {selectedEnquiry.name}
                                            </h2>
                                            <div className="flex items-center gap-1 text-sm text-slate-500">
                                                <Clock className="w-4 h-4" />
                                                {formatDate(selectedEnquiry.createdAt)}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(selectedEnquiry.id)}
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
                                            <a
                                                href={`mailto:${selectedEnquiry.email}`}
                                                className="text-slate-700 hover:text-slate-900"
                                            >
                                                {selectedEnquiry.email}
                                            </a>
                                        </div>
                                        {selectedEnquiry.phone && (
                                            <div className="flex items-center gap-3">
                                                <Phone className="w-4 h-4 text-slate-400" />
                                                <a
                                                    href={`tel:${selectedEnquiry.phone}`}
                                                    className="text-slate-700 hover:text-slate-900"
                                                >
                                                    {selectedEnquiry.phone}
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-slate-500 mb-3">
                                            Project Requirements
                                        </h3>
                                        <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                                            {selectedEnquiry.requirement}
                                        </p>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-100 flex gap-3">
                                        <a
                                            href={`mailto:${selectedEnquiry.email}`}
                                            className="flex-1 text-center bg-slate-900 text-white py-3 px-4 rounded-md hover:bg-slate-800 transition-colors text-sm font-medium"
                                        >
                                            Reply via Email
                                        </a>
                                        {selectedEnquiry.phone && (
                                            <a
                                                href={`tel:${selectedEnquiry.phone}`}
                                                className="flex-1 text-center border border-slate-200 text-slate-700 py-3 px-4 rounded-md hover:bg-slate-50 transition-colors text-sm font-medium"
                                            >
                                                Call
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
                                    <Mail className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <p className="text-slate-500">
                                        Select an enquiry to view details
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
