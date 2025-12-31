import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from '@/pages/Home';
import Work from '@/pages/Work';
import Contact from '@/pages/Contact';
import Admin from '@/pages/Admin';
import { API_URL } from '@/lib/utils';

// Track page views
function PageTracker() {
    const location = useLocation();

    useEffect(() => {
        // Track page view (fire and forget, don't wait)
        fetch(`${API_URL}/api/analytics/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page: location.pathname }),
        }).catch(() => {}); // Ignore errors silently
    }, [location.pathname]);

    return null;
}

function App() {
    return (
        <Router>
            <PageTracker />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}

export default App;
