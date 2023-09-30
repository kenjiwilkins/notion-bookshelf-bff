import moment, { Moment } from "moment";
import { getBooks } from "@/apis";
import { Book } from "@/types";

type BookList = Book[];
const requestQueue: Function[] = [];
const cache: BookList = [];
let lastTimeFetched: Moment = moment();

export async function bookListBatchHandler(
  callback: Function,
  amount?: number
) {
  if (cache.length && moment().diff(lastTimeFetched, "minutes") < 60) {
    console.log(
      `Cache hit for book list after ${moment().diff(
        lastTimeFetched,
        "minutes"
      )} minutes ${moment().diff(lastTimeFetched, "seconds")} seconds`
    );
    return process.nextTick(() => callback(null, cache));
  }
  try {
    const books = (await getBooks({ amount: amount || 100 })) as BookList;

    requestQueue.push(callback);

    requestQueue.forEach((cb: Function) => cb(null, books));

    cache.push(...books);

    lastTimeFetched = moment();
  } catch (error) {}
}

export function updateBookListCache(book: Book) {
  cache.push(book);
}
