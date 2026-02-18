export interface Discount {
  code: string;
  percentage: number; // e.g., 10 = 10%
  expiresAt: Date;
}
