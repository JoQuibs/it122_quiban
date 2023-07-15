'use strict';

import { Game } from './models/item.js';

Game.find({})
  .then((game) => { 
    console.log(game);
  })
  .catch(err => console.log(err));