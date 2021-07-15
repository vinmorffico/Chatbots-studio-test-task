import { Router } from 'express';
import createHttpError from 'http-errors';

const router = Router();

router.use(async (req, res) => {
  if (req.method !== 'GET') {
    res.render('error', { message: createHttpError(405).message });
  }

  res.render('error', { message: createHttpError(404).message });
});

export default router;
