import React, { useState } from 'react';
import { useBrandData, VIDEO_PRESETS } from '../../context/BrandDataContext';
import { Video, Type, Check, RefreshCw, Eye, Sparkles, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminHeroSettings() {
  const { heroSettings, updateHeroSettings, resetHeroSettings } = useBrandData();

  const [formData, setFormData] = useState({ ...heroSettings });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      videoUrl: preset.url,
      videoPresetId: preset.id
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateHeroSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('첫번째 섹션 설정을 기본값으로 초기화하시겠습니까?')) {
      resetHeroSettings();
      setFormData({ ...heroSettings });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            첫번째 섹션 (Hero) 비주얼 & 카피 관리
          </h2>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            홈페이지 최상단 배경 비디오, 메인 카피(1줄), 서브카피(2줄) 및 폰트를 실시간으로 변경합니다.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link
            to="/"
            target="_blank"
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-light)',
              padding: '0.6rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--text-primary)'
            }}
          >
            <Eye size={15} />
            <span>실제 홈페이지 확인</span>
            <ExternalLink size={12} />
          </Link>

          <button
            onClick={handleReset}
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              padding: '0.6rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--text-secondary)'
            }}
          >
            <RefreshCw size={14} />
            <span>기본값 복원</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div
          style={{
            background: '#E8F5E9',
            border: '1px solid #81C784',
            color: '#2E7D32',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontWeight: 700,
            fontSize: '0.925rem',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <Check size={20} />
          <span>설정이 성공적으로 저장되었습니다! 홈페이지 첫번째 섹션에 실시간 적용되었습니다.</span>
        </div>
      )}

      {/* Main Grid: Form Controls & Live Preview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}
      >
        {/* Form Controls Column */}
        <form
          onSubmit={handleSave}
          style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem'
          }}
        >
          {/* 1. 배경 비디오 설정 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.85rem' }}>
              <Video size={18} color="var(--gold-dark)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                1. 배경 비디오 선택 & 설정
              </h3>
            </div>

            {/* Video Presets */}
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              추천 고화질 비디오 프리셋
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              {VIDEO_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  style={{
                    border: formData.videoUrl === preset.url ? '2px solid var(--gold-primary)' : '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: formData.videoUrl === preset.url ? 'var(--bg-subtle)' : '#FFFFFF',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ height: '70px', position: 'relative' }}>
                    <img src={preset.thumbnail} alt={preset.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {preset.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Video URL Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                직접 비디오 MP4 URL 입력
              </label>
              <input
                type="url"
                required
                value={formData.videoUrl}
                onChange={(e) => handleChange('videoUrl', e.target.value)}
                placeholder="https://.../video.mp4"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          </div>

          {/* 2. 메인 카피 (1줄) & 서브카피 (2줄) 설정 */}
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
              <Type size={18} color="var(--gold-dark)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                2. 카피 문구 설정
              </h3>
            </div>

            {/* 메인 카피 1줄 */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                메인 카피 (1줄 강조) *
              </label>
              <input
                type="text"
                required
                value={formData.mainCopy}
                onChange={(e) => handleChange('mainCopy', e.target.value)}
                placeholder="예: 500℃ 황금빛 화덕에서 완성되는 바다의 깊은 풍미"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.925rem',
                  fontWeight: 700
                }}
              />
            </div>

            {/* 서브 카피 1 */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                서브 카피 첫번째 줄 *
              </label>
              <input
                type="text"
                required
                value={formData.subCopy1}
                onChange={(e) => handleChange('subCopy1', e.target.value)}
                placeholder="예: 누룩소금으로 48시간 정성껏 저온 숙성한 명품 고등어"
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

            {/* 서브 카피 2 */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                서브 카피 두번째 줄 *
              </label>
              <input
                type="text"
                required
                value={formData.subCopy2}
                onChange={(e) => handleChange('subCopy2', e.target.value)}
                placeholder="예: 갓 지은 계절 솥밥과 함께 누리는 가장 정갈한 한 상"
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
          </div>

          {/* 3. 폰트 & 스타일 설정 */}
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
              <Sparkles size={18} color="var(--gold-dark)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                3. 폰트 및 비주얼 스타일 설정
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  서체 (Font Family)
                </label>
                <select
                  value={formData.fontFamily}
                  onChange={(e) => handleChange('fontFamily', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  <option value="Noto Sans KR">Noto Sans KR (기본/권장)</option>
                  <option value="'Outfit', 'Noto Sans KR', sans-serif">Outfit & Noto Sans</option>
                  <option value="'Cormorant Garamond', 'Noto Sans KR', serif">프리미엄 세리프 (Cormorant)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  서체 굵기 (Font Weight)
                </label>
                <select
                  value={formData.fontWeight}
                  onChange={(e) => handleChange('fontWeight', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  <option value="700">Bold (700)</option>
                  <option value="800">Extra Bold (800 권장)</option>
                  <option value="900">Black (900 강렬)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  텍스트 색상
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="color"
                    value={formData.textColor}
                    onChange={(e) => handleChange('textColor', e.target.value)}
                    style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={formData.textColor}
                    onChange={(e) => handleChange('textColor', e.target.value)}
                    style={{ flex: 1, padding: '0.65rem', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  어두운 딤 오버레이 강도 (0.1 ~ 0.8)
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={formData.overlayOpacity}
                  onChange={(e) => handleChange('overlayOpacity', parseFloat(e.target.value))}
                  style={{ width: '100%', marginTop: '0.6rem' }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>현재: {formData.overlayOpacity}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: 700,
              marginTop: '0.5rem'
            }}
          >
            <Check size={18} />
            <span>설정 저장하고 홈페이지에 즉시 반영하기</span>
          </button>
        </form>

        {/* Live Preview Card */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              실시간 렌더링 미리보기
            </h3>
            <span className="badge-gold">Live Preview</span>
          </div>

          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              height: '480px',
              background: '#191614',
              boxShadow: 'var(--shadow-lg)',
              border: '2px solid var(--border-warm)',
              display: 'flex',
              alignItems: 'center',
              padding: '2rem'
            }}
          >
            <video
              key={formData.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 1
              }}
            >
              <source src={formData.videoUrl} type="video/mp4" />
            </video>

            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                background: `rgba(15, 12, 10, ${formData.overlayOpacity})`
              }}
            />

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '100%' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: 'rgba(197, 168, 128, 0.2)',
                  border: '1px solid rgba(197, 168, 128, 0.4)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--gold-light)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}
              >
                <Sparkles size={12} />
                <span>들안길 명품 화덕 생선구이</span>
              </div>

              <h2
                style={{
                  fontFamily: formData.fontFamily,
                  fontWeight: formData.fontWeight,
                  color: formData.textColor,
                  fontSize: '1.65rem',
                  lineHeight: 1.3,
                  marginBottom: '0.85rem'
                }}
              >
                {formData.mainCopy}
              </h2>

              <p style={{ color: '#FAF8F5', fontSize: '0.9rem', margin: 0, lineHeight: 1.6, opacity: 0.95 }}>
                {formData.subCopy1}
              </p>
              <p style={{ color: '#E0D8CE', fontSize: '0.9rem', margin: '0.2rem 0 1.25rem', lineHeight: 1.6, opacity: 0.85 }}>
                {formData.subCopy2}
              </p>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span
                  style={{
                    background: 'var(--gold-gradient)',
                    color: '#191614',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  매장 예약하기
                </span>
                <span
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    color: '#FAF8F5',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  메뉴 보기
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
