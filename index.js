import express from "express";
import { functionDelete, functionGet, getItems, saveNewAppo } from "./controllers/getJs.js";
import cors from 'cors'
import bodyParser from 'body-parser';

// Создание экземпляра Express.js
const app = express();
const PORT = process.env.PORT || 80
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

app.get("/test", (req, res, next) => {
  return res.json({result:'ok'})
});
app.get("/", getItems);
app.post("/", functionGet);
app.put("/", saveNewAppo);
app.delete("/", functionDelete);

// Запуск сервера
app.listen(PORT, () => {
  console.log("Server is running on port 80");
});
