import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import AuthModal from '../components/common/AuthModal';
import PopupModal from '../components/common/PopupModal';
import HeroSection from '../components/home/HeroSection';
import BrandStorySection from '../components/home/BrandStorySection';
import SignatureMenuSection from '../components/home/SignatureMenuSection';
import InstagramFeedSection from '../components/home/InstagramFeedSection';
import StoreInfoSection from '../components/home/StoreInfoSection';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <HeroSection />
        <BrandStorySection />
        <SignatureMenuSection />
        <InstagramFeedSection />
        <StoreInfoSection />
      </main>
      <Footer />
      <AuthModal />
      <PopupModal />
    </div>
  );
}
