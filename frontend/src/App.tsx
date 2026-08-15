import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { Chatbot } from './components/Chatbot';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable browser automatic scroll restoration on load/refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // If a lingering hash exists from a prior visit, reset it so browser doesn't auto-anchor
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // Scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <div className="relative min-h-screen text-white font-sans antialiased selection:bg-white/20 selection:text-white bg-black">
      {/* Cinematic Loading Overlay */}
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* ONE PERSISTENT GLOBAL CINEMATIC MOVING VIDEO BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute left-1/2 top-0 h-[120%] w-[120%] -translate-x-1/2 object-cover object-top pointer-events-none"
          onError={(e) => {
            console.error("Global background video failed to load", e);
          }}
        />
      </div>

      {/* GLOBAL READABILITY OVERLAY */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-black/25" />

      {/* Main Navigation (z-50) */}
      <Navbar />

      {/* ALL WEBSITE CONTENT (relative z-10) */}
      <div className="relative z-10">
        <main className="relative">
          <Hero />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <Chatbot />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
