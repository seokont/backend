import mongoose from 'mongoose'
import { db } from '../connect/db.js';

// Подключение к MongoDB

const {connect,option} = db
mongoose.connect(connect, option).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error);
});


// Определение схемы и модели
const Schema = mongoose.Schema;
const DoctorsSchema = new Schema({
  type: { type: String , unique: true},
  time: String,
  name: String,
  data: Date,
});
export const Doctors = mongoose.model('Doctors', DoctorsSchema);