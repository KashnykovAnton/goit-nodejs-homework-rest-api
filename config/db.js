import pkg from "mongoose";

const { connect, connection } = pkg;

const uri =
  "mongodb+srv://goitAntonK:qwert123@contacts.gvesa.mongodb.net/db-contacts";
// const uri = process.env.URI_DB;
console.log(uri);

const db = connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on("connected", () => {
  console.log("Database connection successful");
});

connection.on("err", (err) => {
  console.log(`Database connection error: ${err.message}`);
});

connection.on("disconnected", () => {
  console.log("Database disconnected");
});

process.on("SIGINT", async () => {
  connection.close();
  console.log("Connection DB closed");
  process.exit(1);
});

export default db;

// import { MongoClient } from "mongodb";

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = client.connect();

// process.on("SIGINT", async () => {
//   const client = await db;
//   client.close();
//   console.log("Connection DB closed");
// });
