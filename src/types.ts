export interface Product {
  id: string;
  category: 'ginkgo' | 'chionanthus' | 'apple' | 'grape' | 'larch' | 'tulip';
  categoryKo: string;
  name: string;
  specification: string;
  price: number;
  stock: number;
  availableDate: string;
  certificationType: 'DNA 인증' | '무독성 인증' | '원종 인증' | 'DNA마커 인증' | '일반 실생';
  description: string;
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface TreeHistory {
  tagId: string; // NFC/RFID Tag ID
  productName: string;
  motherTreeNo: string; // 모수번호
  cuttingDate: string; // 삽목일 (for cutting-based trees) / 접목일 or 파종일
  rootingDate: string; // 발근일
  shippingDate: string; // 출하일
  dnaVerified: boolean;
  dnaMarkerCode: string; // DNA 마커 코드
  growthStage: 'germinating' | 'growing' | 'rooting' | 'hardened' | 'ready';
  growthStageKo: string;
  growthProgress: number; // 0 ~ 100%
  notes: string;
}

export interface SmartFarmStatus {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  irrigationActive: boolean;
  fanActive: boolean;
  lastUpdated: string;
}

export interface OrderInfo {
  buyerName: string;
  phoneNumber: string;
  shippingAddress: string;
  deliveryNotes: string;
}

export interface OrderLog {
  id: string;
  date: string;
  buyerName: string;
  items: { productName: string; quantity: number; price: number }[];
  totalAmount: number;
  status: '결제완료' | '배송중' | '배송완료';
}
