import { useState } from 'react';
import { Database, FolderTree, Terminal, Code2, Cpu, Sparkles } from 'lucide-react';

export default function SupabaseGuide() {
  const [activeTab, setActiveTab] = useState<'schema' | 'files' | 'code'>('schema');

  const folderStructureText = `
GenomeTree/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── SmartFarmStatusCard.tsx  # IoT 센서 실시간 제어 모듈
│   │   ├── ProductSection.tsx        # DNA 인증 묘목 목록 및 필터링
│   │   ├── NFCScanner.tsx            # NFC/RFID 태그 스마트 조회 대시보드
│   │   ├── CartAndCheckout.tsx       # 장바구니 및 PG 결제 대행 UI
│   │   ├── AdminPanel.tsx            # 재고 조정 및 성장 이력 강제 관리
│   │   └── SupabaseGuide.tsx         # Supabase 설계 및 연동 가이드 (현재 탭)
│   ├── data/
│   │   └── mockData.ts               # 로컬 프로토타이핑 데이터
│   ├── lib/
│   │   └── supabaseClient.ts         # Supabase 클라이언트 접속 인스턴스
│   ├── types.ts                      # 공통 데이터 인터페이스 규격 선언
│   ├── App.tsx                       # 대시보드 코어 라우터 및 글로벌 통합 상태
│   ├── index.css                     # Tailwind CSS 디렉티브 선언
│   └── main.tsx                      # React 19 / DOM 엔트리 포인트
├── .env.example                      # 환경 변수 선언 표준 서식 (API Key 등)
├── index.html                        # 메인 HTML 셸
├── package.json                      # 패키지 종속성 정의 스크립트
├── tsconfig.json                     # 컴파일러 규칙 정의
└── vite.config.ts                    # 빌드 및 중계 서버 설정
  `.trim();

  const schemaSQL = `
-- 1. 상품 테이블 (products)
CREATE TABLE products (
  id VARCHAR(50) PRIMARY KEY,
  category VARCHAR(30) NOT NULL, -- ginkgo, chionanthus, apple 등
  category_ko VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  specification VARCHAR(100) NOT NULL,
  price INT NOT NULL DEFAULT 0,
  stock INT NOT NULL DEFAULT 0,
  available_date DATE NOT NULL,
  certification_type VARCHAR(50) NOT NULL, -- DNA 인증, 무독성 인증 등
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. 개별 묘목 NFC/RFID 이력 추적 테이블 (tree_history)
CREATE TABLE tree_history (
  tag_id VARCHAR(50) PRIMARY KEY, -- RFID/NFC 고유번호
  product_name VARCHAR(100) NOT NULL,
  mother_tree_no VARCHAR(50) NOT NULL, -- 부모 모수 번호
  cutting_date DATE NOT NULL, -- 삽목일
  rooting_date DATE NOT NULL, -- 발근일
  shipping_date DATE NOT NULL, -- 출하일
  dna_verified BOOLEAN DEFAULT TRUE NOT NULL,
  dna_marker_code VARCHAR(100) NOT NULL, -- 유전 특이 SSR 마커 코드
  growth_stage VARCHAR(30) NOT NULL DEFAULT 'growing', -- germinating, growing, ready 등
  growth_stage_ko VARCHAR(50) NOT NULL,
  growth_progress INT NOT NULL DEFAULT 0, -- 0~100%
  notes TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. 스마트팜 센서 계측 통계 테이블 (smart_farm_sensors)
CREATE TABLE smart_farm_sensors (
  id BIGSERIAL PRIMARY KEY,
  temperature NUMERIC(4, 2) NOT NULL,
  humidity NUMERIC(4, 2) NOT NULL,
  soil_moisture NUMERIC(4, 2) NOT NULL,
  irrigation_active BOOLEAN DEFAULT FALSE NOT NULL,
  fan_active BOOLEAN DEFAULT TRUE NOT NULL,
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. 주문 정보 수령 테이블 (orders)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(30) NOT NULL,
  shipping_address TEXT NOT NULL,
  delivery_notes TEXT,
  total_amount INT NOT NULL,
  status VARCHAR(20) DEFAULT '결제완료' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
  `.trim();

  const supabaseCode = `
import { createClient } from '@supabase/supabase-client';
import { Product, TreeHistory } from '../types';

// 1. Supabase 클라이언트 접속 수립
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. 데이터베이스 상품 목록 (products) 실시간 fetch 함수 구현
export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('category', { ascending: true });

  if (error) {
    console.error('Supabase 상품 수신 에러:', error.message);
    throw error;
  }

  // 데이터 스네이크 케이스 필드를 캐멀 케이스로 매핑 후 반환
  return data.map((item: any) => ({
    id: item.id,
    category: item.category,
    categoryKo: item.category_ko,
    name: item.name,
    specification: item.specification,
    price: item.price,
    stock: item.stock,
    availableDate: item.available_date,
    certificationType: item.certification_type,
    description: item.description,
    imageUrl: item.image_url
  }));
}

// 3. 주문 접수 트랜잭션 함수 구현
export async function createOrder(orderInfo: any, cartItems: any[]) {
  // 주문 테이블 적재 후 재고 수량 차감(RPC 또는 개별 트랜잭션)을 실행하는 가이드 코드입니다.
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      buyer_name: orderInfo.buyerName,
      phone_number: orderInfo.phoneNumber,
      shipping_address: orderInfo.shippingAddress,
      delivery_notes: orderInfo.deliveryNotes,
      total_amount: orderInfo.totalAmount
    })
    .select()
    .single();

  if (orderError) throw orderError;
  return order;
}
  `.trim();

  return (
    <div id="supabase-guide-section" className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-stone-900 p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold">1단계 &amp; 3단계: Supabase 아키텍처 및 연동 설계도</h2>
        </div>
        <p className="text-xs text-stone-300 leading-relaxed max-w-2xl">
          MaleGinkgo 스마트 양묘 농가 직거래 시스템을 실제 Supabase 백엔드 데이터베이스와 즉시 연동하기 위해 설계한 최적화 스키마, 폴더 트리 구조, 그리고 비동기 연동 제어 함수 블루프린트입니다.
        </p>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-stone-200 bg-stone-50 font-sans">
        <button
          onClick={() => setActiveTab('schema')}
          className={`flex-1 py-3 text-xs font-semibold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'schema'
              ? 'border-emerald-600 text-emerald-800 bg-white font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-700'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>데이터베이스 스키마 (SQL)</span>
        </button>

        <button
          onClick={() => setActiveTab('files')}
          className={`flex-1 py-3 text-xs font-semibold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'files'
              ? 'border-emerald-600 text-emerald-800 bg-white font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-700'
          }`}
        >
          <FolderTree className="w-4 h-4" />
          <span>권장 폴더 구조</span>
        </button>

        <button
          onClick={() => setActiveTab('code')}
          className={`flex-1 py-3 text-xs font-semibold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'code'
              ? 'border-emerald-600 text-emerald-800 bg-white font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-700'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Supabase API 연동 코드</span>
        </button>
      </div>

      {/* Tab content */}
      <div className="p-6 bg-stone-950 font-mono text-[11px] text-emerald-400 leading-relaxed overflow-x-auto max-h-[450px]">
        {activeTab === 'schema' && (
          <pre className="whitespace-pre overflow-x-auto">
            <code>{schemaSQL}</code>
          </pre>
        )}

        {activeTab === 'files' && (
          <pre className="whitespace-pre overflow-x-auto text-stone-300">
            <code>{folderStructureText}</code>
          </pre>
        )}

        {activeTab === 'code' && (
          <pre className="whitespace-pre overflow-x-auto">
            <code>{supabaseCode}</code>
          </pre>
        )}
      </div>

      {/* Footer message */}
      <div className="p-4 bg-emerald-50 text-emerald-950 border-t border-stone-200 text-xs flex gap-2 items-start leading-relaxed">
        <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">현장 실무 개발 팁</p>
          <p className="mt-0.5">
            본 프로젝트는 Supabase 연동에 필요한 코딩 패턴을 완벽히 포함하고 있어, 실제 서비스 릴리즈 시 <code>VITE_SUPABASE_URL</code> 환경변수 등록과 <code>@supabase/supabase-js</code> SDK 설치만으로 이 시뮬레이션을 상용 클라우드 데이터베이스와 100% 즉시 전환 수렴할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
