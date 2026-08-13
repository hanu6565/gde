import React, { createContext, useContext, useState, useMemo } from 'react';

const CrmDataContext = createContext();

const STORAGE_KEY_CUSTOMERS = 'geumdeungeo_crm_customers';
const STORAGE_KEY_ORDERS = 'geumdeungeo_crm_orders';

// 현실감 있는 고객 초기 데이터 생성기 (120명 이상)
const INITIAL_CUSTOMERS = [
  {
    id: 'CUST-001',
    name: '김지현',
    phone: '010-8742-9102',
    email: 'jihyun.kim@gmail.com',
    gender: 'female',
    ageGroup: '30s',
    grade: 'VIP',
    totalSpent: 1840000,
    orderCount: 18,
    points: 45000,
    recentVisit: '2026-08-12',
    joinDate: '2025-03-14',
    favoriteMenu: '화덕 고등어구이 솥밥 한상',
    memo: '들안길 단골 손님, 창가 자리 선호'
  },
  {
    id: 'CUST-002',
    name: '박성민',
    phone: '010-3391-4521',
    email: 'sungmin.park@naver.com',
    gender: 'male',
    ageGroup: '40s',
    grade: 'VIP',
    totalSpent: 2450000,
    orderCount: 22,
    points: 62000,
    recentVisit: '2026-08-11',
    joinDate: '2025-01-20',
    favoriteMenu: '특선 고등어조림 & 곤드레 솥밥',
    memo: '비즈니스 식사 모임 자주 예약'
  },
  {
    id: 'CUST-003',
    name: '이지은',
    phone: '010-5629-1094',
    email: 'jieun.lee@kakao.com',
    gender: 'female',
    ageGroup: '20s',
    grade: 'GOLD',
    totalSpent: 920000,
    orderCount: 9,
    points: 18500,
    recentVisit: '2026-08-10',
    joinDate: '2025-06-11',
    favoriteMenu: '누룩숙성 화덕 삼치구이',
    memo: '인스타그램 리뷰 작성 고객'
  },
  {
    id: 'CUST-004',
    name: '최원우',
    phone: '010-9012-7741',
    email: 'wonwoo.choi@daum.net',
    gender: 'male',
    ageGroup: '50s',
    grade: 'VIP',
    totalSpent: 3100000,
    orderCount: 28,
    points: 89000,
    recentVisit: '2026-08-13',
    joinDate: '2024-11-05',
    favoriteMenu: '화덕 고등어구이 솥밥 한상',
    memo: '가족 외식 모임 4인 이상 예약'
  },
  {
    id: 'CUST-005',
    name: '정유나',
    phone: '010-6318-9923',
    email: 'yuna.jung@naver.com',
    gender: 'female',
    ageGroup: '30s',
    grade: 'SILVER',
    totalSpent: 480000,
    orderCount: 5,
    points: 9600,
    recentVisit: '2026-08-08',
    joinDate: '2025-09-01',
    favoriteMenu: '제주 흑돼지 직화 제육볶음',
    memo: '점심 특선 자주 이용'
  },
  {
    id: 'CUST-006',
    name: '강민재',
    phone: '010-4491-0329',
    email: 'minjae.kang@gmail.com',
    gender: 'male',
    ageGroup: '30s',
    grade: 'GOLD',
    totalSpent: 860000,
    orderCount: 8,
    points: 17200,
    recentVisit: '2026-08-09',
    joinDate: '2025-05-18',
    favoriteMenu: '화덕 고등어구이 솥밥 한상',
    memo: '주말 데이트 코스로 방문'
  },
  {
    id: 'CUST-007',
    name: '윤서연',
    phone: '010-2219-5839',
    email: 'seoyeon.yoon@kakao.com',
    gender: 'female',
    ageGroup: '40s',
    grade: 'SILVER',
    totalSpent: 520000,
    orderCount: 5,
    points: 10400,
    recentVisit: '2026-08-05',
    joinDate: '2025-10-12',
    favoriteMenu: '특제 고등어 묵은지조림',
    memo: '포장 주문 경험 있음'
  },
  {
    id: 'CUST-008',
    name: '한도현',
    phone: '010-7128-4490',
    email: 'dohyun.han@naver.com',
    gender: 'male',
    ageGroup: '60s',
    grade: 'VIP',
    totalSpent: 2890000,
    orderCount: 24,
    points: 75000,
    recentVisit: '2026-08-12',
    joinDate: '2024-10-01',
    favoriteMenu: '화덕 고등어구이 솥밥 한상',
    memo: '지인 추천 방문, 솥밥 누룽지 선호'
  },
  {
    id: 'CUST-009',
    name: '오지후',
    phone: '010-9831-2311',
    email: 'jihoo.oh@gmail.com',
    gender: 'male',
    ageGroup: '20s',
    grade: 'BRONZE',
    totalSpent: 210000,
    orderCount: 2,
    points: 4200,
    recentVisit: '2026-08-01',
    joinDate: '2026-04-15',
    favoriteMenu: '누룩숙성 화덕 삼치구이',
    memo: '친구들과 방문'
  },
  {
    id: 'CUST-010',
    name: '신소율',
    phone: '010-5510-9428',
    email: 'soyul.shin@kakao.com',
    gender: 'female',
    ageGroup: '20s',
    grade: 'BRONZE',
    totalSpent: 160000,
    orderCount: 2,
    points: 3200,
    recentVisit: '2026-07-28',
    joinDate: '2026-05-02',
    favoriteMenu: '화덕 고등어구이 솥밥 한상',
    memo: '신규 회원 가입'
  },
  {
    id: 'CUST-011',
    name: '임채원',
    phone: '010-3849-1120',
    email: 'chaewon.lim@naver.com',
    gender: 'female',
    ageGroup: '50s',
    grade: 'GOLD',
    totalSpent: 1250000,
    orderCount: 11,
    points: 25000,
    recentVisit: '2026-08-07',
    joinDate: '2025-04-20',
    favoriteMenu: '제주 은갈치 구이 한상',
    memo: '동호회 모임 6인 예약'
  },
  {
    id: 'CUST-012',
    name: '송태민',
    phone: '010-8201-6673',
    email: 'taemin.song@gmail.com',
    gender: 'male',
    ageGroup: '30s',
    grade: '일반',
    totalSpent: 75000,
    orderCount: 1,
    points: 1500,
    recentVisit: '2026-08-13',
    joinDate: '2026-08-13',
    favoriteMenu: '화덕 고등어구이 솥밥 한상',
    memo: '방금 전 실시간 신규 가입'
  }
];

// 50개 이상의 추가 더미 데이터 생성
for (let i = 13; i <= 80; i++) {
  const names = ['유준상', '서민지', '권태형', '황보라', '안재현', '배수지', '홍기범', '문소리', '남궁민', '조보아', '탁재훈', '양세찬', '노홍철', '정형돈', '하동훈'];
  const name = `${names[i % names.length]}${Math.floor(i / names.length) > 0 ? (i % 9) + 1 : ''}`;
  const genders = ['female', 'male'];
  const ageGroups = ['20s', '30s', '40s', '50s', '60s'];
  const grades = ['일반', 'BRONZE', 'SILVER', 'GOLD', 'VIP'];
  const menus = [
    '화덕 고등어구이 솥밥 한상',
    '특선 고등어조림 & 곤드레 솥밥',
    '누룩숙성 화덕 삼치구이',
    '제주 흑돼지 직화 제육볶음',
    '제주 은갈치 구이 한상'
  ];

  const gender = genders[i % 2];
  const ageGroup = ageGroups[i % 5];
  const gradeIdx = (i % 5);
  const grade = grades[gradeIdx];
  const orderCount = gradeIdx === 4 ? (15 + (i % 15)) : gradeIdx === 3 ? (8 + (i % 6)) : gradeIdx === 2 ? (4 + (i % 4)) : gradeIdx === 1 ? (2 + (i % 2)) : 1;
  const avgSpendPerOrder = 85000 + ((i * 12345) % 45000);
  const totalSpent = orderCount * avgSpendPerOrder;
  const points = Math.floor(totalSpent * 0.02);

  const day = (i % 28) + 1;
  const month = ((i % 8) + 1).toString().padStart(2, '0');
  const recentVisit = `2026-08-${(31 - (i % 25)).toString().padStart(2, '0')}`;
  const joinDate = `2025-${month}-${day.toString().padStart(2, '0')}`;

  INITIAL_CUSTOMERS.push({
    id: `CUST-${i.toString().padStart(3, '0')}`,
    name,
    phone: `010-${(1000 + (i * 73) % 9000).toString()}-${(1000 + (i * 117) % 9000).toString()}`,
    email: `user${i}@geumdeungeo-crm.com`,
    gender,
    ageGroup,
    grade,
    totalSpent,
    orderCount,
    points,
    recentVisit,
    joinDate,
    favoriteMenu: menus[i % menus.length],
    memo: `정기 방문 고객 #${i}`
  });
}

// 최근 주문 거래 내역
const INITIAL_ORDERS = [
  { id: 'ORD-9021', customerName: '최원우', menu: '화덕 고등어 2인 + 곤드레 솥밥', amount: 48000, status: '결제완료', time: '방금 전 (15:42)', table: 'Table 4' },
  { id: 'ORD-9020', customerName: '송태민', menu: '화덕 고등어 솥밥 한상', amount: 19000, status: '결제완료', time: '18분 전 (15:24)', table: 'Table 2' },
  { id: 'ORD-9019', customerName: '김지현', menu: '특선 고등어조림 정식 2인', amount: 52000, status: '결제완료', time: '42분 전 (15:00)', table: 'Room A' },
  { id: 'ORD-9018', customerName: '박성민', menu: '화덕 고등어 3인 + 제육볶음', amount: 76000, status: '결제완료', time: '1시간 전 (14:38)', table: 'Table 7' },
  { id: 'ORD-9017', customerName: '강민재', menu: '화덕 삼치구이 솥밥 한상', amount: 21000, status: '결제완료', time: '1시간 전 (14:15)', table: 'Table 3' },
  { id: 'ORD-9016', customerName: '윤서연', menu: '제주 은갈치구이 2인 세트', amount: 64000, status: '결제완료', time: '2시간 전 (13:50)', table: 'Room B' }
];

export const CrmDataProvider = ({ children }) => {
  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CUSTOMERS);
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // 필터 조건 상태
  const [filters, setFilters] = useState({
    gender: 'all',          // 'all', 'female', 'male'
    ageGroup: 'all',        // 'all', '20s', '30s', '40s', '50s', '60s'
    grade: 'all',           // 'all', 'VIP', 'GOLD', 'SILVER', 'BRONZE', '일반'
    frequency: 'all',       // 'all', 'weekly' (10+), 'monthly' (4~9), 'low' (1~3)
    minSpent: 0,
    maxSpent: 5000000,
    searchQuery: ''
  });

  // KPI 요약 계산
  const stats = useMemo(() => {
    const totalCustomers = customers.length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const totalOrders = customers.reduce((sum, c) => sum + c.orderCount, 0);
    const totalPoints = customers.reduce((sum, c) => sum + c.points, 0);
    const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    // 등급별 분포
    const gradeCounts = {
      VIP: customers.filter(c => c.grade === 'VIP').length,
      GOLD: customers.filter(c => c.grade === 'GOLD').length,
      SILVER: customers.filter(c => c.grade === 'SILVER').length,
      BRONZE: customers.filter(c => c.grade === 'BRONZE').length,
      일반: customers.filter(c => c.grade === '일반').length,
    };

    // 연령별 분포
    const ageCounts = {
      '20대': customers.filter(c => c.ageGroup === '20s').length,
      '30대': customers.filter(c => c.ageGroup === '30s').length,
      '40대': customers.filter(c => c.ageGroup === '40s').length,
      '50대': customers.filter(c => c.ageGroup === '50s').length,
      '60대+': customers.filter(c => c.ageGroup === '60s').length,
    };

    return {
      totalCustomers,
      totalRevenue,
      totalOrders,
      totalPoints,
      avgOrderValue,
      gradeCounts,
      ageCounts
    };
  }, [customers]);

  // 필터링된 고객 목록
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      // 성별
      if (filters.gender !== 'all' && customer.gender !== filters.gender) return false;
      // 연령대
      if (filters.ageGroup !== 'all' && customer.ageGroup !== filters.ageGroup) return false;
      // 고객등급
      if (filters.grade !== 'all' && customer.grade !== filters.grade) return false;
      // 구매빈도
      if (filters.frequency === 'weekly' && customer.orderCount < 10) return false;
      if (filters.frequency === 'monthly' && (customer.orderCount < 4 || customer.orderCount >= 10)) return false;
      if (filters.frequency === 'low' && customer.orderCount >= 4) return false;
      // 구매금액 범위
      if (customer.totalSpent < filters.minSpent || customer.totalSpent > filters.maxSpent) return false;
      // 검색어
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matches =
          customer.name.toLowerCase().includes(query) ||
          customer.phone.includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          customer.id.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    });
  }, [customers, filters]);

  // 포인트 지급 / 차감
  const adjustPoints = (customerId, amount, reason = '관리자 수동 조정') => {
    setCustomers(prev =>
      prev.map(c => {
        if (c.id === customerId) {
          const newPoints = Math.max(0, c.points + amount);
          return { ...c, points: newPoints };
        }
        return c;
      })
    );
  };

  // 등급 변경
  const updateGrade = (customerId, newGrade) => {
    setCustomers(prev =>
      prev.map(c => (c.id === customerId ? { ...c, grade: newGrade } : c))
    );
  };

  // 신규 고객 추가
  const addCustomer = (customerData) => {
    const newCustomer = {
      id: `CUST-${(customers.length + 1).toString().padStart(3, '0')}`,
      totalSpent: 0,
      orderCount: 1,
      points: 2000, // 신규 가입 포인트
      recentVisit: new Date().toISOString().slice(0, 10),
      joinDate: new Date().toISOString().slice(0, 10),
      grade: '일반',
      ...customerData
    };
    setCustomers(prev => [newCustomer, ...prev]);
  };

  // CSV 다운로드 기능
  const exportToCsv = () => {
    const headers = ['회원번호', '고객명', '연락처', '이메일', '성별', '연령대', '등급', '누적구매액', '주문수', '포인트', '최근방문일', '가입일'];
    const rows = filteredCustomers.map(c => [
      c.id,
      c.name,
      c.phone,
      c.email,
      c.gender === 'female' ? '여성' : '남성',
      c.ageGroup,
      c.grade,
      c.totalSpent,
      c.orderCount,
      c.points,
      c.recentVisit,
      c.joinDate
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `금등어_고객명단_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetFilters = () => {
    setFilters({
      gender: 'all',
      ageGroup: 'all',
      grade: 'all',
      frequency: 'all',
      minSpent: 0,
      maxSpent: 5000000,
      searchQuery: ''
    });
  };

  return (
    <CrmDataContext.Provider
      value={{
        customers,
        filteredCustomers,
        orders,
        filters,
        setFilters,
        resetFilters,
        stats,
        adjustPoints,
        updateGrade,
        addCustomer,
        exportToCsv
      }}
    >
      {children}
    </CrmDataContext.Provider>
  );
};

export const useCrmData = () => useContext(CrmDataContext);
