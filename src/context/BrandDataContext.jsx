import React, { createContext, useContext, useState, useEffect } from 'react';

const BrandDataContext = createContext();

const STORAGE_KEY_HERO = 'geumdeungeo_hero_settings';
const STORAGE_KEY_POPUPS = 'geumdeungeo_popups';

// 고화질 푸드/화덕/요리 관련 비디오 프리셋 리스트
export const VIDEO_PRESETS = [
  {
    id: 'preset-oven-flame',
    name: '500℃ 화산석 화덕 & 생선구이 (추천)',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-in-a-pan-over-high-heat-43093-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'preset-fire-grill',
    name: '황금빛 참숯 직화 그릴',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-sparks-of-a-fire-in-the-dark-42488-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'preset-ocean-wave',
    name: '제주 청정 바다와 파도',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-sea-waves-crashing-on-the-beach-rocks-43187-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'preset-dining-steam',
    name: '정갈한 한식 솥밥 한상 김이 모락모락',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-boiling-water-in-a-transparent-pot-42998-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
  }
];

const DEFAULT_HERO_SETTINGS = {
  videoUrl: VIDEO_PRESETS[0].url,
  videoPresetId: VIDEO_PRESETS[0].id,
  mainCopy: '500℃ 황금빛 화덕에서 완성되는 바다의 깊은 풍미',
  subCopy1: '누룩소금으로 48시간 정성껏 저온 숙성한 명품 고등어',
  subCopy2: '갓 지은 계절 솥밥과 함께 누리는 가장 정갈하고 품격 있는 한 상',
  fontFamily: 'Noto Sans KR',
  fontStyle: 'normal',
  fontWeight: '800',
  textColor: '#FAF8F5',
  accentColor: '#C5A880',
  overlayOpacity: 0.45,
  ctaText: '매장 예약 & 메뉴 보기',
  ctaLink: '#reservation'
};

const DEFAULT_POPUPS = [
  {
    id: 'popup-1',
    title: '금등어 들안길 본점 리뉴얼 오픈 이벤트',
    badge: '특별 혜택',
    description: '48시간 누룩소금 숙성 화덕 고등어구이 2인 세트 주문 시, 시그니처 곤드레 솥밥 무료 업그레이드 제공!',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    linkText: '예약하고 혜택받기',
    linkUrl: '#reservation',
    startDate: '2026-08-01',
    endDate: '2026-08-31',
    isActive: true,
    createdAt: '2026-08-10'
  },
  {
    id: 'popup-2',
    title: '카카오톡 채널 추가 시 3,000 포인트 즉시 지급',
    badge: 'CRM 혜택',
    description: '금등어 카카오 채널을 추가하고 첫 방문 시 제시하시면 즉시 할인 또는 포인트 적립이 가능합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    linkText: '채널 추가하기',
    linkUrl: 'https://pf.kakao.com/_xgjxjxgG',
    startDate: '2026-08-01',
    endDate: '2026-09-30',
    isActive: false,
    createdAt: '2026-08-12'
  }
];

export const BrandDataProvider = ({ children }) => {
  // Hero Settings
  const [heroSettings, setHeroSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HERO);
      return saved ? JSON.parse(saved) : DEFAULT_HERO_SETTINGS;
    } catch {
      return DEFAULT_HERO_SETTINGS;
    }
  });

  // Popups List
  const [popups, setPopups] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_POPUPS);
      return saved ? JSON.parse(saved) : DEFAULT_POPUPS;
    } catch {
      return DEFAULT_POPUPS;
    }
  });

  // Active Popup Modal State (for Home)
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_HERO, JSON.stringify(heroSettings));
  }, [heroSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_POPUPS, JSON.stringify(popups));
  }, [popups]);

  // Check and show active popup on home load if not hidden today
  useEffect(() => {
    const hiddenDate = localStorage.getItem('geumdeungeo_hide_popup_date');
    const today = new Date().toISOString().slice(0, 10);
    
    if (hiddenDate !== today) {
      const currentActive = popups.find(p => p.isActive);
      if (currentActive) {
        setActivePopup(currentActive);
      }
    }
  }, [popups]);

  const updateHeroSettings = (newSettings) => {
    setHeroSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetHeroSettings = () => {
    setHeroSettings(DEFAULT_HERO_SETTINGS);
  };

  const addPopup = (popupData) => {
    const newPopup = {
      ...popupData,
      id: `popup-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setPopups(prev => [newPopup, ...prev]);
  };

  const updatePopup = (id, updatedData) => {
    setPopups(prev => prev.map(p => (p.id === id ? { ...p, ...updatedData } : p)));
  };

  const togglePopupStatus = (id) => {
    setPopups(prev => prev.map(p => (p.id === id ? { ...p, isActive: !p.isActive } : p)));
  };

  const deletePopup = (id) => {
    setPopups(prev => prev.filter(p => p.id !== id));
  };

  const dismissPopup = (hideForToday = false) => {
    if (hideForToday) {
      const today = new Date().toISOString().slice(0, 10);
      localStorage.setItem('geumdeungeo_hide_popup_date', today);
    }
    setActivePopup(null);
  };

  return (
    <BrandDataContext.Provider
      value={{
        heroSettings,
        updateHeroSettings,
        resetHeroSettings,
        popups,
        addPopup,
        updatePopup,
        togglePopupStatus,
        deletePopup,
        activePopup,
        dismissPopup
      }}
    >
      {children}
    </BrandDataContext.Provider>
  );
};

export const useBrandData = () => useContext(BrandDataContext);
