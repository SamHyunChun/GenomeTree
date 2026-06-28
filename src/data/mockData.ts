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
  // Chionanthus (이팝나무)
  {
    id: 'chionanthus-cutting',
    category: 'chionanthus',
    categoryKo: '이팝나무',
    name: 'DNA인증 이팝 수나무 우수 삽수',
    specification: '모수 직채취 삽수',
    price: 800,
    stock: 50000,
    availableDate: '2026-07-20',
    certificationType: 'DNA 인증',
    description: '결실을 맺지 않아 알레르기 유발 및 가로 환경 훼손이 없는 이팝나무 수나무 우수 유전자 모수 삽수입니다.',
    imageUrl: '/src/assets/images/chionanthus_cuttings_1782628083696.jpg'
  },
  {
    id: 'chionanthus-3m',
    category: 'chionanthus',
    categoryKo: '이팝나무',
    name: 'DNA인증 이팝 수나무 묘목 (3개월생)',
    specification: '포트묘, 평균 수고 10-15cm',
    price: 3000,
    stock: 30000,
    availableDate: '2026-08-10',
    certificationType: 'DNA 인증',
    description: '바이오 실험실 수준의 무균 및 항온항습 설비에서 배양 및 순화된 차세대 환경 정화용 이팝나무 수나무 묘목입니다.',
    imageUrl: '/src/assets/images/chionanthus_seedling_3m_1782628454337.jpg'
  },
  {
    id: 'chionanthus-12m',
    category: 'chionanthus',
    categoryKo: '이팝나무',
    name: 'DNA인증 이팝 수나무 묘목 (12개월생)',
    specification: '포트/H0.5m 이상',
    price: 8000,
    stock: 5000,
    availableDate: '2026-07-10',
    certificationType: 'DNA 인증',
    description: '활착력이 검증되어 외부 가로수 및 정원수로 인기가 높고, 우수한 병충해 저항성을 가진 이팝 수나무 야외 순화 묘목입니다.',
    imageUrl: '/src/assets/images/chionanthus_outdoor_12m_1782629281282.jpg'
  },
  // Apple (사과나무)
  {
    id: 'apple-virus-free',
    category: 'apple',
    categoryKo: '사과나무',
    name: '무독성 인증 사과나무 우량 대목묘',
    specification: 'M9 대목, 무독성 보증',
    price: 15000,
    stock: 2000,
    availableDate: '2026-10-15',
    certificationType: '무독성 인증',
    description: '주요 바이러스 및 바이로이드 5종이 없는 것으로 정식 공인 인증을 받은 고밀도 식재용 M9 사과 대목 및 보증 묘목입니다.',
    imageUrl: '/src/assets/images/apple_diagnostic_kit_1782632408324.jpg'
  },
  {
    id: 'apple-mother',
    category: 'apple',
    categoryKo: '사과나무',
    name: '원종 인증 사과나무 품종 묘목',
    specification: '특등 품종묘 (홍로/후지 계열)',
    price: 25000,
    stock: 500,
    availableDate: '2026-10-20',
    certificationType: '원종 인증',
    description: '우수한 유전 특성을 엄격히 보존하고 있는 원종(Mother Tree)에서 직접 유래된 사과나무 정품 묘목으로, 고품질 과실 생산용 농가에 적극 추천합니다.',
    imageUrl: '/src/assets/images/apple_mother_sapling_1782632618568.jpg'
  },
  // Grape (포도나무)
  {
    id: 'grape-virus-free',
    category: 'grape',
    categoryKo: '포도나무',
    name: '무독성 인증 포도 우수 포트묘',
    specification: '샤인머스캣 대목묘, 무독묘',
    price: 12000,
    stock: 3000,
    availableDate: '2026-11-01',
    certificationType: '무독성 인증',
    description: '엽권바이러스, 사상체바이러스 등 주요 병해를 완벽 차단해 초기 생장력과 당도 발현율을 극대화한 포도나무 묘목입니다.',
    imageUrl: '/src/assets/images/grape_diagnostic_kit_1782632998027.jpg'
  },
  {
    id: 'grape-mother',
    category: 'grape',
    categoryKo: '포도나무',
    name: '원종 인증 프리미엄 포도 묘목',
    specification: '캠벨/샤인머스캣 순종 계통',
    price: 20000,
    stock: 800,
    availableDate: '2026-10-25',
    certificationType: '원종 인증',
    description: '인증받은 유전자 원종 보존림에서 엄격한 자격 기준에 따라 출처가 추적 및 증명된 대한민국 최고급 포도나무 정통 묘목입니다.',
    imageUrl: '/src/assets/images/grape_mother_sapling_1782633454575.jpg'
  },
  // Larch (낙엽송)
  {
    id: 'larch-dna',
    category: 'larch',
    categoryKo: '낙엽송',
    name: 'DNA마커 인증 우량 낙엽송 묘목',
    specification: '산림청 지정 클론, 멀티포트',
    price: 4000,
    stock: 20000,
    availableDate: '2026-09-01',
    certificationType: 'DNA마커 인증',
    description: '산림청 지정 최고 등급 수형목(Plus Tree)의 DNA 클론 일치 여부를 DNA 마커 유전자 분석법으로 확정 판정받은 속성 목재용 우량 묘목입니다.',
    imageUrl: '/src/assets/images/larch_multiport_seedlings_1782633996555.jpg'
  },
  // Tulip Tree (백합나무)
  {
    id: 'tulip-dna',
    category: 'tulip',
    categoryKo: '백합나무',
    name: 'DNA마커 인증 고품질 백합나무 묘목',
    specification: '생장 속도 1.5배 탄소 저감 우수종',
    price: 4500,
    stock: 15000,
    availableDate: '2026-09-05',
    certificationType: 'DNA마커 인증',
    description: '탄소 흡수 능력이 압도적으로 탁월하고 생장 속도가 타 수종 대비 월등히 빠른 백합나무 중에서도 DNA 검증이 정밀 완료된 보증 묘목입니다.',
    imageUrl: '/src/assets/images/tulip_tree_flower_1782634228959.jpg'
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
