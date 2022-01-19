import { mkdir } from "fs/promises";
import app from "../app";
import db from "../config/db";

const PORT = process.env.PORT || 3000;

// Привязка к DataBase. Нет connection к DB - бессмысенно запускать сервер.
db.then(() => {
  app.listen(PORT, () => {
    mkdir(process.env.TMP_DIR, { recursive: true });
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server error: ${err.message}`);
});
