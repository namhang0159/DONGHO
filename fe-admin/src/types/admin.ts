export interface KPIStat {
  id: string;
  title: string;
  value: string;
  subValue?: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
  iconName: string;
}

export interface RecentOrder {
  id: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  watchModel: string;
  brand: string;
  serialNumber: string;
  totalAmount: number;
  paymentMethod: 'VNPAY' | 'TIEN_MAT' | 'CHUYEN_KHOAN';
  status: 'PENDING' | 'PAID' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export interface PendingApproval {
  id: string;
  code: string;
  type: 'DISCOUNT_VIP' | 'ORDER_CANCEL' | 'WARRANTY_EXCEPTION' | 'REFUND';
  title: string;
  requester: string;
  role: string;
  targetRef: string;
  amount?: number;
  reason: string;
  priority: 'HIGH' | 'MEDIUM' | 'NORMAL';
  createdAt: string;
}

export interface CashierShiftSummary {
  shiftId: string;
  cashierName: string;
  staffCode: string;
  openedAt: string;
  initialCash: number;
  currentCash: number;
  ordersCount: number;
  status: 'ACTIVE' | 'CLOSED';
}

export interface TopSellingWatch {
  id: string;
  name: string;
  referenceNo: string;
  brand: string;
  price: number;
  stock: number;
  soldCount: number;
  image: string;
}
