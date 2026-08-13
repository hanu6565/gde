import React, { useState } from 'react';
import { useCrmData } from '../../context/CrmDataContext';
import {
  BarChart3,
  TrendingUp,
  Calendar,
  PieChart,
  Award,
  Clock,
  Printer,
  Download,
  Users,
  Utensils
} from 'lucide-react';

export default function AdminReports() {
  const { stats, customers } = useCrmData();
  const [period, setPeriod] = useState('month'); // 'week' | 'month' | 'year'

  // 최근 7일간 일별 매출 데이터
  const dailySales = [
    { day: '08/07 (목)', revenue: 4200000, orders: 48, percentage: 65 },
    { day: '08/08 (금)', revenue: 5800000, orders: 64, percentage: 85 },
    { day: '08/09 (토)', revenue: 7200000, orders: 82, percentage: 100 },
    { day: '08/10 (일)', revenue: 6900000, orders: 78, percentage: 95 },
    { day: '08/11 (월)', revenue: 3800000, orders: 42, percentage: 55 },
    { day: '08/12 (화)', revenue: 4100000, orders: 46, percentage: 60 },
    { day: '08/13 (오늘)', revenue: 4650000, orders: 52, percentage: 70 }
  ];

  // 인기 메뉴 TOP 5
  const topMenus = [
    { rank: 1, name: '화덕 고등어구이 솥밥 한상', count: 1420, revenue: 26980000, share: 38, isHot: true },
    { rank: 2, name: '누룩숙성 화덕 삼치구이 한상', count: 860, revenue: 18060000, share: 25, isHot: true },
    { rank: 3, name: '특선 고등어 묵은지조림 정식', count: 540, revenue: 12960000, share: 18, isHot: false },
    { rank: 4, name: '제주 은갈치 구이 한상', count: 320, revenue: 9280000, share: 12, isHot: false },
    { rank: 5, name: '제주 흑돼지 직화 제육볶음', count: 290, revenue: 4640000, share: 7, isHot: false }
  ];

  // 요일별 방문객 트래픽 분포 (%)
  const dayTraffic = [
    { day: '월', rate: 11, label: '340명' },
    { day: '화', rate: 12, label: '380명' },
    { day: '수', rate: 13, label: '410명' },
    { day: '목', rate: 14, label: '440명' },
    { day: '금', rate: 18, label: '620명' },
    { day: '토', rate: 22, label: '790명' },
    { day: '일', rate: 20, label: '710명' }
  ];

  // 피크 시간대 분석
  const timeSlots = [
    { time: '11:30 - 13:30', title: '점심 피크 (직장인/가족)', rate: 42, color: 'var(--gold-primary)' },
    { time: '13:30 - 15:30', title: '늦은 점심 및 티타임', rate: 16, color: '#A0988E' },
    { time: '17:30 - 19:30', title: '저녁 피크 (가족/단골 모임)', rate: 34, color: 'var(--flame-primary)' },
    { time: '19:30 - 21:00', title: '야간 디너 & 주류', rate: 8, color: '#7A726A' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Header Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            매출 및 고객 데이터 종합 리포트
          </h2>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            들안길 본점 포스 & 온라인 CRM 통합 분석 (기준일: 2026.08.13)
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{ display: 'flex', background: '#FFFFFF', padding: '0.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
            <button
              onClick={() => setPeriod('week')}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '4px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                background: period === 'week' ? 'var(--gold-gradient)' : 'transparent',
                color: period === 'week' ? '#191614' : 'var(--text-secondary)'
              }}
            >
              주간 리포트
            </button>
            <button
              onClick={() => setPeriod('month')}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '4px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                background: period === 'month' ? 'var(--gold-gradient)' : 'transparent',
                color: period === 'month' ? '#191614' : 'var(--text-secondary)'
              }}
            >
              월간 리포트
            </button>
          </div>

          <button
            onClick={() => window.print()}
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-light)',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--text-primary)'
            }}
          >
            <Printer size={15} />
            <span>리포트 인쇄</span>
          </button>
        </div>
      </div>

      {/* 1. Daily & Weekly Sales Trend Chart */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              최근 7일간 일별 매출 추이
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              주말(토/일) 피크 매출 700만원 이상 달성
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>주간 총 매출 </span>
            <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--flame-primary)' }}>
              ₩36,650,000
            </span>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '1.25rem',
            alignItems: 'flex-end',
            height: '240px',
            paddingTop: '2rem',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '1rem'
          }}
        >
          {dailySales.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--flame-primary)', marginBottom: '0.4rem' }}>
                {(item.revenue / 10000).toFixed(0)}만
              </span>
              <div
                style={{
                  width: '100%',
                  maxWidth: '48px',
                  height: `${item.percentage}%`,
                  background: item.day.includes('토') || item.day.includes('일') ? 'var(--gold-gradient)' : '#E0D8CE',
                  borderRadius: '6px 6px 0 0',
                  boxShadow: item.day.includes('토') || item.day.includes('일') ? '0 4px 12px rgba(197, 168, 128, 0.4)' : 'none',
                  transition: 'height 0.6s ease'
                }}
              />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '0.6rem' }}>
                {item.day.slice(0, 5)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Top Menus & Time Traffic Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.75rem'
        }}
      >
        {/* Top 5 Best Sellers */}
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
                인기 메뉴 베스트 5 판매 현황
              </h3>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                화덕 고등어구이 한상이 전체 매출의 38% 점유
              </p>
            </div>
            <Award size={20} color="var(--gold-dark)" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {topMenus.map((m) => (
              <div key={m.rank}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: m.rank <= 2 ? 'var(--gold-gradient)' : 'var(--bg-subtle)',
                        color: m.rank <= 2 ? '#191614' : 'var(--text-secondary)',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {m.rank}
                    </span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {m.name}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      ₩{m.revenue.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.4rem' }}>
                      ({m.count}건)
                    </span>
                  </div>
                </div>

                <div style={{ height: '6px', background: '#EDE8E1', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${m.share}%`,
                      background: m.rank === 1 ? 'var(--flame-primary)' : 'var(--gold-primary)',
                      borderRadius: '3px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Day & Time Slot Traffic Analysis */}
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
                방문 시간대 & 요일별 패턴 분석
              </h3>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                점심 11:30~13:30 및 금/토/일 집중 유입
              </p>
            </div>
            <Clock size={20} color="var(--gold-dark)" />
          </div>

          {/* Time Slots */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
            {timeSlots.map((ts, idx) => (
              <div key={idx} style={{ background: 'var(--bg-subtle)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>{ts.time}</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                      {ts.title}
                    </span>
                  </div>
                  <strong style={{ color: ts.color }}>{ts.rate}%</strong>
                </div>
                <div style={{ height: '5px', background: '#DDD7CE', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${ts.rate}%`, background: ts.color, borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Day Traffic Grid */}
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.6rem' }}>
              요일별 방문 집중도
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.4rem', textAlign: 'center' }}>
              {dayTraffic.map((d, idx) => (
                <div
                  key={idx}
                  style={{
                    background: d.day === '토' || d.day === '일' ? '#FDF2ED' : 'var(--bg-main)',
                    border: d.day === '토' || d.day === '일' ? '1px solid #F5C6B3' : '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.5rem 0.2rem'
                  }}
                >
                  <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 700, color: d.day === '토' || d.day === '일' ? 'var(--flame-primary)' : 'var(--text-primary)' }}>
                    {d.day}
                  </p>
                  <p style={{ margin: '0.15rem 0 0', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {d.rate}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
