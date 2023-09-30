import { getBooks } from "@/apis";
import { Book, BookReadStatus } from "@/types";

const queues: Record<string, any> = {};
const cache: Record<string, any> = {};

export async function bookListStatusBatchHandler(
  status: BookReadStatus,
  callback: Function
) {
  if (cache[status]) {
    console.log(`Cache hit for ${status}`);
    return process.nextTick(() => callback(null, cache[status]));
  }

  if (queues[status]) {
    return queues[status].push(callback);
  }
  try {
    queues[status] = [callback];

    const books = await getBooks({ status });

    queues[status].forEach((cb: Function) => cb(null, books));

    queues[status] = null;

    cache[status] = books;

    scheduleRemoveCache(status);
  } catch (error) {
    if (error) {
      console.log(error);
      queues[status].forEach((cb: Function) => cb(error, null));
    }
  }
}

function scheduleRemoveCache(status: BookReadStatus) {
  setTimeout(() => deleteCache(status), 1000 * 60 * 60 * 24);
}

function deleteCache(status: BookReadStatus) {
  console.log(`Deleting cache for ${status}`);
  delete cache[status];
}

export function updateBookListStatusCache(status: BookReadStatus, book: Book) {
  cache[status].push(book);
}
