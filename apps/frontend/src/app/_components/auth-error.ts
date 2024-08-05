export const SESSION_EXPRIED_ERROR = "Session expired. Please log in again.";

export const SesionExpiredError = class SessionExpiredError extends Error {
  constructor() {
    super(SESSION_EXPRIED_ERROR);
    this.name = "SessionExpiredError";
  }
};
