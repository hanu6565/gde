import React, { useRef, useEffect } from 'react';
import { useBrandData } from '../../context/BrandDataContext';
import { Sparkles, CalendarCheck, UtensilsCrossed, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const { heroSettings } = useBrandData();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        console.log('Video autoplay prevented:', err);
      });
    }
  }, [heroSettings.videoUrl]);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#191614'
      }}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
          filter: 'brightness(0.9) contrast(1.05)'
        }}
      >
        <source src={heroSettings.videoUrl} type="video/mp4" />
        {/* Fallback Image */}
        <img
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=80"
          alt="금등어 화덕구이"
        />
      </video>

      {/* Dark & Gold Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: `radial-gradient(circle at 30% 50%, rgba(25, 22, 20, ${heroSettings.overlayOpacity * 0.8}) 0%, rgba(15, 12, 10, ${heroSettings.overlayOpacity * 1.4}) 100%)`,
          mixBlendMode: 'multiply'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: 'linear-gradient(to right, rgba(15, 12, 10, 0.85) 0%, rgba(15, 12, 10, 0.4) 60%, rgba(15, 12, 10, 0.2) 100%)'
        }}
      />

      {/* Hero Content Container - Left Aligned */}
      <div
        className="container-custom"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          paddingTop: '3rem'
        }}
      >
        <div style={{ maxWidth: '820px' }}>
          {/* Sub Title / Brand Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(197, 168, 128, 0.15)',
              border: '1px solid rgba(197, 168, 128, 0.4)',
              backdropFilter: 'blur(8px)',
              padding: '0.45rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              color: 'var(--gold-light)',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              marginBottom: '1.75rem',
              animation: 'fadeIn 0.6s ease-out'
            }}
          >
            <Sparkles size={15} color="var(--gold-primary)" />
            <span>들안길 명품 화덕 생선구이 전문점</span>
          </div>

          {/* Main Copy (1 Line) - Customizable from Admin */}
          <h1
            style={{
              fontFamily: heroSettings.fontFamily || 'Noto Sans KR',
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: heroSettings.fontWeight || 800,
              color: heroSettings.textColor || '#FAF8F5',
              lineHeight: 1.25,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
              animation: 'fadeIn 0.8s ease-out'
            }}
          >
            {heroSettings.mainCopy}
          </h1>

          {/* Sub Copy (2 Lines) - Customizable from Admin */}
          <div
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
              color: '#E6DFD5',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              fontWeight: 400,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              animation: 'fadeIn 1s ease-out'
            }}
          >
            <p style={{ margin: 0, fontWeight: 500 }}>{heroSettings.subCopy1}</p>
            <p style={{ margin: 0, opacity: 0.9 }}>{heroSettings.subCopy2}</p>
          </div>

          {/* Action CTA Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              animation: 'fadeIn 1.2s ease-out'
            }}
          >
            <a
              href="#reservation"
              className="btn-primary"
              style={{
                fontSize: '1.05rem',
                padding: '1rem 2.2rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <CalendarCheck size={20} />
              <span>들안길 본점 예약하기</span>
            </a>

            <a
              href="#menu"
              className="btn-secondary"
              style={{
                fontSize: '1.05rem',
                padding: '1rem 2.2rem',
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#FAF8F5',
                borderColor: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <UtensilsCrossed size={20} />
              <span>시그니처 메뉴 보기</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#story"
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--gold-light)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontWeight: 600,
          opacity: 0.8,
          animation: 'floatSlow 2.5s infinite ease-in-out'
        }}
      >
        <span>SCROLL DOWN</span>
        <ChevronDown size={18} />
      </a>
    </section>
  );
}
