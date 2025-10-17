import express from "express";

import { loginController } from "../controlers/authentication";

const router = express.Router();

router.post('/login', loginController)

export default router;
