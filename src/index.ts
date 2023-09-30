import express from "express";
import logger from "morgan";
import { apiRouter } from "./routes";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("common"));

app.use("/api", apiRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
