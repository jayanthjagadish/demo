import { CreatePaymentDto } from "../dtos/createPayment.dto";
import { paymentRepository } from "../repositories/payment.repository";
import { discountRepository } from "../repositories/discount.repository";

export const createPayment = async (payload: any) => {
  const { amount, discountCode, userId} = payload;

  if (!amount || amount <= 0) throw new Error("Amount must be greater than 0");

  let finalAmount = amount;

  if (discountCode) {
    const discount = await discountRepository.findByCode(discountCode);

    if (!discount) throw new Error("Invalid discount code");
    if (discount.expiresAt < new Date()) throw new Error("Discount expired");

    const alreadyUsed = await paymentRepository.exists({
      userId,
      discountCode
    });

    if (alreadyUsed) {
      throw new Error("Discount code already used by this user");
    }

    finalAmount = amount - (amount * discount.percentage) / 100;
  }

  return await paymentRepository.create({
    amount,
    finalAmount,
    status: "PENDING",
    userId,
    discountCode,
  });
};
