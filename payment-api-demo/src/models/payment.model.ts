export interface Payment {
  id: string;
  amount: number;
  finalAmount: number;
  userId: string;
  status: "PENDING" | "PAID";
  discountCode?: string;
}
