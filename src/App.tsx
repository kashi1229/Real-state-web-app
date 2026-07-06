import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ListingsProvider } from './context/ListingsContext';
import { MessagesProvider } from './context/MessagesContext';
import { PublicLayout } from './components/layout/PublicLayout';
import { ChatWidget } from './components/layout/ChatWidget';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { Home } from './pages/Home';
import { Listings } from './pages/Listings';
import { ListingDetail } from './pages/ListingDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminListingsPage } from './pages/admin/AdminListings';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';

export default function App() {
  return (
    <AdminAuthProvider>
      <MessagesProvider>
        <ListingsProvider>
          <BrowserRouter>
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                style: {
                  fontFamily: 'Inter, system-ui, sans-serif',
                },
              }}
            />
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/listings/:slug" element={<ListingDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Route>

              <Route path="/admin" element={<AdminLogin />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/listings" element={<AdminListingsPage />} />
                  <Route path="/admin/messages" element={<AdminMessages />} />
                  <Route path="/admin/analytics" element={<AdminAnalytics />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>

            <ChatWidget />
          </BrowserRouter>
        </ListingsProvider>
      </MessagesProvider>
    </AdminAuthProvider>
  );
}
