import express from "express";
import { blogApiRouter } from "./blogs";
import { bookApiRouter } from "./books";

const apiRouter = express.Router();
apiRouter.use("/blogs", blogApiRouter);
apiRouter.use("/books", bookApiRouter);

apiRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Kenji Wilkins' api!" });
});

export { apiRouter };
