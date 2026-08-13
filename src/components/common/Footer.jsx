import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Instagram, MapPin, Phone, Clock, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-dark)',
        color: '#B8B0A5',
        borderTop: '1px solid var(--border-dark)',
        paddingTop: '5rem',
        paddingBottom: '3rem'
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '3.5rem',
            marginBottom: '4rem'
          }}
        >
          {/* Brand Info */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.25rem'
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'var(--gold-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Flame size={20} color="#191614" />
              </div>
              <span
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#FAF8F5'
                }}
              >
                금등어
              </span>
            </div>
            <p
              style={{
                fontSize: '0.925rem',
                lineHeight: 1.7,
                color: '#9E958C',
                marginBottom: '1.5rem'
              }}
            >
              누룩소금 48시간 저온숙성과 500℃ 화산석 화덕에서 갓 구워낸 최고의 생선구이, 당일 도정한 쌀로 지은 솥밥 한상을 선사합니다.
            </p>
            <a
              href="https://www.instagram.com/themackerel_/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--gold-light)',
                fontSize: '0.9rem',
                fontWeight: 600,
                background: 'rgba(197, 168, 128, 0.1)',
                border: '1px solid rgba(197, 168, 128, 0.3)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--gold-gradient)';
                e.currentTarget.style.color = '#191614';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(197, 168, 128, 0.1)';
                e.currentTarget.style.color = 'var(--gold-light)';
              }}
            >
              <Instagram size={17} />
              <span>@themackerel_ 공식 인스타그램</span>
            </a>
          </div>

          {/* Store Info */}
          <div>
            <h4
              style={{
                color: '#FAF8F5',
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: '1.25rem',
                letterSpacing: '-0.01em'
              }}
            >
              매장 정보
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                fontSize: '0.925rem'
              }}
            >
              <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <MapPin size={18} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>대구광역시 수성구 들안로 (들안길 맛집거리 본점)</span>
              </li>
              <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Phone size={18} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
                <span>053-765-8892 / 단체 룸 및 예약 문의</span>
              </li>
              <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <Clock size={18} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>매일 11:00 ~ 21:30 (라스트오더 20:40)<br />브레이크타임 15:30 ~ 17:00</span>
              </li>
            </ul>
          </div>

          {/* Quick Links & Admin */}
          <div>
            <h4
              style={{
                color: '#FAF8F5',
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: '1.25rem',
                letterSpacing: '-0.01em'
              }}
            >
              바로가기 & 관리자
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.925rem' }}>
              <a href="#story" style={{ color: '#B8B0A5' }} onMouseEnter={(e) => e.target.style.color = 'var(--gold-light)'} onMouseLeave={(e) => e.target.style.color = '#B8B0A5'}>
                브랜드 철학 소개
              </a>
              <a href="#menu" style={{ color: '#B8B0A5' }} onMouseEnter={(e) => e.target.style.color = 'var(--gold-light)'} onMouseLeave={(e) => e.target.style.color = '#B8B0A5'}>
                시그니처 메뉴 안내
              </a>
              <a href="#reservation" style={{ color: '#B8B0A5' }} onMouseEnter={(e) => e.target.style.color = 'var(--gold-light)'} onMouseLeave={(e) => e.target.style.color = '#B8B0A5'}>
                오시는 길 및 주차 안내
              </a>
              <div style={{ paddingTop: '0.5rem' }}>
                <Link
                  to="/admin"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--gold-primary)',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  <ShieldCheck size={16} />
                  <span>관리자 페이지(CRM/CMS) 바로가기 →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.8125rem',
            color: '#7A726A'
          }}
        >
          <p>© 2026 금등어 (The Mackerel). All rights reserved. 들안길 본점.</p>
          <p>상호명: 금등어 | 대표: 홍길동 | 사업자등록번호: 504-86-12345 | 통신판매업신고: 제2026-대구수성-0123호</p>
        </div>
      </div>
    </footer>
  );
}
