import { useState, FormEvent } from 'react';
import { CartItem, OrderInfo, Product } from '../types';
import { ShoppingCart, User, Phone, MapPin, ClipboardList, CreditCard, Trash2, X, Sparkles, CheckCircle } from 'lucide-react';

interface CartAndCheckoutProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckoutSuccess: (orderInfo: OrderInfo) => void;
  onClearCart: () => void;
}

export default function CartAndCheckout({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutSuccess,
  onClearCart
}: CartAndCheckoutProps) {
  // Orderer info state
  const [buyerName, setBuyerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Local state for interactive payment modal
  const [isPaying, setIsPaying] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState<{
    orderId: string;
    buyerName: string;
    totalAmount: number;
    items: CartItem[];
  } | null>(null);

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!buyerName.trim()) errors.buyerName = '주문자명을 입력해 주세요.';
    if (!phoneNumber.trim()) {
      errors.phoneNumber = '전화번호를 입력해 주세요.';
    } else if (!/^\d{2,4}-\d{3,4}-\d{4}$/.test(phoneNumber.trim()) && !/^\d{9,11}$/.test(phoneNumber.trim())) {
      errors.phoneNumber = '올바른 전화번호 형식 또는 숫자만 입력해 주세요.';
    }
    if (!shippingAddress.trim()) errors.shippingAddress = '배송받으실 주소를 입력해 주세요.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const deliveryFee = calculateSubtotal() > 100000 || calculateSubtotal() === 0 ? 0 : 5000;
  const totalAmount = calculateSubtotal() + deliveryFee;

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (cartItems.length === 0) {
      alert('장바구니가 비어 있습니다.');
      return;
    }

    setIsPaying(true);

    // Simulate network delay for payment gateway authorization
    setTimeout(() => {
      const generatedOrderId = `GT-ORDER-${Math.floor(100000 + Math.random() * 900000)}`;
      setLastOrderDetails({
        orderId: generatedOrderId,
        buyerName,
        totalAmount,
        items: [...cartItems]
      });
      setIsPaying(false);
      setShowReceiptModal(true);

      // Trigger state updates up to App
      onCheckoutSuccess({
        buyerName,
        phoneNumber,
        shippingAddress,
        deliveryNotes
      });

      // Clear local fields
      setBuyerName('');
      setPhoneNumber('');
      setShippingAddress('');
      setDeliveryNotes('');
    }, 1500);
  };

  return (
    <div id="cart-checkout-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left side: Shopping Cart List */}
      <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-emerald-600" />
              장바구니 목록
            </h2>
            <span className="text-xs text-stone-500 font-mono">
              선택한 품목: <span className="text-emerald-600 font-bold">{cartItems.length}</span>건
            </span>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-16 px-4 bg-stone-50 rounded-2xl border border-stone-100 flex flex-col items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-stone-300 mb-3" />
              <p className="text-sm font-medium text-stone-600">장바구니에 담긴 상품이 없습니다.</p>
              <p className="text-xs text-stone-400 mt-1">상단의 묘목 상품 목록에서 원하는 상품의 &apos;담기&apos; 버튼을 눌러주세요.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-stone-100 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200/50 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold font-mono">
                      {item.product.certificationType}
                    </span>
                    <h4 className="text-sm font-bold text-stone-900 truncate mt-1">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-stone-500 font-mono">
                      ₩{item.product.price.toLocaleString()} / 주
                    </p>
                  </div>

                  {/* Quantity adjustment */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      className="w-7 h-7 bg-white rounded-lg border border-stone-200 flex items-center justify-center text-stone-600 font-bold hover:bg-stone-100 text-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold font-mono text-stone-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                      className="w-7 h-7 bg-white rounded-lg border border-stone-200 flex items-center justify-center text-stone-600 font-bold hover:bg-stone-100 text-sm"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-2 text-stone-400 hover:text-red-500 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clear Cart utility */}
        {cartItems.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClearCart}
              className="text-xs text-stone-400 hover:text-stone-600 flex items-center gap-1 font-medium"
            >
              <Trash2 className="w-3 h-3" />
              장바구니 비우기
            </button>
          </div>
        )}
      </div>

      {/* Right side: Order Form & Payment Summary */}
      <div className="lg:col-span-5 bg-stone-900 text-white rounded-3xl p-6 md:p-8 shadow-md flex flex-col justify-between">
        <form onSubmit={handleCheckoutSubmit} className="space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-stone-800 pb-4">
            <ClipboardList className="w-5 h-5 text-emerald-400" />
            주문자 정보 입력 및 결제
          </h2>

          <div className="space-y-4">
            {/* Buyer Name */}
            <div>
              <label className="block text-xs text-stone-400 font-medium mb-1 flex items-center gap-1">
                <User className="w-3 h-3 text-emerald-400" />
                주문자 성명 / 농가명
              </label>
              <input
                type="text"
                placeholder="예: 홍길동 (나무농원)"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className={`w-full bg-stone-800 border ${
                  formErrors.buyerName ? 'border-red-500' : 'border-stone-700'
                } rounded-xl px-4 py-2 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-400`}
              />
              {formErrors.buyerName && (
                <p className="text-[10px] text-red-400 mt-1">{formErrors.buyerName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs text-stone-400 font-medium mb-1 flex items-center gap-1">
                <Phone className="w-3 h-3 text-emerald-400" />
                연락처 (전화번호)
              </label>
              <input
                type="text"
                placeholder="예: 010-1234-5678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`w-full bg-stone-800 border ${
                  formErrors.phoneNumber ? 'border-red-500' : 'border-stone-700'
                } rounded-xl px-4 py-2 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-400`}
              />
              {formErrors.phoneNumber && (
                <p className="text-[10px] text-red-400 mt-1">{formErrors.phoneNumber}</p>
              )}
            </div>

            {/* Shipping Address */}
            <div>
              <label className="block text-xs text-stone-400 font-medium mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                배송지 주소
              </label>
              <input
                type="text"
                placeholder="지번 또는 도로명 상세주소 입력"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className={`w-full bg-stone-800 border ${
                  formErrors.shippingAddress ? 'border-red-500' : 'border-stone-700'
                } rounded-xl px-4 py-2 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-400`}
              />
              {formErrors.shippingAddress && (
                <p className="text-[10px] text-red-400 mt-1">{formErrors.shippingAddress}</p>
              )}
            </div>

            {/* Delivery Notes */}
            <div>
              <label className="block text-xs text-stone-400 font-medium mb-1 flex items-center gap-1">
                <ClipboardList className="w-3 h-3 text-emerald-400" />
                배송 및 출하 요청사항 (선택)
              </label>
              <textarea
                placeholder="출하 시 사전 연락 요망, 차량 진입 가능 등"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                rows={2}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-2 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 resize-none"
              />
            </div>
          </div>

          {/* Pricing Breakdown Panel */}
          <div className="bg-stone-850 border border-stone-800 rounded-2xl p-4 space-y-2.5 text-xs">
            <div className="flex justify-between text-stone-400">
              <span>상품 총합 금액</span>
              <span className="font-mono text-white">₩{calculateSubtotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-400">
              <span>스마트 안심 차량 운송비</span>
              <span className="font-mono text-white">
                {deliveryFee === 0 ? '무료 (10만원 이상)' : `₩${deliveryFee.toLocaleString()}`}
              </span>
            </div>
            <hr className="border-stone-800" />
            <div className="flex justify-between text-base font-bold text-white pt-1">
              <span>최종 결제 예정 금액</span>
              <span className="font-mono text-emerald-400">₩{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Button */}
          <button
            id="btn-trigger-payment"
            type="submit"
            disabled={cartItems.length === 0 || isPaying}
            className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              cartItems.length === 0
                ? 'bg-stone-800 text-stone-600 border border-stone-700 cursor-not-allowed'
                : isPaying
                ? 'bg-stone-700 text-stone-400 cursor-wait'
                : 'bg-emerald-500 text-stone-950 font-extrabold hover:bg-emerald-400 active:scale-95 shadow-lg shadow-emerald-500/10'
            }`}
          >
            <CreditCard className="w-4 h-4 shrink-0" />
            <span>{isPaying ? 'PG사 결제 인증 처리 중...' : `₩${totalAmount.toLocaleString()} 결제하기`}</span>
          </button>
        </form>
      </div>

      {/* Payment Success Modal */}
      {showReceiptModal && lastOrderDetails && (
        <div className="fixed inset-0 bg-stone-900/85 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 border border-stone-100 shadow-2xl relative space-y-6 text-stone-900">
            <button
              onClick={() => {
                setShowReceiptModal(false);
                onClearCart();
              }}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-600 rounded-full bg-stone-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 tracking-tight">DNA 인증 묘목 주문이 완료되었습니다!</h3>
              <p className="text-xs text-stone-500">지정하신 주소지로 스마트 저온 수송 차량이 안전하게 출발할 예정입니다.</p>
            </div>

            {/* Receipt Summary */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100 space-y-4 text-xs">
              <div className="flex justify-between text-stone-500 border-b border-stone-200/60 pb-2">
                <span>주문 번호</span>
                <span className="font-mono font-bold text-stone-900">{lastOrderDetails.orderId}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>주문자</span>
                <span className="font-bold text-stone-900">{lastOrderDetails.buyerName}</span>
              </div>

              {/* Items List */}
              <div className="space-y-1.5 pt-2">
                <p className="font-semibold text-[10px] text-stone-400 uppercase tracking-wider">주문 상세 품목</p>
                {lastOrderDetails.items.map(item => (
                  <div key={item.product.id} className="flex justify-between font-mono text-stone-700">
                    <span className="truncate max-w-[200px]">{item.product.name}</span>
                    <span>{item.quantity}주 x ₩{item.product.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-stone-200/60 pt-3">
                <span>총 결제 금액</span>
                <span className="font-mono text-emerald-600">₩{lastOrderDetails.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Special Feature Warning */}
            <div className="bg-emerald-50 text-emerald-950 p-4 rounded-xl border border-emerald-100 flex gap-2 text-xs leading-relaxed">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">NFC 스마트 성장관리 서비스 활성화</p>
                <p className="mt-0.5">배송 시 스마트 태그가 묘목에 부착 발부됩니다. 출하 전까지 실시간 대시보드와 스마트폰 터치 조회를 통해 이력 및 모수 정보를 언제든지 확인하실 수 있습니다.</p>
              </div>
            </div>

            <button
              id="btn-close-receipt"
              onClick={() => {
                setShowReceiptModal(false);
                onClearCart();
              }}
              className="w-full py-3 bg-stone-950 text-white font-bold rounded-xl text-xs hover:bg-stone-800 transition-colors"
            >
              닫기 및 쇼핑 계속하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
