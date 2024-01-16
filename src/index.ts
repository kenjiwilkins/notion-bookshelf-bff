import express from "express";
import logger from "morgan";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { apiRouter } from "./routes";
import * as dotenv from "dotenv";
import path from "path";
import serverlessExpress from "@codegenie/serverless-express";
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60 * 5,
  standardHeaders: true,
});

app.use(logger("common"));
app.use(helmet());
app.use(limiter);

app.use("/api", apiRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export const handler = serverlessExpress({ app });
