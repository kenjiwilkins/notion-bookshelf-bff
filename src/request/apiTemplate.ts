import axios from "axios";

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_API_BASE_URL = process.env.NOTION_API_BASE_URL;

export const request = axios.create({
  baseURL: NOTION_API_BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${NOTION_API_KEY}`,
    "Notion-Version": "2021-06-28",
  },
});
