export interface UpdateResponse<T = unknown> {
  success: boolean;
  data?: T;
}
