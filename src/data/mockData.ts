import { Product, TreeHistory, SmartFarmStatus } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // Ginkgo
  {
    id: 'ginkgo-cutting',
    category: 'ginkgo',
    categoryKo: '은행 수나무',
    name: 'DNA인증 은행 수나무 우수 모수 삽수',
    specification: '우수 모수 채취 활력 삽수',
    price: 500,
    stock: 100000,
    availableDate: '2026-07-15',
    certificationType: 'DNA 인증',
    description: '엄격하게 선별된 DNA 검증 완료 은행 수나무(수컷) 모수로부터 채취한 1등급 고활력 삽수입니다. 열매 악취가 없는 쾌적한 가로수 식재용으로 가장 적합합니다.',
    imageUrl: '/src/assets/images/ginkgo_cutting_branch_1782624643357.jpg'
  },
  {
    id: 'ginkgo-3m',
    category: 'ginkgo',
    categoryKo: '은행 수나무',
    name: 'DNA인증 은행 수나무 삽목묘 (3개월생)',
    specification: '포트묘, 평균 수고 15-20cm',
    price: 2000,
    stock: 140000,
    availableDate: '2026-08-01',
    certificationType: 'DNA 인증',
    description: '스마트팜 첨단 양묘 시설에서 90일 동안 완벽한 환경 통제하에 뿌리를 내린 고생존율 은행 수나무 플러그 포트묘입니다.',
    imageUrl: '/src/assets/images/ginkgo_tiny_seedling_1782626643995.jpg'
  },
  {
    id: 'ginkgo-12m',
    category: 'ginkgo',
    categoryKo: '은행 수나무',
    name: 'DNA인증 은행 수나무 삽목묘 (12개월생)',
    specification: '노지/대형 포트, 평균 수고 50-70cm',
    price: 6000,
    stock: 10000,
    availableDate: '2026-07-05',
    certificationType: 'DNA 인증',
    description: '강인한 순화 과정을 마친 1년생 은행 수나무 묘목입니다. 즉시 이식 및 조경공사 시공이 가능할 만큼 수형과 뿌리 발달이 매우 우수합니다.',
    imageUrl: '/src/assets/images/ginkgo_sapling_pot_1782627673310.jpg'
  },
  // Seed-Grown Seedlings (실생묘)
  {
    id: 'ginkgo-seedling-1y',
    category: 'ginkgo',
    categoryKo: '일반 실생묘',
    name: '일반 실생 은행나무 묘목 (1년생)',
    specification: '노지포트, 평균 수고 25-35cm, 대량 다발포장 가능',
    price: 1200,
    stock: 95000,
    availableDate: '2026-07-20',
    certificationType: '일반 실생',
    description: '은행나무 열매종자를 직접 파종하여 대량 생산한 일반 은행나무 실생묘입니다. 성별 구별이나 유전자 인증이 없는 실생 묘목으로, 임야 녹화나 산림 대량 식재용으로 매우 저렴하게 공급됩니다.',
    imageUrl: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ginkgo-seedling-2y',
    category: 'ginkgo',
    categoryKo: '일반 실생묘',
    name: '일반 실생 은행나무 묘목 (2년생 특묘)',
    specification: '노지묘, 평균 수고 60-80cm, 뿌리분 결속',
    price: 2500,
    stock: 25000,
    availableDate: '2026-07-15',
    certificationType: '일반 실생',
    description: '2년 동안 노지에서 튼튼하게 자라 뿌리가 튼실하고 대 기후 적응을 마친 보급형 은행나무 실생 특수 묘목입니다. 유전자 감정은 미필이나 생명력이 강합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=400'
  }
];

export const INITIAL_HISTORY_DATA: TreeHistory[] = [
  {
    tagId: 'GT-G-3M-1024',
    productName: 'DNA인증 은행 수나무 삽목묘 (3개월생)',
    motherTreeNo: 'GINKGO-MALE-M057',
    cuttingDate: '2026-03-25',
    rootingDate: '2026-05-10',
    shippingDate: '2026-08-01',
    dnaVerified: true,
    dnaMarkerCode: 'G-SSR-12-ATT-194/218',
    growthStage: 'hardened',
    growthStageKo: '경화기 (야외 순화 적응)',
    growthProgress: 85,
    notes: '스마트 양묘동 3호실에서 우수한 발근 성적을 거두고 현재 야외 순화 온실에서 외기 적응 및 경화 과정을 진행하고 있습니다. 엽록소 지수(SPAD) 52로 최고 수준 활력입니다.'
  },
  {
    tagId: 'GT-G-12M-0089',
    productName: 'DNA인증 은행 수나무 삽목묘 (12개월생)',
    motherTreeNo: 'GINKGO-MALE-M057',
    cuttingDate: '2025-06-12',
    rootingDate: '2025-07-28',
    shippingDate: '2026-07-05',
    dnaVerified: true,
    dnaMarkerCode: 'G-SSR-12-ATT-194/218',
    growthStage: 'ready',
    growthStageKo: '출하 가능 완료',
    growthProgress: 100,
    notes: '1년 동안 완벽히 건강하게 성장하여 주근 및 세근이 화분 전체를 단단히 감싸고 있습니다. DNA 인증 분석 검사에서 은행 나무 수나무 특이적 유전 표지자 완벽 일치가 재확인되었습니다.'
  },
  {
    tagId: 'GT-A-VIR-5092',
    productName: '무독성 인증 사과나무 우량 대목묘',
    motherTreeNo: 'APPLE-M9-WF08',
    cuttingDate: '2026-04-10',
    rootingDate: '2026-06-05',
    shippingDate: '2026-10-15',
    dnaVerified: true,
    dnaMarkerCode: 'AP-PCR-VT-FREE-PASS',
    growthStage: 'growing',
    growthStageKo: '신초 성장기',
    growthProgress: 60,
    notes: '접목 후 원활한 캘러스 형성 완료. 국립종자원 기준의 주요 바이러스 감염 검사 결과 음성 판정되어 바이러스 프리 보증 라벨이 정상 발부되었습니다.'
  },
  {
    tagId: 'GT-L-DNA-8120',
    productName: 'DNA마커 인증 우량 낙엽송 묘목',
    motherTreeNo: 'LARCH-PLUS-T209',
    cuttingDate: '2026-02-15',
    rootingDate: '2026-04-20',
    shippingDate: '2026-09-01',
    dnaVerified: true,
    dnaMarkerCode: 'LA-SSR-M7-A288-B310',
    growthStage: 'growing',
    growthStageKo: '신초 성장기',
    growthProgress: 75,
    notes: '우량 유전자 수형목 모수 클론 복제 개체입니다. 미세 분무 안개식 발근실에서 뛰어난 활착 성적을 달성했으며, 유전자 전사체 분석 결과 부모 유전자와 100% 일치합니다.'
  }
];

export const DEFAULT_SMART_FARM: SmartFarmStatus = {
  temperature: 24.5,
  humidity: 62.1,
  soilMoisture: 48.3,
  irrigationActive: false,
  fanActive: true,
  lastUpdated: '방금 전'
};
