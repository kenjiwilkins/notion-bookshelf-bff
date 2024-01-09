import { getBlogArticle } from "@/apis";
import { BlogArticle } from "@/types";

const queues: Record<string, any> = {};
const cache: Record<string, any> = {};

export async function blogArticleBatchHandler(
  blogId: string,
  callback: Function
) {
  if (cache[blogId]) {
    console.log(`Cache hit for ${blogId}`);
    return process.nextTick(() => callback(null, cache[blogId]));
  }

  if (queues[blogId]) {
    return queues[blogId].push(callback);
  }
  try {
    queues[blogId] = [callback];

    const blog = await getBlogArticle(blogId);

    queues[blogId].forEach((cb: Function) => cb(null, blog));

    queues[blogId] = null;

    cache[blogId] = blog;

    scheduleRemoveCache(blogId);
  } catch (error) {
    if (error) {
      console.log(error);
      queues[blogId].forEach((cb: Function) => cb(error, null));
    }
  }
}

function scheduleRemoveCache(blogId: string) {
  setTimeout(() => deleteCache(blogId), 1000 * 60 * 60 * 24);
}

function deleteCache(blogId: string) {
  console.log(`Deleting cache for ${blogId}`);
  delete cache[blogId];
}

export function updateBlogCache(blogId: string, blog: BlogArticle) {
  cache[blogId] = blog;
}
