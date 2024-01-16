import { Client } from "@notionhq/client";
import { NotionAPIError, NotionAPIErrorInstance } from "../types";

export async function getBlogArticles(): Promise<any | NotionAPIError> {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
    const response = await notion.databases.query({
      database_id: process.env.NOTION_BLOG_ARTICLE_ID || "",
      filter: {
        property: "publication",
        status: {
          equals: "PUBLISHED",
        },
      },
    });
    return response.results;
  } catch (error) {
    if (error instanceof NotionAPIErrorInstance) {
      throw new NotionAPIErrorInstance(error.code, error.message);
    } else {
      throw new NotionAPIErrorInstance(
        "500",
        "Internal Server Error - getBlogArticles"
      );
    }
  }
}

export async function getBlogArticle(id: string) {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
    const response = await notion.blocks.children.list({
      block_id: id,
    });
    return response;
  } catch (error) {
    if (error instanceof NotionAPIErrorInstance) {
      throw new NotionAPIErrorInstance(error.code, error.message);
    } else {
      throw new NotionAPIErrorInstance(
        "500",
        `Internal Server Error - getBlogArticle: ${id}`
      );
    }
  }
}

export async function getBlogArticleProperties(id: string) {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
    const response = await notion.pages.retrieve({ page_id: id });
    return response;
  } catch (error) {
    if (error instanceof NotionAPIErrorInstance) {
      throw new NotionAPIErrorInstance(error.code, error.message);
    } else {
      throw new NotionAPIErrorInstance(
        "500",
        `Internal Server Error - getBlogArticleProperties: ${id}`
      );
    }
  }
}

export async function getBlogCategories() {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
    const response = await notion.databases.query({
      database_id: process.env.NOTION_BLOG_CATEGORY_ID || "",
    });
    return response;
  } catch (error) {
    if (error instanceof NotionAPIErrorInstance) {
      throw new NotionAPIErrorInstance(error.code, error.message);
    } else {
      throw new NotionAPIErrorInstance(
        "500",
        `Internal Server Error - getBlogCategories`
      );
    }
  }
}

export async function getBlogCategoryProperties(id: string) {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
    const articleIDs = await notion.pages.properties.retrieve({
      page_id: id,
      property_id: "R%3Eo%7C",
    });
    const articleTitles = await notion.pages.properties.retrieve({
      page_id: id,
      property_id: "tqji",
    });
    const categoryTitle = await notion.pages.properties.retrieve({
      page_id: id,
      property_id: "title",
    });
    return { articleIDs, articleTitles, title: categoryTitle };
  } catch (error) {
    if (error instanceof NotionAPIErrorInstance) {
      throw new NotionAPIErrorInstance(error.code, error.message);
    } else {
      throw new NotionAPIErrorInstance(
        "500",
        `Internal Server Error - getBlogCategoryProperties: ${id}`
      );
    }
  }
}

export async function getBlogArticleByCategory(categoryId: string) {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
    const response = await notion.databases.query({
      database_id: process.env.NOTION_BLOG_ARTICLE_ID || "",
      filter: {
        property: "category",
        relation: {
          contains: categoryId,
        },
      },
    });
    return response.results;
  } catch (error) {
    if (error instanceof NotionAPIErrorInstance) {
      throw new NotionAPIErrorInstance(error.code, error.message);
    } else {
      throw new NotionAPIErrorInstance(
        "500",
        `Internal Server Error - getBlogArticleByCategory: ${categoryId}`
      );
    }
  }
}

export async function getBlogTags() {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
    const response = await notion.databases.query({
      database_id: process.env.NOTION_BLOG_TAG_ID || "",
    });
    return response;
  } catch (error) {
    if (error instanceof NotionAPIErrorInstance) {
      throw new NotionAPIErrorInstance(error.code, error.message);
    } else {
      throw new NotionAPIErrorInstance(
        "500",
        `Internal Server Error - getBlogTags`
      );
    }
  }
}
