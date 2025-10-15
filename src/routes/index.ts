import express from 'express';

const router = express.Router();

router.use('/', (req, res) => res.json({ message: 'Welcome to the API' }));

export default router;
