import React, { useState } from 'react';
import { UtensilsCrossed, Flame, Sparkles, X, Check, Heart } from 'lucide-react';

const MENU_ITEMS = [
  {
    id: 'menu-1',
    category: 'grill',
    name: '화덕 고등어구이 솥밥 한상',
    englishName: 'Signature Wood-Fired Mackerel Set',
    price: 19000,
    badge: '대표 시그니처',
    isBest: true,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    description: '48시간 누룩소금으로 저온 숙성한 통통한 고등어를 500℃ 화덕에서 구워내어 갓 지은 곤드레 솥밥과 함께 차려내는 금등어의 대표 메뉴입니다.',
    includes: ['화덕 고등어구이 1마리', '갓 지은 제주 곤드레 솥밥', '제철 8첩 반찬 & 쌈채소', '시골 된장찌개', '숭늉 누룽지'],
    origin: '고등어(국내산 제주), 쌀(국내산 상주특등급), 곤드레(제주산)'
  },
  {
    id: 'menu-2',
    category: 'grill',
    name: '누룩숙성 화덕 삼치구이 한상',
    englishName: 'Wood-Fired Spanish Mackerel Set',
    price: 21000,
    badge: '인기',
    isBest: true,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    description: '부드럽고 담백한 삼치 순살을 누룩소금으로 촉촉하게 숙성하여 화덕에서 구워냅니다. 어린이나 부모님께 강력 추천합니다.',
    includes: ['화덕 삼치구이 특대', '갓 지은 솥밥', '제철 8첩 반찬', '시골 된장찌개', '숭늉 누룽지'],
    origin: '삼치(국내산 남해), 쌀(국내산)'
  },
  {
    id: 'menu-3',
    category: 'braised',
    name: '특선 고등어 묵은지조림 정식',
    englishName: 'Braised Mackerel with Aged Kimchi',
    price: 24000,
    badge: '특선 별미',
    isBest: false,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    description: '해남 2년 숙성 묵은지와 싱싱한 고등어, 비법 천연 과일 양념장으로 자작하게 졸여내어 밥도둑을 자처하는 깊고 칼칼한 조림입니다.',
    includes: ['특선 고등어 묵은지조림 (2인분 기준 주문 가능)', '영양 솥밥', '제철 반찬', '신선 쌈채소'],
    origin: '고등어(국내산), 묵은지(국내산 해남 배추/고춧가루)'
  },
  {
    id: 'menu-4',
    category: 'grill',
    name: '제주 은갈치 구이 한상',
    englishName: 'Jeju Hairtail Fish Set',
    price: 29000,
    badge: '프리미엄',
    isBest: false,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    description: '제주 청정 해역에서 당일 조업한 특대형 은갈치만을 엄선하여 화덕의 강한 불꽃으로 촉촉함을 극대화한 명품 한상입니다.',
    includes: ['제주 은갈치 구이 특대', '전복 영양 솥밥', '제철 8첩 반찬', '성게 미역국'],
    origin: '은갈치(국내산 제주), 전복(국내산 완도)'
  },
  {
    id: 'menu-5',
    category: 'side',
    name: '제주 흑돼지 직화 제육볶음',
    englishName: 'Spicy Flame Stir-fried Jeju Pork',
    price: 16000,
    badge: '곁들임 최고',
    isBest: false,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    description: '제주 흑돼지 생육을 불향 가득 직화로 볶아내어, 생선구이와 함께 곁들이기 가장 좋은 풍성한 단품 요리입니다.',
    includes: ['직화 흑돼지 제육볶음 (단품)', '신선 쌈채소 & 수제 쌈장'],
    origin: '돼지고기(국내산 제주 흑돼지)'
  },
  {
    id: 'menu-6',
    category: 'pot',
    name: '명품 활전복 영양 솥밥',
    englishName: 'Abalone Nutritious Pot Rice',
    price: 15000,
    badge: '건강 보양',
    isBest: false,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    description: '완도산 활전복과 게우(전복내장) 소스, 은행, 표고버섯, 단호박을 넣고 정성껏 지어낸 영양 가득 보양 솥밥입니다.',
    includes: ['활전복 영양 솥밥', '특제 양념 달래장', '시골 된장찌개'],
    origin: '전복(국내산 완도), 쌀(국내산)'
  }
];

export default function SignatureMenuSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMenu, setSelectedMenu] = useState(null);

  const filteredMenu = activeTab === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(m => m.category === activeTab);

  return (
    <section
      id="menu"
      className="section-padding"
      style={{
        background: 'var(--bg-subtle)',
        position: 'relative'
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>
            <UtensilsCrossed size={14} />
            <span>SIGNATURE DINING</span>
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
            정성을 담아 올리는 <span className="text-gold-gradient">금등어 한 상 차림</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            모든 정식 메뉴에는 당일 갓 지은 1인 솥밥과 8가지 계절 정갈 반찬, 구수한 된장찌개가 함께 제공됩니다.
          </p>

          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.6rem',
              marginTop: '2.5rem'
            }}
          >
            {[
              { id: 'all', label: '전체 메뉴' },
              { id: 'grill', label: '화덕 생선구이' },
              { id: 'braised', label: '특선 조림류' },
              { id: 'pot', label: '영양 솥밥' },
              { id: 'side', label: '곁들임 요리' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.65rem 1.4rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.925rem',
                  fontWeight: 600,
                  transition: 'all 0.25s',
                  background: activeTab === tab.id ? 'var(--gold-gradient)' : '#FFFFFF',
                  color: activeTab === tab.id ? '#191614' : 'var(--text-secondary)',
                  boxShadow: activeTab === tab.id ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
                  border: activeTab === tab.id ? 'none' : '1px solid var(--border-light)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2.25rem'
          }}
        >
          {filteredMenu.map(menu => (
            <div
              key={menu.id}
              onClick={() => setSelectedMenu(menu)}
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border-light)',
                transition: 'all 0.35s ease',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.style.borderColor = 'var(--gold-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
              }}
            >
              {/* Card Image */}
              <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
                <img
                  src={menu.image}
                  alt={menu.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    display: 'flex',
                    gap: '0.4rem'
                  }}
                >
                  <span
                    style={{
                      background: menu.isBest ? 'var(--gold-gradient)' : 'rgba(25, 22, 20, 0.8)',
                      color: menu.isBest ? '#191614' : '#FAF8F5',
                      padding: '0.3rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backdropFilter: 'blur(6px)'
                    }}
                  >
                    {menu.badge}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span
                  className="font-brand-en"
                  style={{ fontSize: '0.8125rem', color: 'var(--gold-dark)', fontWeight: 600, marginBottom: '0.3rem' }}
                >
                  {menu.englishName}
                </span>
                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem'
                  }}
                >
                  {menu.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.925rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                    flex: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {menu.description}
                </p>

                {/* Price & Action */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '1.25rem'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>1인 한상가 </span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--flame-primary)' }}>
                      {menu.price.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>원</span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: 'var(--gold-dark)',
                      textDecoration: 'underline'
                    }}
                  >
                    상세보기 +
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Detail Modal */}
      {selectedMenu && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2200,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setSelectedMenu(null)}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '600px',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-dark)',
              animation: 'fadeIn 0.3s ease-out',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative', height: '280px' }}>
              <img
                src={selectedMenu.image}
                alt={selectedMenu.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                onClick={() => setSelectedMenu(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={20} />
              </button>
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  left: '1.5rem',
                  background: 'var(--gold-gradient)',
                  color: '#191614',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8125rem',
                  fontWeight: 700
                }}
              >
                {selectedMenu.badge}
              </div>
            </div>

            <div style={{ padding: '2rem' }}>
              <span className="font-brand-en" style={{ fontSize: '0.875rem', color: 'var(--gold-dark)', fontWeight: 600 }}>
                {selectedMenu.englishName}
              </span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {selectedMenu.name}
                </h3>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--flame-primary)' }}>
                  {selectedMenu.price.toLocaleString()}원
                </span>
              </div>

              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                {selectedMenu.description}
              </p>

              {/* 한상 차림 구성 안내 */}
              <div
                style={{
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  marginBottom: '1.5rem'
                }}
              >
                <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  🍚 한상 정갈 차림 구성
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {selectedMenu.includes.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={16} color="var(--gold-dark)" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                <strong>원산지 정보:</strong> {selectedMenu.origin}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <a
                  href="#reservation"
                  onClick={() => setSelectedMenu(null)}
                  className="btn-primary"
                  style={{ flex: 1, padding: '0.9rem', fontSize: '1rem' }}
                >
                  들안길 본점 예약하기
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
