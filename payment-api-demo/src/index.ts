import express from "express";
import { createPayment } from "./controllers/payment.controller";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

app.post("/payments", createPayment);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
