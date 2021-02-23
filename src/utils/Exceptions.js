export class RouteError extends Error {
  constructor({ details, method, status }) {
    super(details, method, status);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RouteError);
    }
    this.name = "RouteError";
  }
}
