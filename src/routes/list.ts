import { Router } from 'express';
import Dog from '../db/models/dog.model';
import { IDog } from '../typings';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const dogs: IDog[] = await Dog.find({}).lean();

    res.render('home', {
      title: 'Home',
      isHome: true,
      dogs,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res) => {
  res.redirect(`/list/dog/images/format/${req.body.format}`);
});

router.get('/width/:withId', async (req, res, next) => {
  try {
    const dogs: IDog[] = await Dog.find({ width: req.params.withId }).lean();

    res.render('home', {
      title: 'Home',
      isHome: true,
      dogs,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/format/:formatId', async (req, res, next) => {
  try {
    const dogs: IDog[] = await Dog.find({ format: req.params.formatId }).lean();

    res.render('home', {
      title: 'Home',
      isHome: true,
      dogs,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
