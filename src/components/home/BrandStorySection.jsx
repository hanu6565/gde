import React from 'react';
import { Flame, Clock, Sparkles, Award } from 'lucide-react';

export default function BrandStorySection() {
  const values = [
    {
      icon: <Clock size={28} color="var(--gold-primary)" />,
      tag: '01. 숙성의 미학',
      title: '48시간 누룩소금 저온 숙성',
      description: '전통 쌀누룩 발효 소금으로 48시간 동안 깊게 저온 숙성하여, 비린내는 완벽히 잡고 고등어 본연의 감칠맛과 촉촉한 육즙을 극대화합니다.'
    },
    {
      icon: <Flame size={28} color="var(--flame-primary)" />,
      tag: '02. 장인의 불꽃',
      title: '500℃ 화산석 화덕 직화',
      description: '순간 온도 500℃에 달하는 이탈리아산 천연 화산석 화덕에서 겉은 황금빛으로 바삭하게, 속은 부드럽고 촉촉하게 구워냅니다.'
    },
    {
      icon: <Sparkles size={28} color="var(--gold-primary)" />,
      tag: '03. 정성의 한 상',
      title: '당일 도정 갓 지은 솥밥',
      description: '주문 즉시 1인용 개별 솥에 도정한 지 7일 이내의 특등급 쌀과 제주 곤드레나물을 담아 가장 따뜻하고 향긋한 솥밥을 지어 올립니다.'
    }
  ];

  return (
    <section
      id="story"
      className="section-padding"
      style={{
        background: 'var(--bg-main)',
        position: 'relative'
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4.5rem' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>
            <Award size={14} />
            <span>BRAND PHILOSOPHY</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
              marginBottom: '1.25rem',
              letterSpacing: '-0.03em'
            }}
          >
            바다의 신선함에 <span className="text-gold-gradient">정성과 불의 온기</span>를 더합니다
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            금등어는 타협하지 않는 식재료 선별과 48시간의 발효 과학, 500도 화덕의 폭발적인 화력으로
            생선구이의 새로운 기준을 제시합니다.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          {values.map((v, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '2.5rem 2rem',
                background: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.borderColor = 'var(--gold-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.borderColor = 'var(--border-warm)';
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}
              >
                {v.icon}
              </div>
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: 'var(--gold-dark)',
                  letterSpacing: '0.05em',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}
              >
                {v.tag}
              </span>
              <h3
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em'
                }}
              >
                {v.title}
              </h3>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7
                }}
              >
                {v.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Highlight Banner */}
        <div
          style={{
            marginTop: '4rem',
            background: 'var(--bg-dark)',
            borderRadius: 'var(--radius-lg)',
            padding: '3.5rem 3rem',
            color: '#FAF8F5',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-dark)'
          }}
        >
          <div>
            <div className="badge-gold" style={{ marginBottom: '1rem' }}>
              <Flame size={14} />
              <span>THE MACKEREL SECRET</span>
            </div>
            <h3
              style={{
                fontSize: '1.85rem',
                fontWeight: 800,
                lineHeight: 1.35,
                marginBottom: '1rem',
                color: '#FAF8F5'
              }}
            >
              기름기는 쏙 빠지고, <br />
              <span className="text-gold-gradient">육즙은 그대로 가두는 화덕</span>의 마법
            </h3>
            <p style={{ color: '#B8B0A5', fontSize: '0.975rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              일반 팬이나 그릴에서 구울 때 발생하는 미세먼지와 기름 튐 없이, 500도 원적외선 화덕에서
              고등어의 껍질은 과자처럼 바삭하게 구워지고 속살은 촉촉한 벨벳처럼 녹아내립니다.
            </p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--gold-primary)', margin: 0 }}>48h</p>
                <p style={{ fontSize: '0.8125rem', color: '#9E958C', margin: 0 }}>누룩소금 저온숙성</p>
              </div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              <div>
                <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--gold-primary)', margin: 0 }}>500℃</p>
                <p style={{ fontSize: '0.8125rem', color: '#9E958C', margin: 0 }}>화산석 화덕직화</p>
              </div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              <div>
                <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--gold-primary)', margin: 0 }}>100%</p>
                <p style={{ fontSize: '0.8125rem', color: '#9E958C', margin: 0 }}>갓 도정 솥밥</p>
              </div>
            </div>
          </div>

          {/* Visual Image */}
          <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '280px' }}>
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
              alt="금등어 화덕 직화"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(25,22,20,0.7) 100%)'
              }}
            />
            <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FAF8F5', margin: 0 }}>
                대구 들안길 본점 500℃ 화산석 화덕 현장
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
