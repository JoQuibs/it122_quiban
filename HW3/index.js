import express from 'express';
import Game from './models/item.js';
import cors from 'cors';

const app = express(); 
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs'); 
app.use(express.static('./public')); 
app.use(express.urlencoded({extended:false})); 
app.use(express.json()); 
app.use('/api', cors()); 

// getAll()
app.get('/api/games', (req, res) => {
	Game.find({})
		.lean()
		.then((games) => {
			if (games) {
				res.status(200);
				return res.json({ success: true, msg: 'getAll()', games: games });
			} else {
				res.status(500);
				return res.json({ success: false, msg: 'getAll() fail' });
			}
		})
		.catch((err) => next(err));
});

// getItem()
app.get('/api/game/:title', (req, res) => {
	const search = req.params.title;
	Game.findOne({ title: search })
		.lean()
		.then((game) => {
			if (game) {
				res.status(200);
				return res.json({ success: true, msg:'getItem()', game: game });
			} else {
				res.status(500);
				return res.json({ success: false, msg:'getItem() fail' });
			}
		})
		.catch((err) => console.log(err));
});

app.get('/api/delete/:title', (req, res) => {
	const search = req.params.title;
	Game.findOneAndDelete({ title: search })
		.then((result) => {
			if (result) {
				res.status(200);
				return res.json({ success: true, msg:`Found and Deleted: ${result}` });
			} else {
				res.status(500);
				return res.json({ success: false, msg:`Failed to find and delete: ${search}` });
			}
		})
		.catch((err) => {
			console.log(err);
		});
});


//React homepage
app.get('/react', (req, res) => {
	res.type('text/html');
	Game.find({})
		.lean()
		.then((games) => {
			res.render('react', { games: JSON.stringify(games) });
		})
		.catch((err) => next(err));
});

app.get('/', (req, res) => {
	res.type('text/html');
	Game.find({})
		.lean()
		.then((games) => {
			res.render('home', { games });
		})
		.catch((err) => next(err));
});

app.get('/about', (req, res) => {
	res.type('text/plain');
	res.send('I like games');
});

app.get('/detail', (req, res) => {
	console.log(req.query._id);
	let search = req.query._id;
	res.type('text/html');
	Game.findOne({ title: search })
		.lean()
		.then((game) => {
			res.render('detail', { game: game });
		})
		.catch((err) => next(err));
});

//add new entry
app.post('/api/add', (req, res,next) => {
	if(!req.body.title) return res.status(500).json({ success: false, msg:'Need title at least'});

	let obj = {
		title: req.body.title,
		releaseYear: req.body.releaseYear,
		price: req.body.price,
		_id: req.body._id
	}

	Game.updateOne({title: obj.title}, obj, (err,result)=>{
		if (err) return next(err);

		if(result.matchedCount == 1) {
			return res.status(200).json({ success: true, msg: `${obj.title} updated`, updated: true, _id: obj._id})
		} else {
			let newObj = new Game({
		    title: req.body.title,
		    releaseYear: req.body.releaseYear,
		    price: req.body.price
			})
			console.log(newObj)
			return newObj.save((err,entry)=> {
				if (err) return next(err);

				return res.status(200).json({ success: true , msg:`add ${entry.title} to Database`, updated: false, data: entry})
			})
		}
	})
})

//delete route
app.get('/delete', (req, res) => {
	console.log(req.query._id);
	let search = req.query._id;
	res.type('text/html');
	Game.findOneAndDelete({ title: search })
		.then((result) => {
			console.log(`Deleted: ${result}`);
		})
		.catch((err) => {
			next(err);
		});
});



// define 404 handler
app.use((req, res) => {
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
	console.log('Express started');
});
