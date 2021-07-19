import express from 'express';
import exphbs from 'express-handlebars';
import createHttpError from 'http-errors';
import path from 'path';
import { initDb } from './db/index';
import { errorHandlerMiddleware } from './middlewares/error.middleware';
import listRoutes from './routes/list';
import uploadRoutes from './routes/upload';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const PATH_VIEWS = path.join(__dirname, '/views');

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'index',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', PATH_VIEWS);

app.use(express.urlencoded({ extended: true }));

app.use('/list/dog/images', listRoutes);
app.use('/upload/dog', uploadRoutes);

app.use((req, _res, next) => {
  if (req.method !== 'GET') {
    next(createHttpError(405));
    return;
  }

  next(createHttpError(404));
});

app.use(errorHandlerMiddleware);

initDb()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
    }),
  )
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
