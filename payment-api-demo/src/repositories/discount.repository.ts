import { Discount } from "../models/discount.model";

const discounts: Discount[] = [
  { code: "SAVE10", percentage: 10, expiresAt: new Date("2026-12-31") },
  { code: "SAVE50", percentage: 50, expiresAt: new Date("2025-12-31") },
];

export const discountRepository = {
  async findByCode(code: string): Promise<Discount | undefined> {
    return discounts.find(d => d.code === code);
  },
};
