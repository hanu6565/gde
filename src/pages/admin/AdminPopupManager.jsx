import React, { useState } from 'react';
import { useBrandData } from '../../context/BrandDataContext';
import { Layers, Plus, Trash2, Eye, Check, X, Sparkles, Power, ExternalLink } from 'lucide-react';

export default function AdminPopupManager() {
  const { popups, addPopup, updatePopup, togglePopupStatus, deletePopup } = useBrandData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [previewPopup, setPreviewPopup] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    badge: '특별 이벤트',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    linkText: '예약하고 혜택받기',
    linkUrl: '#reservation',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: '2026-09-30',
    isActive: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addPopup(formData);
    setIsFormOpen(false);
    setFormData({
      title: '',
      badge: '특별 이벤트',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
      linkText: '예약하고 혜택받기',
      linkUrl: '#reservation',
      startDate: new Date().toISOString().slice(0, 10),
      endDate: '2026-09-30',
      isActive: true
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            이벤트 & 공지 팝업 관리
          </h2>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            메인 홈페이지 접속 시 띄울 프로모션 및 이벤트 팝업을 등록하고 노출 상태를 제어합니다.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="btn-primary"
          style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}
        >
          <Plus size={16} />
          <span>신규 팝업 등록하기</span>
        </button>
      </div>

      {/* Popups Table */}
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
                <th style={{ padding: '0.85rem 1rem' }}>미리보기</th>
                <th style={{ padding: '0.85rem 1rem' }}>팝업 제목</th>
                <th style={{ padding: '0.85rem 1rem' }}>뱃지 태그</th>
                <th style={{ padding: '0.85rem 1rem' }}>노출 기간</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>노출 상태</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>관리</th>
              </tr>
            </thead>
            <tbody>
              {popups.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    등록된 팝업이 없습니다. 상단의 '신규 팝업 등록하기' 버튼을 눌러 등록해 보세요.
                  </td>
                </tr>
              ) : (
                popups.map((popup) => (
                  <tr key={popup.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ width: '60px', height: '40px', borderRadius: '6px', overflow: 'hidden' }}>
                        <img src={popup.imageUrl} alt={popup.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <p style={{ fontWeight: 700, color: 'var(--text-primary)', margin: 0, fontSize: '0.95rem' }}>
                        {popup.title}
                      </p>
                      <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '320px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {popup.description}
                      </p>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className="badge-gold" style={{ fontSize: '0.75rem' }}>
                        {popup.badge || '공지'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                      {popup.startDate} ~ {popup.endDate}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        onClick={() => togglePopupStatus(popup.id)}
                        style={{
                          background: popup.isActive ? '#E8F5E9' : 'var(--bg-subtle)',
                          color: popup.isActive ? '#2E7D32' : 'var(--text-muted)',
                          border: popup.isActive ? '1px solid #81C784' : '1px solid var(--border-light)',
                          padding: '0.35rem 0.8rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          cursor: 'pointer'
                        }}
                      >
                        <Power size={13} />
                        <span>{popup.isActive ? '현재 노출중' : '비활성'}</span>
                      </button>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem' }}>
                        <button
                          onClick={() => setPreviewPopup(popup)}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid var(--border-light)',
                            padding: '0.35rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('이 팝업을 삭제하시겠습니까?')) {
                              deletePopup(popup.id);
                            }
                          }}
                          style={{
                            background: '#FFEBEE',
                            border: '1px solid #FFCDD2',
                            padding: '0.35rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            color: '#C62828'
                          }}
                        >
                          <Trash2 size={14} />
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

      {/* New Popup Modal */}
      {isFormOpen && (
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
          onClick={() => setIsFormOpen(false)}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              width: '100%',
              maxWidth: '540px',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              boxShadow: 'var(--shadow-dark)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                신규 프로모션/공지 팝업 등록
              </h3>
              <button type="button" onClick={() => setIsFormOpen(false)} style={{ background: 'none' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  팝업 제목 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 들안길 본점 리뉴얼 기념 솥밥 무료 이벤트"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', fontWeight: 700 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    상단 뱃지 태그
                  </label>
                  <input
                    type="text"
                    placeholder="예: 특별 혜택, 공지사항"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    기본 노출 상태
                  </label>
                  <select
                    value={formData.isActive ? 'true' : 'false'}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontWeight: 600 }}
                  >
                    <option value="true">즉시 노출 (활성)</option>
                    <option value="false">비노출 (비활성 저장)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  배너 이미지 URL
                </label>
                <input
                  type="url"
                  placeholder="https://.../banner.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  팝업 상세 설명 문구 *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="이벤트 혜택 내용 및 참여 방법을 입력하세요."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    버튼 문구
                  </label>
                  <input
                    type="text"
                    value={formData.linkText}
                    onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    이동 링크 URL
                  </label>
                  <input
                    type="text"
                    value={formData.linkUrl}
                    onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    노출 시작일
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    노출 종료일
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
              팝업 등록 완료하기
            </button>
          </form>
        </div>
      )}

      {/* Preview Modal */}
      {previewPopup && (
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
          onClick={() => setPreviewPopup(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-dark)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ height: '180px', position: 'relative' }}>
              <img src={previewPopup.imageUrl} alt={previewPopup.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                onClick={() => setPreviewPopup(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0,0,0,0.5)',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={16} />
              </button>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <span className="badge-gold" style={{ marginBottom: '0.5rem' }}>{previewPopup.badge}</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.5rem 0' }}>{previewPopup.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {previewPopup.description}
              </p>
              <button className="btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem' }}>
                {previewPopup.linkText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
