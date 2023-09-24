import axios from "axios";

const instance = axios.create();
instance.defaults.baseURL = process.env.NOTION_API_BASE_URL;
instance.defaults.timeout = 1000;
instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.NOTION_API_KEY}`;
instance.defaults.headers.common["Notion-Version"] = "2021-06-28";

export const request = axios.create({
  baseURL: process.env.NOTION_API_BASE_URL,
  timeout: 2000,
  headers: {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    "Notion-Version": "2022-06-28",
  },
});
