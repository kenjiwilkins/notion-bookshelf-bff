import express from "express";
import {
  getBlogCategories,
  getBlogCategoryProperties,
  getBlogArticleByCategory,
  getBlogTags,
} from "@/apis";
import {
  blogsBatchHandler,
  blogArticleBatchHandler,
  blogArticlePropertiesBatchHandler,
} from "@/batchs";

const blogApiRouter = express.Router();

blogApiRouter.get("/", async (req, res) => {
  blogsBatchHandler((err: Error, data: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(data);
  });
});

blogApiRouter.get("/article/body/:id", async (req, res) => {
  blogArticleBatchHandler(req.params.id, (err: Error, data: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(data);
  });
});

blogApiRouter.get("/article/properties/:id", async (req, res) => {
  blogArticlePropertiesBatchHandler(req.params.id, (err: Error, data: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(data);
  });
});

blogApiRouter.get("/categories", async (req, res) => {
  try {
    const response = await getBlogCategories();
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "categories not found" });
  }
});

blogApiRouter.get("/category/:id", async (req, res) => {
  try {
    const response = await getBlogCategoryProperties(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "category get:" + req.params.id + "not found" });
  }
});

blogApiRouter.get("/category/:id/articles", async (req, res) => {
  try {
    const response = await getBlogArticleByCategory(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "category get:" + req.params.id + "not found" });
  }
});

blogApiRouter.get("/tags", async (req, res) => {
  try {
    const response = await getBlogTags();
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "tags not found" });
  }
});

export { blogApiRouter };
