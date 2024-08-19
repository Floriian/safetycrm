export const SESSION_EXPRIED_ERROR = "Session expired. Please log in again.";

export const SesionExpiredError = class SessionExpiredError extends Error {
  constructor() {
    super(SESSION_EXPRIED_ERROR);
    this.name = "SessionExpiredError";
  }
};

export const FORBIDDEN_RESOURCE_ERROR = "You are not authorized.";
export const ForbiddenResourceError = class ForbiddenResourceError extends Error {
  constructor() {
    super(FORBIDDEN_RESOURCE_ERROR);
    this.name = "ForbiddenResourceError";
  }
};
