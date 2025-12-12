import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import HeroForm from './pages/admin/HeroForm';
import FeaturesForm from './pages/admin/FeaturesForm';
import PricingForm from './pages/admin/PricingForm';

import GeneralForm from './pages/admin/GeneralForm';
import TestimonialsForm from './pages/admin/TestimonialsForm';
import FaqForm from './pages/admin/FaqForm';
import HeaderForm from './pages/admin/HeaderForm';
import ThemeForm from './pages/admin/ThemeForm';
import BannerSlidesForm from './pages/admin/BannerSlidesForm';

function App() {
  return (
    <Router>
      <ContentProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/theme" element={<ThemeForm />} />
              <Route path="/admin/header" element={<HeaderForm />} />
              <Route path="/admin/hero" element={<HeroForm />} />
              <Route path="/admin/banner-slides" element={<BannerSlidesForm />} />
              <Route path="/admin/features" element={<FeaturesForm />} />
              <Route path="/admin/pricing" element={<PricingForm />} />
              <Route path="/admin/testimonials" element={<TestimonialsForm />} />
              <Route path="/admin/faq" element={<FaqForm />} />
              <Route path="/admin/general" element={<GeneralForm />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ContentProvider>
    </Router>
  );
}

export default App;