import express from "express";
import { getBookshelf, getReadBookByTimeRange, getBookBody } from "../apis";
import { BookReadStatus } from "@/types";
import {
  bookBatchHandler,
  bookListBatchHandler,
  bookListStatusBatchHandler,
} from "@/batchs";
import { blogApiRouter } from "./blogs";

const apiRouter = express.Router();
apiRouter.use("/blogs", blogApiRouter);

apiRouter.get("/general", async (req, res) => {
  const data = await getBookshelf();
  res.json(data);
});

apiRouter.get("/books/all", async (req, res) => {
  bookListBatchHandler((err: Error, data: any) => {
    if (err) {
      return res.status(401).json({ error: err.message });
    }
    res.status(200).json(data);
  });
});

apiRouter.get("/books/status/:status", async (req, res) => {
  if (!req.params.status) {
    return res.status(400).json({ error: "Status is required" });
  }
  if (!["read", "reading", "unread"].includes(req.params.status)) {
    return res.status(400).json({ error: "Status is invalid" });
  }
  bookListStatusBatchHandler(
    req.params.status as BookReadStatus,
    (err: Error, data: any) => {
      if (err) {
        return res.json({ error: err.message });
      }
      res.json(data);
    }
  );
});

apiRouter.get("/books/range", async (req, res) => {
  const data = await getReadBookByTimeRange({
    year: Number(req.query.year),
    month: Number(req.query.month),
  });
  res.json(data);
});

apiRouter.get("/book/:id", async (req, res) => {
  bookBatchHandler(req.params.id, (err: Error, data: any) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json(data);
  });
});

apiRouter.get("/book/body/:id", async (req, res) => {
  const data = await getBookBody(req.params.id);
  res.json(data);
});

export { apiRouter };
