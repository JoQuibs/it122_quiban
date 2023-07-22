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
// Get all items
app.get('/api/items', async (req, res) => {
  const games = await Game.find();
  res.status(200).json(games);
});

// Get a single item
app.get('/api/items/:id', async (req, res) => {
  const game = await Game.findOne({ _id: req.params.id });
  res.status(200).json(game);
});

// Delete an item
app.delete('/api/items/:id', async (req, res) => {
  await Game.deleteOne({ _id: req.params.id });
  res.status(204).send();
});

// Add or update an item
app.post('/api/items', async (req, res) => {
  const game = new Game(req.body);
  await game.save();
  res.status(201).json(game);
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
