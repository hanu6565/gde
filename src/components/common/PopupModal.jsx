import React from 'react';
import { useBrandData } from '../../context/BrandDataContext';
import { X, Sparkles, ArrowRight } from 'lucide-react';

export default function PopupModal() {
  const { activePopup, dismissPopup } = useBrandData();

  if (!activePopup) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1900,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={() => dismissPopup(false)}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '440px',
          background: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
          animation: 'fadeIn 0.35s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Popup Image Header */}
        <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden' }}>
          <img
            src={activePopup.imageUrl || 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80'}
            alt={activePopup.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)'
            }}
          />
          {activePopup.badge && (
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: 'var(--gold-gradient)',
                color: '#191614',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              <Sparkles size={13} />
              <span>{activePopup.badge}</span>
            </div>
          )}
          <button
            onClick={() => dismissPopup(false)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(0, 0, 0, 0.5)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem 1.75rem' }}>
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem',
              lineHeight: 1.35
            }}
          >
            {activePopup.title}
          </h3>
          <p
            style={{
              fontSize: '0.925rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '1.5rem'
            }}
          >
            {activePopup.description}
          </p>

          {activePopup.linkText && (
            <a
              href={activePopup.linkUrl || '#'}
              onClick={() => dismissPopup(false)}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                marginBottom: '1rem'
              }}
            >
              <span>{activePopup.linkText}</span>
              <ArrowRight size={16} />
            </a>
          )}

          {/* Footer Controls: Do not show today & Close */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--border-light)',
              paddingTop: '0.85rem',
              fontSize: '0.8125rem',
              color: 'var(--text-muted)'
            }}
          >
            <button
              onClick={() => dismissPopup(true)}
              style={{
                background: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.8125rem',
                textDecoration: 'underline'
              }}
            >
              오늘 하루 보지 않기
            </button>
            <button
              onClick={() => dismissPopup(false)}
              style={{
                background: 'none',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '0.8125rem'
              }}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
