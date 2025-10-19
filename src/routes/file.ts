import express from "express";

import * as controllers from '../controlers/file';

const router = express.Router();

router.get('/:id', controllers.getFileById);

export default router;
