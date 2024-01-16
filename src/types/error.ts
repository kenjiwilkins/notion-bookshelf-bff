export interface NotionAPIError extends ErrorConstructor {
  code: ErrorCode;
  message: string;
}
export type ErrorCode =
  | "400"
  | "401"
  | "404"
  | "409"
  | "429"
  | "500"
  | "502"
  | "503"
  | "504";

export class NotionAPIErrorInstance extends Error {
  code: ErrorCode;
  message: string;
  constructor(code: ErrorCode, message: string) {
    super();
    this.code = code;
    this.message = message;
  }
}
