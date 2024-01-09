import { getBlogArticles } from "@/apis";
import moment, { Moment } from "moment";
import { BlogArticle } from "@/types";

type BlogList = BlogArticle[];
const requestQueue: Function[] = [];
const cache: BlogList = [];
let lastTimeFetched: Moment = moment();

export async function blogsBatchHandler(callback: Function, amount?: number) {
  if (cache.length && moment().diff(lastTimeFetched, "minutes") < 60) {
    console.log(
      `Cache hit for blogs list after ${moment().diff(
        lastTimeFetched,
        "minutes"
      )} minutes ${moment().diff(lastTimeFetched, "seconds")} seconds`
    );
    return process.nextTick(() => callback(null, cache));
  }
  try {
    const blogs = (await getBlogArticles()) as BlogList;

    requestQueue.push(callback);

    requestQueue.forEach((cb: Function) => cb(null, blogs));

    cache.push(...blogs);

    lastTimeFetched = moment();
  } catch (error) {
    if (error) {
      return callback(error, null);
    }
  }
}

export function updateBlogListCache(blog: BlogArticle) {
  cache.push(blog);
}
