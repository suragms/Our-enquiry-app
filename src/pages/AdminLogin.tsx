import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { API_URL } from '@/lib/utils';
import { Eye, EyeOff, ShieldCheck, Lock } from 'lucide-react';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/admin');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-blue opacity-[0.03] pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-md w-full space-y-8 relative z-10">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6">
                        <Lock className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground tracking-tight">
                        Admin Portal
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Secure access for authorized personnel only
                    </p>
                </div>

                <Card className="bg-card/80 backdrop-blur-xl border-white/50 shadow-xl">
                    <CardHeader className="space-y-1 pb-6 border-b border-border">
                        <CardTitle className="text-xl font-semibold text-foreground flex items-center justify-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-blue-600" />
                            Authentication Required
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                                    Email Address
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="admin@hexastack.com"
                                    className="bg-card border-input focus:border-blue-500 focus:ring-blue-500/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                                    Password
                                </label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="••••••••"
                                        className="bg-card border-input focus:border-blue-500 focus:ring-blue-500/20 pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400 hover:text-blue-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full btn-primary-gradient h-11 font-semibold text-base"
                                disabled={loading}
                            >
                                {loading ? 'Verifying Credentials...' : 'Sign In to Dashboard'}
                            </Button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-border">
                            <div className="bg-blue-50 rounded-lg p-4 text-sm text-muted-foreground border border-blue-100">
                                <p className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                    Demo Access
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <span className="text-slate-500 text-xs uppercase tracking-wider">Email</span>
                                        <p className="font-medium">admin@example.com</p>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 text-xs uppercase tracking-wider">Password</span>
                                        <p className="font-medium">admin123</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
