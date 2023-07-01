import express from "express";
import { functionDelete, functionGet, getItems, saveNewAppo } from "./controllers/getJs.js";
import cors from 'cors'
import bodyParser from 'body-parser';

// Создание экземпляра Express.js
const app = express();
// Используйте body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// Маршруты
app.get("/", getItems);
app.post("/", functionGet);
app.put("/", saveNewAppo);
app.delete("/", functionDelete);

// Запуск сервера
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
