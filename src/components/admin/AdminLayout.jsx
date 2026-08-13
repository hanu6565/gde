import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Video,
  Layers,
  ArrowLeft,
  Flame,
  Bell,
  Search,
  ShieldAlert,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useCrmData } from '../../context/CrmDataContext';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { customers, orders } = useCrmData();

  const navItems = [
    { path: '/admin/dashboard', label: '대시보드', icon: LayoutDashboard, badge: null },
    { path: '/admin/customers', label: '고객관리 (CRM)', icon: Users, badge: `${customers.length}명` },
    { path: '/admin/reports', label: '통계 / 리포트', icon: BarChart3, badge: '실시간' },
    { path: '/admin/hero-settings', label: '첫번째 섹션 관리', icon: Video, badge: 'CMS' },
    { path: '/admin/popups', label: '팝업 관리', icon: Layers, badge: '이벤트' }
  ];

  const getPageTitle = () => {
    if (location.pathname.includes('/customers')) return '고객관리 (CRM)';
    if (location.pathname.includes('/reports')) return '통계 / 리포트 분석';
    if (location.pathname.includes('/hero-settings')) return '첫번째 섹션 (비디오/카피/폰트) 관리';
    if (location.pathname.includes('/popups')) return '이벤트 & 공지 팝업 관리';
    return '통합 관리 대시보드';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F2EC' }}>
      {/* Sidebar Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          background: '#191614',
          color: '#FAF8F5',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 100,
          borderRight: '1px solid rgba(197, 168, 128, 0.2)',
          transform: sidebarOpen ? 'translateX(0)' : undefined,
          transition: 'transform 0.3s ease'
        }}
        className="admin-sidebar"
      >
        {/* Admin Brand Header */}
        <div
          style={{
            padding: '1.75rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
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
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(197, 168, 128, 0.3)'
            }}
          >
            <Flame size={20} color="#191614" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#FAF8F5', lineHeight: 1.1 }}>
              금등어 관리자
            </h2>
            <span
              className="font-brand-en"
              style={{ fontSize: '0.7rem', color: 'var(--gold-light)', letterSpacing: '0.15em', fontWeight: 600 }}
            >
              CRM & CMS PORTAL
            </span>
          </div>
        </div>

        {/* Navigation Menu Links */}
        <nav style={{ padding: '1.5rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
          <span style={{ fontSize: '0.75rem', color: '#7A726A', padding: '0 0.75rem 0.5rem', fontWeight: 700, letterSpacing: '0.05em' }}>
            MAIN MENU
          </span>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path === '/admin/dashboard' && location.pathname === '/admin');

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  color: isActive ? '#191614' : '#C5BEB5',
                  background: isActive ? 'var(--gold-gradient)' : 'transparent',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.925rem',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 15px rgba(197, 168, 128, 0.3)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={19} color={isActive ? '#191614' : '#C5A880'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '0.15rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      background: isActive ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.08)',
                      color: isActive ? '#191614' : 'var(--gold-light)',
                      fontWeight: 600
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Home Link */}
        <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.06)',
              color: '#FAF8F5',
              fontSize: '0.875rem',
              fontWeight: 600,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--gold-primary)';
              e.currentTarget.style.color = 'var(--gold-light)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.color = '#FAF8F5';
            }}
          >
            <ArrowLeft size={16} />
            <span>금등어 홈페이지로 돌아가기</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }} className="admin-content-wrap">
        {/* Admin Top Header */}
        <header
          style={{
            height: '70px',
            background: '#FFFFFF',
            borderBottom: '1px solid var(--border-light)',
            padding: '0 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 90,
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                display: 'none',
                background: 'none',
                color: 'var(--text-primary)',
                padding: '0.25rem'
              }}
              className="admin-hamburger"
            >
              <Menu size={22} />
            </button>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {getPageTitle()}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Realtime Notification */}
            <div
              style={{
                position: 'relative',
                background: 'var(--bg-subtle)',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)'
              }}
            >
              <Bell size={18} />
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--flame-primary)'
                }}
              />
            </div>

            {/* Admin Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#24201D',
                  color: 'var(--gold-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}
              >
                관
              </div>
              <div style={{ display: 'none' }} className="admin-profile-text">
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>들안길 총괄 관리자</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>슈퍼 관리자 (Supabase DB)</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Body View */}
        <main style={{ padding: '2rem', flex: 1 }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .admin-profile-text {
            display: block !important;
          }
        }
        @media (max-width: 1024px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-content-wrap {
            margin-left: 0 !important;
          }
          .admin-hamburger {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
