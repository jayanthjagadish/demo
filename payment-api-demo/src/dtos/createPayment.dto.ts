export interface CreatePaymentDto {
  amount: number;
  discountCode?: string;
  userId: string;
}
