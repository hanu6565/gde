-- =============================================================================
-- 🐟 금등어 (The Mackerel) Supabase Database Initialization Script
-- Run this in Supabase SQL Editor to initialize all tables and policies
-- =============================================================================

-- 1. Customers CRM Table
CREATE TABLE IF NOT EXISTS public.customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    gender TEXT DEFAULT 'female',
    age_group TEXT DEFAULT '30s',
    grade TEXT DEFAULT '일반',
    total_spent BIGINT DEFAULT 0,
    order_count INT DEFAULT 1,
    points INT DEFAULT 2000,
    recent_visit DATE DEFAULT CURRENT_DATE,
    join_date DATE DEFAULT CURRENT_DATE,
    favorite_menu TEXT DEFAULT '화덕 고등어구이 솥밥 한상',
    memo TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Hero Section Settings Table
CREATE TABLE IF NOT EXISTS public.hero_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    video_url TEXT NOT NULL,
    video_preset_id TEXT,
    main_copy TEXT NOT NULL,
    sub_copy1 TEXT NOT NULL,
    sub_copy2 TEXT NOT NULL,
    font_family TEXT DEFAULT 'Noto Sans KR',
    font_weight TEXT DEFAULT '800',
    text_color TEXT DEFAULT '#FAF8F5',
    overlay_opacity NUMERIC DEFAULT 0.45,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Popups Table
CREATE TABLE IF NOT EXISTS public.popups (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    badge TEXT DEFAULT '특별 이벤트',
    description TEXT NOT NULL,
    image_url TEXT,
    link_text TEXT DEFAULT '예약하고 혜택받기',
    link_url TEXT DEFAULT '#reservation',
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE DEFAULT CURRENT_DATE + INTERVAL '30 days',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Reservations Table
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TEXT NOT NULL,
    guests INT DEFAULT 2,
    notes TEXT,
    status TEXT DEFAULT '접수완료',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    menu TEXT NOT NULL,
    amount BIGINT NOT NULL,
    table_name TEXT,
    status TEXT DEFAULT '결제완료',
    order_time TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) & Allow Public Read/Write for demo & portal
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.popups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public all on customers" ON public.customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on hero_settings" ON public.hero_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on popups" ON public.popups FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on reservations" ON public.reservations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

-- Insert Default Hero Settings
INSERT INTO public.hero_settings (id, video_url, video_preset_id, main_copy, sub_copy1, sub_copy2, font_family, font_weight, text_color, overlay_opacity)
VALUES (
    'default',
    'https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-in-a-pan-over-high-heat-43093-large.mp4',
    'preset-oven-flame',
    '500℃ 황금빛 화덕에서 완성되는 바다의 깊은 풍미',
    '누룩소금으로 48시간 정성껏 저온 숙성한 명품 고등어',
    '갓 지은 계절 솥밥과 함께 누리는 가장 정갈하고 품격 있는 한 상',
    'Noto Sans KR',
    '800',
    '#FAF8F5',
    0.45
) ON CONFLICT (id) DO NOTHING;

-- Insert Initial Popups
INSERT INTO public.popups (id, title, badge, description, image_url, link_text, link_url, start_date, end_date, is_active)
VALUES (
    'popup-1',
    '금등어 들안길 본점 리뉴얼 오픈 기념 혜택',
    '특별 이벤트',
    '48시간 누룩소금 숙성 화덕 고등어구이 2인 이상 주문 시, 시그니처 곤드레 솥밥 무료 업그레이드 제공!',
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    '예약하고 혜택받기',
    '#reservation',
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '30 days',
    true
) ON CONFLICT (id) DO NOTHING;

-- Insert Initial Sample VIP/Customers
INSERT INTO public.customers (id, name, phone, email, gender, age_group, grade, total_spent, order_count, points, recent_visit, join_date, favorite_menu, memo)
VALUES 
('CUST-001', '김지현', '010-8742-9102', 'jihyun.kim@gmail.com', 'female', '30s', 'VIP', 1840000, 18, 45000, CURRENT_DATE, CURRENT_DATE - 90, '화덕 고등어구이 솥밥 한상', '들안길 단골 손님, 창가 자리 선호'),
('CUST-002', '박성민', '010-3391-4521', 'sungmin.park@naver.com', 'male', '40s', 'VIP', 2450000, 22, 62000, CURRENT_DATE - 1, CURRENT_DATE - 120, '특선 고등어조림 & 곤드레 솥밥', '비즈니스 식사 모임 자주 예약'),
('CUST-003', '이지은', '010-5629-1094', 'jieun.lee@kakao.com', 'female', '20s', 'GOLD', 920000, 9, 18500, CURRENT_DATE - 2, CURRENT_DATE - 60, '누룩숙성 화덕 삼치구이', '인스타그램 리뷰 작성 고객'),
('CUST-004', '최원우', '010-9012-7741', 'wonwoo.choi@daum.net', 'male', '50s', 'VIP', 3100000, 28, 89000, CURRENT_DATE, CURRENT_DATE - 200, '화덕 고등어구이 솥밥 한상', '가족 외식 모임 4인 이상 예약')
ON CONFLICT (id) DO NOTHING;
