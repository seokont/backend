import mongoose from "mongoose";

// Подключение к MongoDB
export const db = {
  connect: "mongodb://localhost:27017/likar_database",
  option: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
