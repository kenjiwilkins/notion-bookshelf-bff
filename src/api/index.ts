import express from "express";
import { request } from "../request/apiTemplate";

const apiRouter = express.Router();

apiRouter.get("/general", (req, res) => {
  res.send("General API route");
  request.get("");
});

export { apiRouter };
