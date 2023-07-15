import mongoose from 'mongoose';
const { Schema } = mongoose;

const connectionString = "mongodb+srv://Jay:123jay@cluster0.izkfux5.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
  dbName: 'mydatabase',
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

const gameSchema = new Schema({
  title: { type: String, required: true },
  releaseYear: String,
  price: String
});

export default mongoose.model('Game', gameSchema, 'game');