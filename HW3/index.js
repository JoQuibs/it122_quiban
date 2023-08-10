'use strict'
import express from "express";
import Game from './models/item.js';
import ejs from 'ejs';

import cors from 'cors';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));
app.use(express.json());
app.use('/api', cors());
app.set('view engine', 'ejs');

//HW4 REST API
app.get('/api/items', (req, res) => {
  return Game.find({}).lean()
    .then((games) => {
        res.json(games);
    })
    .catch(err => res.status(500).send('Error occurred: database error.'));
});


app.get('/api/detail', (req, res) => {
  return Game.findOne({model:req.query.model}).lean()
  .then((game) => {

    res.json(game);
  })
  .catch(err => next(err));
});


app.post('/api/added', (req, res) => {
  const newGame = req.body
  return Game.update({'model':newGame.model}, newGame, {upsert:true}, (err, result) => {
    if (err) return next(err);
    console.log(result);
     res.json(result)
  }); 
});


app.delete('/api/delete', (req, res) => {
  if(!req.query.model) {
    return res.status(400).send("game not found")
  }
  Game.findOneAndRemove({model: req.query.model}).then(game => {
    res.json(game)
  })
  .catch(err => {
    res.status(500).json(err)
  });
});

app.get('/api/v2/delete/:id', (req, res, next) => {
  Game.deleteOne({"_id":req.params.id }, (err, result) => {
    if (err) return next(err);
    console.log(result)
    res.json({"deleted": result});
  });
});

//HW3
app.get('/', async (req, res, next) => {
  const games = await getGames();
  res.render('home', { data: games });
});

app.get('/detail', async (req, res, next) => {
    const game = await Game.findOne({title:req.query.id});
    res.render('detail', { layout: 'index', game });
});

app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});

async function getGames() {
  const games = await Game.find();
  return games;
}
