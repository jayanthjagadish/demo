export interface Payment {
  id: string;
  amount: number;
  finalAmount: number;
  status: "PENDING" | "PAID";
}
