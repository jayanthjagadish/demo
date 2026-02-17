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
};
