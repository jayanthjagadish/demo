import { Request, Response } from "express";
import { createPayment as createPaymentService } from "../services/payment.service";
import { CreatePaymentDto } from "../dtos/createPayment.dto";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const payload: CreatePaymentDto = req.body;

    const payment = await createPaymentService(payload);

    return res.status(201).json(payment);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Payment failed"
    });
  }
};
