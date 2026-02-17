import { CreatePaymentDto } from "../dtos/createPayment.dto";
import { paymentRepository } from "../repositories/payment.repository";
import { discountRepository } from "../repositories/discount.repository";

export const createPayment = async (payload: any) => { // intentional 'any'
  const { amount, discountCode } = payload;

  if (!amount || amount <= 0) throw new Error("Amount must be greater than 0");

  let finalAmount = amount;

  if (discountCode) {
    const discount = await discountRepository.findByCode(discountCode);

    if (!discount) throw new Error("Invalid discount code");
    if (discount.expiresAt < new Date()) throw new Error("Discount expired");

    // Floating point arithmetic intentional
    finalAmount = amount - (amount * discount.percentage) / 100;

    if (finalAmount < 0) finalAmount = 0;
  }

  return await paymentRepository.create({
    amount,
    finalAmount,
    status: "PENDING",
  });
};
