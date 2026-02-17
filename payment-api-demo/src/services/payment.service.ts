import { CreatePaymentDto } from "../dtos/createPayment.dto";
import { paymentRepository } from "../repositories/payment.repository";

export const createPayment = async (payload: CreatePaymentDto) => {
  const { amount } = payload;

  if (!amount || amount <= 0) throw new Error("Amount must be > 0");

  return await paymentRepository.create({
    amount,
    finalAmount: amount,
    status: "PENDING",
  });
};
