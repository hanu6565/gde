import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, User, LogIn, Menu, X, Flame, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { user, openAuthModal, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.35s ease',
        background: isScrolled
          ? 'rgba(25, 22, 20, 0.94)'
          : 'linear-gradient(180deg, rgba(15, 12, 10, 0.8) 0%, rgba(15, 12, 10, 0) 100%)',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(197, 168, 128, 0.2)' : 'none',
        boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.4)' : 'none'
      }}
    >
      <div
        className="container-custom"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: isScrolled ? '72px' : '90px',
          transition: 'height 0.35s ease'
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: '#FAF8F5'
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #DFCAAC 0%, #C5A880 50%, #9A7C54 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(197, 168, 128, 0.4)'
            }}
          >
            <Flame size={22} color="#191614" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: '#FAF8F5',
                lineHeight: 1.1
              }}
            >
              금등어
            </span>
            <span
              className="font-brand-en"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.22em',
                color: 'var(--gold-primary)',
                textTransform: 'uppercase',
                fontWeight: 600
              }}
            >
              The Mackerel
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2.5rem'
          }}
          className="desktop-nav"
        >
          <a
            href="#story"
            style={{
              color: '#FAF8F5',
              fontWeight: 500,
              fontSize: '1rem',
              letterSpacing: '-0.01em',
              opacity: 0.9,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--gold-primary)')}
            onMouseLeave={(e) => (e.target.style.color = '#FAF8F5')}
          >
            브랜드 철학
          </a>
          <a
            href="#menu"
            style={{
              color: '#FAF8F5',
              fontWeight: 500,
              fontSize: '1rem',
              letterSpacing: '-0.01em',
              opacity: 0.9,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--gold-primary)')}
            onMouseLeave={(e) => (e.target.style.color = '#FAF8F5')}
          >
            시그니처 메뉴
          </a>
          <a
            href="#instagram"
            style={{
              color: '#FAF8F5',
              fontWeight: 500,
              fontSize: '1rem',
              letterSpacing: '-0.01em',
              opacity: 0.9,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--gold-primary)')}
            onMouseLeave={(e) => (e.target.style.color = '#FAF8F5')}
          >
            인스타그램 갤러리
          </a>
          <a
            href="#reservation"
            style={{
              color: '#FAF8F5',
              fontWeight: 500,
              fontSize: '1rem',
              letterSpacing: '-0.01em',
              opacity: 0.9,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--gold-primary)')}
            onMouseLeave={(e) => (e.target.style.color = '#FAF8F5')}
          >
            오시는 길 & 예약
          </a>
        </nav>

        {/* Action Buttons: Login/Signup & Admin Link */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          {/* Supabase Auth Modal Trigger */}
          {user ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--gold-light)',
                background: 'rgba(255,255,255,0.08)',
                padding: '0.4rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem'
              }}
            >
              <User size={15} />
              <span>{user.name} 님</span>
              <button
                onClick={logout}
                style={{
                  background: 'none',
                  color: '#9E958C',
                  fontSize: '0.75rem',
                  marginLeft: '0.5rem',
                  textDecoration: 'underline'
                }}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => openAuthModal('login')}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#FAF8F5',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: '0.5rem 1.1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold-primary)';
                  e.currentTarget.style.color = 'var(--gold-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = '#FAF8F5';
                }}
              >
                <LogIn size={15} />
                로그인 / 회원가입
              </button>
            </div>
          )}

          {/* Admin Page Quick Link */}
          <Link
            to="/admin"
            style={{
              background: 'linear-gradient(135deg, #3A322C 0%, #24201D 100%)',
              color: 'var(--gold-light)',
              border: '1px solid var(--gold-dark)',
              padding: '0.5rem 1.1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--gold-gradient)';
              e.currentTarget.style.color = '#191614';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #3A322C 0%, #24201D 100%)';
              e.currentTarget.style.color = 'var(--gold-light)';
            }}
          >
            <ShieldCheck size={16} color="currentColor" />
            <span>관리자 페이지</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              color: '#FAF8F5',
              display: 'none',
              padding: '0.25rem'
            }}
            className="mobile-hamburger"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'rgba(25, 22, 20, 0.98)',
            borderTop: '1px solid rgba(197, 168, 128, 0.2)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#FAF8F5', fontSize: '1.1rem', fontWeight: 600 }}
          >
            브랜드 철학
          </a>
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#FAF8F5', fontSize: '1.1rem', fontWeight: 600 }}
          >
            시그니처 메뉴
          </a>
          <a
            href="#instagram"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#FAF8F5', fontSize: '1.1rem', fontWeight: 600 }}
          >
            인스타그램 갤러리
          </a>
          <a
            href="#reservation"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#FAF8F5', fontSize: '1.1rem', fontWeight: 600 }}
          >
            오시는 길 & 예약
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
        }
        @media (max-width: 899px) {
          .mobile-hamburger {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
