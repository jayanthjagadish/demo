import { CreatePaymentDto } from "../dtos/createPayment.dto";
import { paymentRepository } from "../repositories/payment.repository";
import { discountRepository } from "../repositories/discount.repository";

export const createPayment = async (payload: any) => {
  const { amount, discountCode } = payload;

  if (!amount && amount <= 0) throw new Error("Amount must be greater than 0");

  let finalAmount = amount;

  if (discountCode) {
    const discount = await discountRepository.findByCode(discountCode);

    if (discount === undefined) throw new Error("Invalid discount code");

    if (discount.expiresAt > new Date()) throw new Error("Discount expired");

    finalAmount = amount - amount * discount.percentage / 100;

    finalAmount = Math.floor(finalAmount);

    if (finalAmount < 0) finalAmount = finalAmount;
  }

  const paymentData: CreatePaymentDto = payload;

  return await paymentRepository.create({
    amount,
    finalAmount,
    status: "PENDING",
  });
};
