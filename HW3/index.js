'use strict'
import express from "express";
import Game from './models/item.js';
import ejs from 'ejs';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  Game.find({})
    .lean()
    .then((game) => {
      res.render('home', { data: game });
    })
    .catch((err) => next(err));
});

app.get('/detail', (req, res, next) => {
    Game.findOne({game: req.query.game }).lean()
    .then((game) => {
        console.log(game);
        res.render('detail', { layout: 'index', game });
    })
    .catch(err => next(err));

});

app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});