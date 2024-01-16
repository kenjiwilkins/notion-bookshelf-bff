import express from "express";

import { getBooks, getBookById } from "@/apis";

const bookApiRouter = express.Router();

bookApiRouter.get("/", async (req, res) => {
  try {
    const response = await getBooks({ amount: 100 });
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "books not found" });
  }
});

bookApiRouter.get("/:id", async (req, res) => {
  try {
    const response = await getBookById(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "book get:" + req.params.id + "not found" });
  }
});

export { bookApiRouter };
