import { Router } from 'express';
import fetch from 'node-fetch';
import Dog from '../db/models/dog.model';
const router = Router();

router.get('/', (_req, res, next) => {
  try {
    res.render('create', {
      title: 'New dog',
      isCreate: true,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/image', async (_req, res, next) => {
  try {
    fetch('https://random.dog/woof.json')
      .then((ans) => ans.json())
      .then((json) => {
        if (json.url.endsWith('mp4') || json.url.endsWith('webm')) {
          res.redirect('/upload/dog/image');
        }
        const urlImageDog = json.url;
        res.render('preview', {
          title: 'Preview',
          urlImageDog,
        });
      });
  } catch (err) {
    next(err);
  }
});

router.post('/image', async (req, res, next) => {
  try {
    const { width, height, urlImage } = req.body;

    if (isFinite(width) && isFinite(height) && urlImage.length > 0) {
      const dog = new Dog({
        width,
        height,
        image: urlImage,
        format: urlImage.substring(urlImage.lastIndexOf('.') + 1).toLowerCase(),
      });
      await dog.save();
      res.redirect('/list/dog/images');
    }
  } catch (err) {
    next(err);
  }
});

export default router;
