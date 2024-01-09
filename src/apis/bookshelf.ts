import { Client } from "@notionhq/client";
import { request } from ".";
import { BookReadStatus } from "../types";
import { READ_STATUS } from "../constants";
import moment from "moment";

export async function getBookshelf() {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
    const response = await notion.databases.retrieve({
      database_id: process.env.NOTION_BOOKSHLEF_ID || "",
    });
    return response;
  } catch (error) {
    return error;
  }
}

export async function getBooks(config: {
  status?: BookReadStatus;
  start?: number;
  amount?: number;
}) {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
    const response = await notion.databases.query({
      database_id: process.env.NOTION_BOOKSHLEF_ID || "",
      filter: config.status
        ? {
            property: "Status",
            status: {
              equals: config.status || READ_STATUS,
            },
          }
        : undefined,
      page_size: config.amount || 10,
    });
    return response.results;
  } catch (error) {
    if (error) {
      return error;
    }
  }
}

export async function getReadBookByTimeRange(config: {
  year?: number;
  month?: number;
}) {
  try {
    let start = moment(
      config.year ? config.year.toString() : moment().startOf("year")
    );
    let end = moment(config.year ? config.year.toString() : moment()).endOf(
      "year"
    );
    if (config.month) {
      start = start.month(config.month - 1);
      end = end.month(config.month - 1).endOf("month");
    }
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
    const response = await notion.databases.query({
      database_id: process.env.NOTION_BOOKSHLEF_ID || "",
      filter: {
        and: [
          {
            property: "Status",
            status: {
              equals: READ_STATUS,
            },
          },
          {
            property: "Date_Read",
            date: {
              after: start.format("YYYY-MM-DD"),
            },
          },
          {
            property: "Date_Read",
            date: {
              before: end.format("YYYY-MM-DD"),
            },
          },
        ],
      },
    });
    return response.results;
  } catch (error) {
    if (error) {
      return error;
    }
  }
}

export async function getBookById(id: string) {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
    const response = await notion.pages.retrieve({ page_id: id });
    return response;
  } catch (error) {
    if (error) {
      return error;
    }
  }
}

export async function getBookBody(id: string) {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
    const response = await notion.blocks.children.list({
      block_id: id,
    });
    return response;
  } catch (error) {
    if (error) {
      return error;
    }
  }
}
