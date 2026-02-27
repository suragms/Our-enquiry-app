import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Products from '@/pages/Products';
import Work from '@/pages/Work';
import Contact from '@/pages/Contact';
import Admin from '@/pages/Admin';
import Solutions from '@/pages/Solutions';
import Pricing from '@/pages/Pricing';
import Blog from '@/pages/Blog';
import About from '@/pages/About';
import HexaBill from '@/pages/products/HexaBill';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import { API_URL } from '@/lib/utils';

// Track page views
function PageTracker() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch(`${API_URL}/api/analytics/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page: location.pathname }),
        }).catch(() => { });
    }, [location.pathname]);

    return null;
}

function App() {
    return (
        <Router>
            <PageTracker />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/products" element={<Products />} />
                <Route path="/work" element={<Work />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/products/hexabill" element={<HexaBill />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}

export default App;
