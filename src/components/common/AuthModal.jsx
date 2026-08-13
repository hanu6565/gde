import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Flame, Shield, CheckCircle, Mail, Lock, User, Phone, Sparkles } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({
        name: name || (authMode === 'login' ? '금등어 VIP 회원' : '신규 회원'),
        email: email || 'user@geumdeungeo.com',
        role: 'customer'
      });
    }, 600);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={closeAuthModal}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '460px',
          background: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          animation: 'fadeIn 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon / Banner */}
        <div
          style={{
            background: 'var(--bg-dark)',
            padding: '2rem 2rem 1.5rem',
            position: 'relative',
            color: '#FAF8F5',
            textAlign: 'center'
          }}
        >
          <button
            onClick={closeAuthModal}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FAF8F5'
            }}
          >
            <X size={18} />
          </button>

          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'var(--gold-gradient)',
              margin: '0 auto 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(197, 168, 128, 0.4)'
            }}
          >
            <Flame size={26} color="#191614" />
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.35rem', letterSpacing: '-0.02em' }}>
            {authMode === 'login' ? '금등어 회원 로그인' : '금등어 멤버십 가입'}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--gold-light)' }}>
            {authMode === 'login'
              ? '누적 포인트 및 예약 혜택을 확인하세요'
              : '가입 즉시 2,000P 적립 & 화덕구이 업그레이드 쿠폰'}
          </p>

          {/* Supabase Ready Notice Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'rgba(197, 168, 128, 0.15)',
              border: '1px solid rgba(197, 168, 128, 0.3)',
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              color: 'var(--gold-light)',
              marginTop: '0.85rem'
            }}
          >
            <Sparkles size={12} />
            <span>Supabase Auth & CRM Ready</span>
          </div>
        </div>

        {/* Tab Toggle (Login / Sign up) */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-light)',
            background: 'var(--bg-subtle)'
          }}
        >
          <button
            onClick={() => setAuthMode('login')}
            style={{
              flex: 1,
              padding: '0.9rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: authMode === 'login' ? 'var(--text-primary)' : 'var(--text-muted)',
              background: authMode === 'login' ? '#FFFFFF' : 'transparent',
              borderBottom: authMode === 'login' ? '2px solid var(--gold-primary)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            로그인
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            style={{
              flex: 1,
              padding: '0.9rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: authMode === 'signup' ? 'var(--text-primary)' : 'var(--text-muted)',
              background: authMode === 'signup' ? '#FFFFFF' : 'transparent',
              borderBottom: authMode === 'signup' ? '2px solid var(--gold-primary)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            회원가입
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.75rem 2rem 2rem' }}>
          {authMode === 'signup' && (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  이름 (고객명)
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.925rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  연락처 (휴대폰 번호)
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="tel"
                    required
                    placeholder="010-1234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.925rem'
                    }}
                  />
                </div>
              </div>
            </>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
              이메일 주소
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="email"
                required
                placeholder="example@geumdeungeo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.925rem'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
              비밀번호
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.925rem'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '0.9rem',
              fontSize: '1rem',
              fontWeight: 700
            }}
          >
            {loading ? '처리 중...' : authMode === 'login' ? '로그인 하기' : '무료 회원가입 완료'}
          </button>

          {/* Social Quick Login Section */}
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <div style={{ height: '1px', background: 'var(--border-light)' }}></div>
              <span
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#FFFFFF',
                  padding: '0 0.75rem',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)'
                }}
              >
                또는 간편 로그인
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => login({ name: '카카오 고객', email: 'kakao@geumdeungeo.com' })}
                style={{
                  background: '#FEE500',
                  color: '#191919',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem'
                }}
              >
                <span>카카오로 시작</span>
              </button>
              <button
                type="button"
                onClick={() => login({ name: '네이버 고객', email: 'naver@geumdeungeo.com' })}
                style={{
                  background: '#03C75A',
                  color: '#FFFFFF',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem'
                }}
              >
                <span>네이버로 시작</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
