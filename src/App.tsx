import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ListingsProvider } from './context/ListingsContext';
import { MessagesProvider } from './context/MessagesContext';
import { PublicLayout } from './components/layout/PublicLayout';
import { ChatWidget } from './components/layout/ChatWidget';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Listings = lazy(() => import('./pages/Listings').then(m => ({ default: m.Listings })));
const ListingDetail = lazy(() => import('./pages/ListingDetail').then(m => ({ default: m.ListingDetail })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminListingsPage = lazy(() => import('./pages/admin/AdminListings').then(m => ({ default: m.AdminListingsPage })));
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages').then(m => ({ default: m.AdminMessages })));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics').then(m => ({ default: m.AdminAnalytics })));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-forest-800 border-t-transparent" />
    </div>
  );
}

function SPAFallback() {
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      sessionStorage.removeItem('redirect');
      navigate(redirect, { replace: true });
    }
  }, [navigate]);
  return null;
}

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
            <SPAFallback />
            <Suspense fallback={<PageLoader />}>
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
            </Suspense>

            <ChatWidget />
          </BrowserRouter>
        </ListingsProvider>
      </MessagesProvider>
    </AdminAuthProvider>
  );
}
