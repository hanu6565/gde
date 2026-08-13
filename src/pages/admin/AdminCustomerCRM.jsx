import React, { useState } from 'react';
import { useCrmData } from '../../context/CrmDataContext';
import {
  Users,
  Search,
  Filter,
  Download,
  UserPlus,
  Coins,
  Shield,
  Eye,
  X,
  Plus,
  Minus,
  Check,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

export default function AdminCustomerCRM() {
  const {
    filteredCustomers,
    customers,
    filters,
    setFilters,
    resetFilters,
    stats,
    adjustPoints,
    updateGrade,
    addCustomer,
    exportToCsv
  } = useCrmData();

  // 모달 상태
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [pointModalCustomer, setPointModalCustomer] = useState(null);
  const [pointAmount, setPointAmount] = useState(5000);
  const [pointType, setPointType] = useState('add'); // 'add' | 'subtract'
  const [pointReason, setPointReason] = useState('단골 고객 우대 적립');

  // 신규 고객 등록 모달
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCustomerForm, setNewCustomerForm] = useState({
    name: '',
    phone: '',
    email: '',
    gender: 'female',
    ageGroup: '30s',
    memo: ''
  });

  const handlePointSubmit = (e) => {
    e.preventDefault();
    if (pointModalCustomer) {
      const finalAmount = pointType === 'add' ? Number(pointAmount) : -Number(pointAmount);
      adjustPoints(pointModalCustomer.id, finalAmount, pointReason);
      setPointModalCustomer(null);
    }
  };

  const handleAddCustomerSubmit = (e) => {
    e.preventDefault();
    addCustomer(newCustomerForm);
    setIsAddModalOpen(false);
    setNewCustomerForm({
      name: '',
      phone: '',
      email: '',
      gender: 'female',
      ageGroup: '30s',
      memo: ''
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top CRM Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem'
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>전체 고객 수</span>
          <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.35rem 0 0' }}>
            {stats.totalCustomers.toLocaleString()}명
          </h3>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>고객 총 누적매출</span>
          <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--flame-primary)', margin: '0.35rem 0 0' }}>
            ₩{stats.totalRevenue.toLocaleString()}
          </h3>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>누적 지급 포인트</span>
          <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--gold-dark)', margin: '0.35rem 0 0' }}>
            {stats.totalPoints.toLocaleString()}P
          </h3>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>평균 객단가</span>
          <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.35rem 0 0' }}>
            ₩{stats.avgOrderValue.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Filter Control Box (성, 연령, 고객등급, 구매빈도, 구매금액, 검색) */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SlidersHorizontal size={18} color="var(--gold-dark)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              CRM 정밀 다중 필터링
            </h3>
            <span
              style={{
                fontSize: '0.8125rem',
                background: 'var(--bg-subtle)',
                color: 'var(--text-secondary)',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600
              }}
            >
              조회 결과: {filteredCustomers.length}명
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={resetFilters}
              style={{
                background: 'var(--bg-subtle)',
                color: 'var(--text-secondary)',
                padding: '0.5rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <RefreshCw size={14} />
              <span>필터 초기화</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary"
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.8125rem',
                fontWeight: 700
              }}
            >
              <UserPlus size={15} />
              <span>신규 고객 등록</span>
            </button>
            <button
              onClick={exportToCsv}
              style={{
                background: '#2E7D32',
                color: '#FFFFFF',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Download size={15} />
              <span>엑셀(CSV) 다운로드</span>
            </button>
          </div>
        </div>

        {/* Filters Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '1rem',
            paddingTop: '0.5rem'
          }}
        >
          {/* 1. 검색어 */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              고객 검색 (이름/연락처/ID)
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              <input
                type="text"
                placeholder="고객명, 010-..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.55rem 0.55rem 2.1rem',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          </div>

          {/* 2. 성별 */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              성별 구분
            </label>
            <select
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
              style={{
                width: '100%',
                padding: '0.55rem',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <option value="all">전체 성별</option>
              <option value="female">여성 (Female)</option>
              <option value="male">남성 (Male)</option>
            </select>
          </div>

          {/* 3. 연령대 */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              연령대 구분
            </label>
            <select
              value={filters.ageGroup}
              onChange={(e) => setFilters({ ...filters, ageGroup: e.target.value })}
              style={{
                width: '100%',
                padding: '0.55rem',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <option value="all">전체 연령대</option>
              <option value="20s">20대 (청년층)</option>
              <option value="30s">30대 (핵심소비층)</option>
              <option value="40s">40대 (가족외식층)</option>
              <option value="50s">50대 (중장년층)</option>
              <option value="60s">60대 이상 (실버층)</option>
            </select>
          </div>

          {/* 4. 고객등급 */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              고객 등급
            </label>
            <select
              value={filters.grade}
              onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
              style={{
                width: '100%',
                padding: '0.55rem',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <option value="all">전체 등급</option>
              <option value="VIP">VIP (최우수 단골)</option>
              <option value="GOLD">GOLD (우수 회원)</option>
              <option value="SILVER">SILVER (일반 단골)</option>
              <option value="BRONZE">BRONZE (재방문)</option>
              <option value="일반">일반 (신규/첫방문)</option>
            </select>
          </div>

          {/* 5. 구매빈도 */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              구매 / 방문 빈도
            </label>
            <select
              value={filters.frequency}
              onChange={(e) => setFilters({ ...filters, frequency: e.target.value })}
              style={{
                width: '100%',
                padding: '0.55rem',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <option value="all">전체 빈도</option>
              <option value="weekly">주 1회 이상 (10회+ 단골)</option>
              <option value="monthly">월 2~3회 (4~9회 충성)</option>
              <option value="low">월 1회 이하 (1~3회)</option>
            </select>
          </div>

          {/* 6. 구매금액 구간 */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              누적 구매금액 기준
            </label>
            <select
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'all') setFilters({ ...filters, minSpent: 0, maxSpent: 5000000 });
                if (val === 'high') setFilters({ ...filters, minSpent: 1500000, maxSpent: 5000000 });
                if (val === 'mid') setFilters({ ...filters, minSpent: 500000, maxSpent: 1500000 });
                if (val === 'low') setFilters({ ...filters, minSpent: 0, maxSpent: 500000 });
              }}
              style={{
                width: '100%',
                padding: '0.55rem',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <option value="all">전체 금액대</option>
              <option value="high">150만원 이상 (고액 고객)</option>
              <option value="mid">50만원 ~ 150만원</option>
              <option value="low">50만원 미만</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer List Table */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.85rem 1rem' }}>회원번호</th>
                <th style={{ padding: '0.85rem 1rem' }}>고객명</th>
                <th style={{ padding: '0.85rem 1rem' }}>연락처</th>
                <th style={{ padding: '0.85rem 1rem' }}>성별/연령</th>
                <th style={{ padding: '0.85rem 1rem' }}>고객등급</th>
                <th style={{ padding: '0.85rem 1rem' }}>누적구매금액</th>
                <th style={{ padding: '0.85rem 1rem' }}>주문수</th>
                <th style={{ padding: '0.85rem 1rem' }}>보유포인트</th>
                <th style={{ padding: '0.85rem 1rem' }}>최근방문일</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>CRM 액션</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    일치하는 고객 데이터가 없습니다. 필터 조건을 변경해 보세요.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>{cust.id}</td>
                    <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>{cust.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{cust.phone}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                      {cust.gender === 'female' ? '여성' : '남성'} · {cust.ageGroup}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span
                        style={{
                          background:
                            cust.grade === 'VIP'
                              ? 'linear-gradient(135deg, #FBF6EE, #F5E8D3)'
                              : cust.grade === 'GOLD'
                              ? '#FFF8E7'
                              : cust.grade === 'SILVER'
                              ? '#F1F1F1'
                              : '#F8F8F8',
                          color:
                            cust.grade === 'VIP'
                              ? '#9A7C54'
                              : cust.grade === 'GOLD'
                              ? '#B8860B'
                              : '#555555',
                          border: cust.grade === 'VIP' ? '1px solid #E2D3BE' : '1px solid #E0E0E0',
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          fontWeight: 800
                        }}
                      >
                        {cust.grade}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 800, color: 'var(--flame-primary)' }}>
                      ₩{cust.totalSpent.toLocaleString()}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{cust.orderCount}회</td>
                    <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--gold-dark)' }}>
                      {cust.points.toLocaleString()}P
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                      {cust.recentVisit}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem' }}>
                        <button
                          onClick={() => setPointModalCustomer(cust)}
                          title="포인트 지급/차감"
                          style={{
                            background: 'var(--bg-subtle)',
                            color: 'var(--gold-dark)',
                            padding: '0.35rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            border: '1px solid var(--border-warm)'
                          }}
                        >
                          <Coins size={13} />
                          <span>포인트</span>
                        </button>
                        <button
                          onClick={() => setSelectedCustomer(cust)}
                          title="고객 상세 정보"
                          style={{
                            background: '#FFFFFF',
                            color: 'var(--text-secondary)',
                            padding: '0.35rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            border: '1px solid var(--border-light)'
                          }}
                        >
                          <Eye size={13} />
                          <span>상세</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2200,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-dark)',
              padding: '2rem'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{selectedCustomer.id}</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.1rem 0' }}>
                  {selectedCustomer.name} 고객 상세 CRM
                </h3>
              </div>
              <button onClick={() => setSelectedCustomer(null)} style={{ background: 'none' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', background: 'var(--bg-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>연락처</span>
                <p style={{ fontWeight: 700, margin: '0.2rem 0 0' }}>{selectedCustomer.phone}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>이메일</span>
                <p style={{ fontWeight: 700, margin: '0.2rem 0 0' }}>{selectedCustomer.email}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>누적 구매금액</span>
                <p style={{ fontWeight: 800, color: 'var(--flame-primary)', margin: '0.2rem 0 0' }}>
                  ₩{selectedCustomer.totalSpent.toLocaleString()}
                </p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>보유 포인트</span>
                <p style={{ fontWeight: 800, color: 'var(--gold-dark)', margin: '0.2rem 0 0' }}>
                  {selectedCustomer.points.toLocaleString()}P
                </p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>선호 메뉴</span>
                <p style={{ fontWeight: 700, margin: '0.2rem 0 0' }}>{selectedCustomer.favoriteMenu}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>가입일자</span>
                <p style={{ fontWeight: 700, margin: '0.2rem 0 0' }}>{selectedCustomer.joinDate}</p>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                등급 수동 변경
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['VIP', 'GOLD', 'SILVER', 'BRONZE', '일반'].map((grade) => (
                  <button
                    key={grade}
                    onClick={() => {
                      updateGrade(selectedCustomer.id, grade);
                      setSelectedCustomer({ ...selectedCustomer, grade });
                    }}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      background: selectedCustomer.grade === grade ? 'var(--gold-gradient)' : 'var(--bg-subtle)',
                      color: selectedCustomer.grade === grade ? '#191614' : 'var(--text-secondary)',
                      border: selectedCustomer.grade === grade ? 'none' : '1px solid var(--border-light)'
                    }}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                고객 특이사항 및 메모
              </label>
              <div style={{ padding: '0.75rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {selectedCustomer.memo || '등록된 메모가 없습니다.'}
              </div>
            </div>

            <button
              onClick={() => setSelectedCustomer(null)}
              className="btn-primary"
              style={{ width: '100%', padding: '0.75rem' }}
            >
              확인 완료
            </button>
          </div>
        </div>
      )}

      {/* Point Adjustment Modal */}
      {pointModalCustomer && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2200,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setPointModalCustomer(null)}
        >
          <form
            onSubmit={handlePointSubmit}
            style={{
              width: '100%',
              maxWidth: '440px',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              boxShadow: 'var(--shadow-dark)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {pointModalCustomer.name} 고객 포인트 관리
              </h3>
              <button type="button" onClick={() => setPointModalCustomer(null)} style={{ background: 'none' }}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              현재 보유 포인트: <strong style={{ color: 'var(--gold-dark)' }}>{pointModalCustomer.points.toLocaleString()}P</strong>
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <button
                type="button"
                onClick={() => setPointType('add')}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  background: pointType === 'add' ? '#E8F5E9' : 'var(--bg-subtle)',
                  color: pointType === 'add' ? '#2E7D32' : 'var(--text-secondary)',
                  border: pointType === 'add' ? '1px solid #81C784' : '1px solid var(--border-light)'
                }}
              >
                + 포인트 지급
              </button>
              <button
                type="button"
                onClick={() => setPointType('subtract')}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  background: pointType === 'subtract' ? '#FFEBEE' : 'var(--bg-subtle)',
                  color: pointType === 'subtract' ? '#C62828' : 'var(--text-secondary)',
                  border: pointType === 'subtract' ? '1px solid #E57373' : '1px solid var(--border-light)'
                }}
              >
                - 포인트 차감
              </button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                조정 포인트 금액
              </label>
              <input
                type="number"
                required
                min="100"
                step="100"
                value={pointAmount}
                onChange={(e) => setPointAmount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '1rem',
                  fontWeight: 700
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                지급/차감 사유
              </label>
              <input
                type="text"
                required
                value={pointReason}
                onChange={(e) => setPointReason(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
              포인트 변경 적용하기
            </button>
          </form>
        </div>
      )}

      {/* Add New Customer Modal */}
      {isAddModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2200,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setIsAddModalOpen(false)}
        >
          <form
            onSubmit={handleAddCustomerSubmit}
            style={{
              width: '100%',
              maxWidth: '480px',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              boxShadow: 'var(--shadow-dark)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                신규 고객 수동 등록
              </h3>
              <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ background: 'none' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  고객명 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={newCustomerForm.name}
                  onChange={(e) => setNewCustomerForm({ ...newCustomerForm, name: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  연락처 *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="010-1234-5678"
                  value={newCustomerForm.phone}
                  onChange={(e) => setNewCustomerForm({ ...newCustomerForm, phone: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  이메일
                </label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={newCustomerForm.email}
                  onChange={(e) => setNewCustomerForm({ ...newCustomerForm, email: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    성별
                  </label>
                  <select
                    value={newCustomerForm.gender}
                    onChange={(e) => setNewCustomerForm({ ...newCustomerForm, gender: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}
                  >
                    <option value="female">여성</option>
                    <option value="male">남성</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    연령대
                  </label>
                  <select
                    value={newCustomerForm.ageGroup}
                    onChange={(e) => setNewCustomerForm({ ...newCustomerForm, ageGroup: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}
                  >
                    <option value="20s">20대</option>
                    <option value="30s">30대</option>
                    <option value="40s">40대</option>
                    <option value="50s">50대</option>
                    <option value="60s">60대 이상</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  특이사항 메모
                </label>
                <textarea
                  rows={2}
                  placeholder="단골 우대, 특정 자리 선호 등"
                  value={newCustomerForm.memo}
                  onChange={(e) => setNewCustomerForm({ ...newCustomerForm, memo: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', resize: 'none' }}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
              고객 등록 완료
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
