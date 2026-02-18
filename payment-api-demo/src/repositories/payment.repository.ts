import { Payment } from "../models/payment.model";
import { randomUUID } from "crypto";

const payments: Payment[] = [];

export const paymentRepository = {
  async create(data: Omit<Payment, "id">): Promise<Payment> {
    const payment: Payment = {
      id: randomUUID(),
      ...data,
    };

    payments.push(payment);
    return payment;
  },
  exists: async ({ userId, discountCode }: { userId: string, discountCode: string }) => {
    const payment = payments.find(
      (p) => p.userId === userId && p.discountCode === discountCode
    );
    return !!payment; // returns true if already used
  }
};
