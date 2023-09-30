import { getBookById } from "@/apis";
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
  } catch (error) {}
}
