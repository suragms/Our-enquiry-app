import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import Home from '@/pages/Home';
import AdminDashboard from '@/pages/Admin';
import AdminLogin from '@/pages/AdminLogin';
import Portfolio from '@/pages/Portfolio';
import Feedback from '@/pages/Feedback';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/feedback/:token" element={<Feedback />} />
                </Routes>
            </Router>
            <Toaster />
        </ThemeProvider>
    );
}

export default App;
