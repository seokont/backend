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
const AppointmentsSchema = new Schema({
  pacient: { type: String },
  doctor: { type: String },
  time: String,
  color: String
 
});
export const Appointments = mongoose.model('Appointments', AppointmentsSchema);