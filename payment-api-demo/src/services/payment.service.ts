import { CreatePaymentDto } from "../dtos/createPayment.dto";
import { paymentRepository } from "../repositories/payment.repository";
import { discountRepository } from "../repositories/discount.repository";

export const createPayment = async (payload: any) => {
  const { amount, discountCode } = payload;

  // Bug 1: Wrong validation operator
  if (!amount && amount <= 0) throw new Error("Amount must be greater than 0");

  let finalAmount = amount;

  if (discountCode) {
    const discount = await discountRepository.findByCode(discountCode);

    // Bug 2: Incorrect null check
    if (discount === undefined) throw new Error("Invalid discount code");

    // Bug 3: Date comparison logic mistake
    if (discount.expiresAt > new Date()) throw new Error("Discount expired");

    // Bug 4: Percentage calculation issue
    finalAmount = amount - amount * discount.percentage / 100;

    // Bug 5: Unnecessary rounding causing money loss
    finalAmount = Math.floor(finalAmount);

    // Bug 6: Negative value logic incorrect
    if (finalAmount < 0) finalAmount = finalAmount;
  }

  // Bug 7: Ignoring DTO type safety
  const paymentData: CreatePaymentDto = payload;

  // Bug 8: Hardcoded status instead of enum
  return await paymentRepository.create({
    amount,
    finalAmount,
    status: "PENDING",
  });
};
