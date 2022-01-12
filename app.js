import express from "express";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import contactsRouter from "./routes/api/contacts";
import usersRouter from "./routes/api/users";
import { HttpCode, Message, LIMIT_JSON } from "./config/constants";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: LIMIT_JSON }));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((_req, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: Message.NOT_FOUND,
  });
});

app.use((err, _req, res, _next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: "fail",
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
});

export default app;
