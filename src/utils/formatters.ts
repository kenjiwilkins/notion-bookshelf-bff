import { BookshelfResponse, Book } from "../types";
import logger from "morgan";

export function formatBookshelfResponse(
  bookShelfResponse: BookshelfResponse
): Book[] | { error: string } {
  try {
    return bookShelfResponse.map((bookResponse) => {
      const book: Book = {
        id: bookResponse.id,
        title: bookResponse.properties.Title.title[0].plain_text,
        authorId: bookResponse.properties.Author.relation[0].id,
        authorName:
          bookResponse.properties["Author Name"].rollup.array[0].title[0]
            .plain_text,
        dateRead: bookResponse.properties.Date_Read.date.start,
        rate: bookResponse.properties.Rate.select,
        reading: bookResponse.properties.Reading.rich_text[0].plain_text,
        status: bookResponse.properties.Status.status.name,
      };
      return book;
    });
  } catch (error) {
    console.log(error);
    return { error: "Error formatting bookshelf response" };
  }
}

export function formatErrorResponse(
  error: Error,
  message = "An error occurred",
  statusCode = 500
) {
  return {
    status: statusCode,
    message,
    errorName: error.name,
    stackTrace: error.stack,
  };
}
