const express = require('express');
const ejs = require('ejs');
const data = require('./data.js');

const app = express();
const port = 8080;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  const allData = data.getAll();
  res.render('home', { data: allData });
});

app.get('/detail', (req, res) => {
  const itemId = req.query.id;
  console.log('Requested item ID:', itemId);
  const { item, key } = data.getItem('key', parseInt(itemId));
  console.log('Retrieved item:', item);
  res.render('detail', { item, key });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
