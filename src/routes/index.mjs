import { Router } from "express";

import userRouter from "./user.mjs";
import productRouter from "./product.mjs";

const router = Router();
router.use('/user', userRouter);
router.use('/product', productRouter);

export default router;