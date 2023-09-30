import { getBookById } from "@/apis";
import { Book } from "@/types";

const queues: Record<string, any> = {};
const cache: Record<string, any> = {};

export async function bookBatchHandler(bookId: string, callback: Function) {
  if (cache[bookId]) {
    console.log(`Cache hit for ${bookId}`);
    return process.nextTick(() => callback(null, cache[bookId]));
  }

  if (queues[bookId]) {
    return queues[bookId].push(callback);
  }
  try {
    queues[bookId] = [callback];

    const book = await getBookById(bookId);

    queues[bookId].forEach((cb: Function) => cb(null, book));

    queues[bookId] = null;

    cache[bookId] = book;

    scheduleRemoveCache(bookId);
  } catch (error) {
    if (error) {
      console.log(error);
      queues[bookId].forEach((cb: Function) => cb(error, null));
    }
  }
}

function scheduleRemoveCache(bookId: string) {
  setTimeout(() => deleteCache(bookId), 1000 * 60 * 60 * 24);
}

function deleteCache(bookId: string) {
  console.log(`Deleting cache for ${bookId}`);
  delete cache[bookId];
}

export function updateBookCache(bookId: string, book: Book) {
  cache[bookId] = book;
}
