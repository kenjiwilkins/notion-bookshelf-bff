import express from "express";
import {
  getBookshelf,
  getBooks,
  getReadBookByTimeRange,
  getBookById,
} from "../apis";
import { BookReadStatus } from "../types";

const apiRouter = express.Router();

apiRouter.get("/general", async (req, res) => {
  const data = await getBookshelf();
  res.json(data);
});

apiRouter.get("/books/all", async (req, res) => {
  const data = await getBooks({ amount: 100 });
  res.json(data);
});

apiRouter.get("/books/status/:status", async (req, res) => {
  const data = await getBooks({ status: req.params.status as BookReadStatus });
  res.json(data);
});

apiRouter.get("/books/range", async (req, res) => {
  const data = await getReadBookByTimeRange({
    year: Number(req.query.year),
    month: Number(req.query.month),
  });
  res.json(data);
});

apiRouter.get("/book/:id", (req, res) => {
  const data = getBookById(req.params.id);
  res.json(data);
});

export { apiRouter };
