import React from 'react';
import { useCrmData } from '../../context/CrmDataContext';
import { Link } from 'react-router-dom';
import {
  Users,
  CreditCard,
  ShoppingBag,
  Coins,
  TrendingUp,
  UserPlus,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Clock
} from 'lucide-react';

export default function AdminDashboard() {
  const { customers, orders, stats } = useCrmData();

  // 최근 가입한 신규 고객 (최근 5명)
  const recentNewCustomers = [...customers].sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate)).slice(0, 5);

  const kpiCards = [
    {
      title: '전체 등록 고객 수',
      value: `${stats.totalCustomers.toLocaleString()}명`,
      change: '+14.2% 지난달 대비',
      icon: Users,
      color: '#C5A880',
      bg: '#FAF5EE'
    },
    {
      title: '이번 달 누적 매출액',
      value: `₩${stats.totalRevenue.toLocaleString()}`,
      change: '+18.5% 지난달 대비',
      icon: CreditCard,
      color: '#C85A32',
      bg: '#FDF2ED'
    },
    {
      title: '총 누적 거래 건수',
      value: `${stats.totalOrders.toLocaleString()}건`,
      change: '+9.3% 지난달 대비',
      icon: ShoppingBag,
      color: '#8A6D3B',
      bg: '#F7F3EB'
    },
    {
      title: '회원 지급 누적 포인트',
      value: `${stats.totalPoints.toLocaleString()}P`,
      change: '평균 사용률 68%',
      icon: Coins,
      color: '#2B7A78',
      bg: '#EDF7F7'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #24201D 0%, #191614 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem 2.5rem',
          color: '#FAF8F5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid rgba(197, 168, 128, 0.25)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span
              style={{
                background: 'var(--gold-gradient)',
                color: '#191614',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              LIVE CRM
            </span>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--gold-light)' }}>
              들안길 본점 실시간 매장 데이터베이스
            </p>
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            금등어 총괄 매니저 대시보드
          </h2>
          <p style={{ margin: '0.5rem 0 0', color: '#B8B0A5', fontSize: '0.925rem' }}>
            실시간 고객 등록 현황 및 매출, 등급별 CRM 분석 지표를 한눈에 확인하세요.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link
            to="/admin/customers"
            className="btn-primary"
            style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem' }}
          >
            <Users size={16} />
            <span>고객관리 CRM 바로가기</span>
          </Link>
          <Link
            to="/admin/hero-settings"
            className="btn-dark"
            style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem' }}
          >
            <span>홈페이지 영상/카피 편집</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {card.title}
                </span>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: card.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon size={20} color={card.color} />
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.35rem' }}>
                  {card.value}
                </h3>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: '#1B8A5A', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                  <TrendingUp size={13} />
                  <span>{card.change}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Distribution Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.75rem'
        }}
      >
        {/* Customer Tier Distribution Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                고객 등급별 분포 현황
              </h3>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                총 {stats.totalCustomers}명의 회원 등급 현황
              </p>
            </div>
            <span className="badge-gold">CRM 자동 산정</span>
          </div>

          {/* Tier Distribution Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { grade: 'VIP', count: stats.gradeCounts.VIP, color: 'linear-gradient(90deg, #D4AF37, #C5A880)', desc: '누적 150만원 이상 단골' },
              { grade: 'GOLD', count: stats.gradeCounts.GOLD, color: '#C5A880', desc: '누적 80만원 이상' },
              { grade: 'SILVER', count: stats.gradeCounts.SILVER, color: '#A0988E', desc: '누적 40만원 이상' },
              { grade: 'BRONZE', count: stats.gradeCounts.BRONZE, color: '#CD7F32', desc: '누적 15만원 이상' },
              { grade: '일반', count: stats.gradeCounts.일반, color: '#D6D0C7', desc: '신규 및 첫 방문' }
            ].map((item, idx) => {
              const percentage = Math.round((item.count / stats.totalCustomers) * 100) || 0;
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.grade}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({item.desc})</span>
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.count}명 ({percentage}%)
                    </span>
                  </div>
                  <div style={{ height: '8px', background: '#EDE8E1', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${percentage}%`,
                        background: item.color,
                        borderRadius: '4px',
                        transition: 'width 0.6s ease'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Realtime Customer Registrations Stream */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                실시간 고객 등록 현황
              </h3>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                방금 가입 및 등록된 회원 목록
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#1B8A5A', fontSize: '0.8125rem', fontWeight: 600 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1B8A5A', display: 'inline-block' }} />
              <span>실시간 동기화 중</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {recentNewCustomers.map((c, idx) => (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      color: 'var(--gold-dark)',
                      fontSize: '0.85rem',
                      border: '1px solid var(--border-warm)'
                    }}
                  >
                    {c.name.slice(0, 1)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.925rem' }}>
                        {c.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          background: c.grade === 'VIP' ? '#FAF3E0' : '#EFECE6',
                          color: c.grade === 'VIP' ? '#9A7C54' : '#6B635B',
                          padding: '0.1rem 0.4rem',
                          borderRadius: 'var(--radius-full)',
                          fontWeight: 700
                        }}
                      >
                        {c.grade}
                      </span>
                    </div>
                    <p style={{ margin: '0.15rem 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {c.phone} | 가입일: {c.joinDate}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--flame-primary)' }}>
                    +{c.points.toLocaleString()}P
                  </span>
                  <p style={{ margin: '0.1rem 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {c.gender === 'female' ? '여성' : '남성'} · {c.ageGroup}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders & Transactions Table */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              최근 주문 및 결제 내역
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              들안길 본점 실시간 포스 연동 거래 내역
            </p>
          </div>
          <Link
            to="/admin/reports"
            style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--gold-dark)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <span>매출 리포트 전체보기</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.85rem 1rem' }}>주문번호</th>
                <th style={{ padding: '0.85rem 1rem' }}>고객명</th>
                <th style={{ padding: '0.85rem 1rem' }}>주문 메뉴</th>
                <th style={{ padding: '0.85rem 1rem' }}>테이블</th>
                <th style={{ padding: '0.85rem 1rem' }}>결제금액</th>
                <th style={{ padding: '0.85rem 1rem' }}>시간</th>
                <th style={{ padding: '0.85rem 1rem' }}>상태</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ord) => (
                <tr key={ord.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>{ord.id}</td>
                  <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{ord.customerName}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{ord.menu}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{ord.table}</td>
                  <td style={{ padding: '1rem', fontWeight: 800, color: 'var(--flame-primary)' }}>
                    ₩{ord.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{ord.time}</td>
                  <td style={{ padding: '1rem' }}>
                    <span
                      style={{
                        background: '#E8F5E9',
                        color: '#2E7D32',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}
                    >
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
