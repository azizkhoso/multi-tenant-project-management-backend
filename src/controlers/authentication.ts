import { Request, Response } from "express";

import { login } from "../services/auth.service";
import { loginSchema } from "../types/schemas";

export async function loginController(req: Request, res: Response) {
  const data = loginSchema.validateSync(req.body);
  const loginData = await login(data.email, data.password);
  res.json(loginData);
}