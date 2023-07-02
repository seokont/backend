import mongoose from "mongoose";

// Подключение к MongoDB
export const db = {
  connect: "mongodb+srv://dizainzt:Maqim1981@cluster0.yamoyz7.mongodb.net/",
  option: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
