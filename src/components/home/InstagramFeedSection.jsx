import React, { useState } from 'react';
import { Instagram, Star, Heart, MessageCircle, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const INSTA_POSTS = [
  {
    id: 'post-1',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    likes: '1,420',
    comments: '88',
    caption: '500도 화덕에서 바삭하게 구워진 금등어 대표 고등어구이 🐟 누룩소금으로 48시간 숙성해 육즙이 팡팡 터져요!'
  },
  {
    id: 'post-2',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    likes: '984',
    comments: '42',
    caption: '정갈한 8첩 계절 반찬과 갓 지은 곤드레 솥밥. 부모님 모시고 오기 가장 좋은 들안길 맛집 🍚'
  },
  {
    id: 'post-3',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    likes: '1,890',
    comments: '124',
    caption: '담백함의 끝판왕 삼치구이와 칼칼한 묵은지 고등어조림 조합은 사랑입니다 ✨ @themackerel_'
  },
  {
    id: 'post-4',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    likes: '2,110',
    comments: '156',
    caption: '화산석 화덕에서 갓 구워지는 불꽃의 순간 🔥 기름기는 쏙 빠지고 껍질은 과자처럼 바삭해요.'
  }
];

const REVIEWS = [
  {
    id: 1,
    name: '김*현 님 (들안길 단골)',
    date: '2026.08.11',
    rating: 5,
    menu: '화덕 고등어구이 솥밥 한상',
    content: '생선구이 집인데 옷에 냄새가 하나도 안 배고 너무 깔끔해요! 화덕에서 구워서 껍질은 바삭하고 속은 촉촉한 기름기가 꽉 차있습니다. 갓 지은 곤드레 솥밥 누룽지까지 완벽한 한 상이었습니다.'
  },
  {
    id: 2,
    name: '박*민 님 (가족 외식)',
    date: '2026.08.09',
    rating: 5,
    menu: '고등어 묵은지조림 & 삼치구이',
    content: '부모님 생신 모임으로 룸을 예약해서 다녀왔는데, 반찬 하나하나 정갈하고 묵은지조림이 정말 깊은 맛이 납니다. 직원분들도 너무 친절하셔서 VIP 단골 확정입니다.'
  },
  {
    id: 3,
    name: '이*은 님 (인스타 인플루언서)',
    date: '2026.08.05',
    rating: 5,
    menu: '제주 은갈치 구이 한상',
    content: '인스타에서 보고 찾아갔는데 비주얼 그 이상으로 맛있습니다. 들안길 생선구이 중 단연 1등! 매장 인테리어도 고급 한정식집 분위기라 데이트 코스로도 최고예요.'
  }
];

export default function InstagramFeedSection() {
  const [reviewIdx, setReviewIdx] = useState(0);

  const prevReview = () => {
    setReviewIdx((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setReviewIdx((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="instagram"
      className="section-padding"
      style={{
        background: 'var(--bg-main)',
        position: 'relative'
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>
            <Instagram size={14} />
            <span>INSTAGRAM & REVIEWS</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
              marginBottom: '1rem',
              letterSpacing: '-0.03em'
            }}
          >
            고객들이 전하는 <span className="text-gold-gradient">금등어의 미식 경험</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            공식 인스타그램 <a href="https://www.instagram.com/themackerel_/" target="_blank" rel="noreferrer" style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>@themackerel_</a> 에서 더 많은 일상을 만나보세요.
          </p>
        </div>

        {/* Instagram Grid Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4.5rem'
          }}
        >
          {INSTA_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/themackerel_/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                aspectRatio: '1 / 1',
                boxShadow: 'var(--shadow-sm)',
                display: 'block'
              }}
              className="insta-card"
            >
              <img
                src={post.image}
                alt="금등어 인스타그램 피드"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease'
                }}
              />
              {/* Overlay on hover */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(25, 22, 20, 0.75)',
                  backdropFilter: 'blur(3px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                  color: '#FFFFFF',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  textAlign: 'center'
                }}
                className="insta-overlay"
              >
                <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700 }}>
                    <Heart size={18} fill="#C5A880" color="#C5A880" /> {post.likes}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700 }}>
                    <MessageCircle size={18} color="#C5A880" /> {post.comments}
                  </span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: '#E0D9D0', lineHeight: 1.5, WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.caption}
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--gold-light)', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  인스타그램 보기 <ExternalLink size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Customer Review Carousel */}
        <div
          className="glass-panel"
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            padding: '3rem 2.5rem',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#C5A880" color="#C5A880" />
              ))}
            </div>
            <span style={{ fontSize: '0.8125rem', color: 'var(--gold-dark)', fontWeight: 700, background: 'var(--bg-subtle)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>
              {REVIEWS[reviewIdx].menu}
            </span>
          </div>

          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-primary)',
              lineHeight: 1.75,
              fontWeight: 500,
              marginBottom: '2rem',
              minHeight: '85px'
            }}
          >
            "{REVIEWS[reviewIdx].content}"
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--border-light)',
              paddingTop: '1.25rem'
            }}
          >
            <div>
              <p style={{ fontWeight: 700, color: 'var(--text-primary)', margin: 0, fontSize: '0.95rem' }}>
                {REVIEWS[reviewIdx].name}
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0 }}>
                방문일자: {REVIEWS[reviewIdx].date}
              </p>
            </div>

            {/* Carousel Arrow Controls */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={prevReview}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)'
                }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextReview}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)'
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .insta-card:hover .insta-overlay {
          opacity: 1 !important;
        }
        .insta-card:hover img {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
}
