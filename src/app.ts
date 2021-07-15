import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';

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
