import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import { initDb } from './db/index';
//import baseRoutes from './routes/base';
import listRoutes from './routes/list';
import uploadRoutes from './routes/upload';

require('dotenv').config();

const PORT = process.env.PORT;
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
//app.use('/', baseRoutes);

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
