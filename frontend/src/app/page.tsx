'use client';

import Footer from '@/components/Landing/Footer';
import Header from '@/components/Landing/Header';
import MainContent from '@/components/Landing/MainContent';
import Navbar from '@/components/Landing/Navbar';

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
